mod adapters;
mod domain;
mod services;

use adapters::repositories::todoRepo::SqliteTodoRepository;
use services::TodoService;
use rusqlite::Connection;
use std::path::PathBuf;
use std::sync::Arc;
use tauri::api::path::app_data_dir;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let app_config = tauri::Config::default();
    let app_data_dir = app_data_dir(&app_config).expect("Failed to get app data dir");
    let db_path: PathBuf = app_data_dir.join("todos.db");
    
    // Create the app data directory if it doesn't exist
    std::fs::create_dir_all(&app_data_dir).expect("Failed to create app data directory");
    
    // Initialize database connection
    let conn = Connection::open(db_path).expect("Failed to open database");
    
    // Create repository
    let todo_repository = SqliteTodoRepository::new(conn);
    todo_repository.init_database().expect("Failed to initialize database");
    
    // Create service
    let todo_service = Arc::new(TodoService::new(Arc::new(todo_repository)));

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .manage(todo_service)
        .invoke_handler(tauri::generate_handler![
            adapters::api::tauri::get_all_todos,
            adapters::api::tauri::get_todo,
            adapters::api::tauri::create_todo,
            adapters::api::tauri::update_todo,
            adapters::api::tauri::delete_todo,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
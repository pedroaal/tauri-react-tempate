mod adapters;
mod domain;
mod services;

use adapters::repositories::todoRepo::SqliteTodoRepository;
use services::todoService::TodoService;
use rusqlite::Connection;
use std::path::PathBuf;
use std::sync::Arc;
use std::env;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let app_data_dir = env::current_dir().expect("Failed to get current directory").join("app_data");
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
            adapters::api::todoApi::get_all_todos,
            adapters::api::todoApi::get_todo,
            adapters::api::todoApi::create_todo,
            adapters::api::todoApi::update_todo,
            adapters::api::todoApi::delete_todo,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
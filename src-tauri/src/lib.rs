// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use rusqlite::{params, Connection, Result as SqliteResult};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use std::path::PathBuf;
use tauri::api::path::app_data_dir;

#[derive(Debug, Serialize, Deserialize)]
struct Todo {
    id: Option<i64>,
    title: String,
    completed: bool,
}

struct AppState {
    db_conn: Mutex<Connection>,
}

fn init_database(conn: &Connection) -> SqliteResult<()> {
    conn.execute(
        "CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            completed BOOLEAN NOT NULL DEFAULT 0
        )",
        [],
    )?;
    Ok(())
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_all_todos(state: tauri::State<AppState>) -> Result<Vec<Todo>, String> {
    let conn = state.db_conn.lock().unwrap();
    let mut stmt = conn.prepare("SELECT id, title, completed FROM todos").map_err(|e| e.to_string())?;
    
    let todos = stmt.query_map([], |row| {
        Ok(Todo {
            id: Some(row.get(0)?),
            title: row.get(1)?,
            completed: row.get(2)?,
        })
    })
    .map_err(|e| e.to_string())?
    .collect::<SqliteResult<Vec<Todo>>>()
    .map_err(|e| e.to_string())?;
    
    Ok(todos)
}

#[tauri::command]
fn create_todo(state: tauri::State<AppState>, title: String) -> Result<Todo, String> {
    let conn = state.db_conn.lock().unwrap();
    
    conn.execute(
        "INSERT INTO todos (title, completed) VALUES (?1, 0)",
        params![title],
    )
    .map_err(|e| e.to_string())?;
    
    let id = conn.last_insert_rowid();
    
    Ok(Todo {
        id: Some(id),
        title,
        completed: false,
    })
}

#[tauri::command]
fn get_todo(state: tauri::State<AppState>, id: i64) -> Result<Todo, String> {
    let conn = state.db_conn.lock().unwrap();
    
    let mut stmt = conn.prepare("SELECT id, title, completed FROM todos WHERE id = ?1")
        .map_err(|e| e.to_string())?;
    
    let todo = stmt.query_row(params![id], |row| {
        Ok(Todo {
            id: Some(row.get(0)?),
            title: row.get(1)?,
            completed: row.get(2)?,
        })
    })
    .map_err(|e| e.to_string())?;
    
    Ok(todo)
}

#[tauri::command]
fn update_todo(state: tauri::State<AppState>, id: i64, title: Option<String>, completed: Option<bool>) -> Result<(), String> {
    let conn = state.db_conn.lock().unwrap();
    
    // Get the current todo to update only provided fields
    let mut stmt = conn.prepare("SELECT title, completed FROM todos WHERE id = ?1")
        .map_err(|e| e.to_string())?;
    
    let (current_title, current_completed) = stmt.query_row(params![id], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, bool>(1)?))
    })
    .map_err(|e| e.to_string())?;
    
    let new_title = title.unwrap_or(current_title);
    let new_completed = completed.unwrap_or(current_completed);
    
    conn.execute(
        "UPDATE todos SET title = ?1, completed = ?2 WHERE id = ?3",
        params![new_title, new_completed, id],
    )
    .map_err(|e| e.to_string())?;
    
    Ok(())
}

#[tauri::command]
fn delete_todo(state: tauri::State<AppState>, id: i64) -> Result<(), String> {
    let conn = state.db_conn.lock().unwrap();
    
    conn.execute("DELETE FROM todos WHERE id = ?1", params![id])
        .map_err(|e| e.to_string())?;
    
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let app_config = tauri::Config::default();
    let app_data_dir = app_data_dir(&app_config).expect("Failed to get app data dir");
    let db_path: PathBuf = app_data_dir.join("todos.db");
    
    // Create the app data directory if it doesn't exist
    std::fs::create_dir_all(&app_data_dir).expect("Failed to create app data directory");
    
    // Initialize database connection
    let conn = Connection::open(db_path).expect("Failed to open database");
    init_database(&conn).expect("Failed to initialize database");
    
    let app_state = AppState {
        db_conn: Mutex::new(conn),
    };

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![
            get_all_todos,
            create_todo,
            get_todo,
            update_todo,
            delete_todo
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


pub mod domain;
pub mod ports;
pub mod adapters;

use crate::domain::models::Todo;
use crate::services::todoService::TodoService;
use std::sync::Arc;

#[tauri::command]
pub fn get_all_todos(todo_service: tauri::State<Arc<TodoService>>) -> Result<Vec<Todo>, String> {
    todo_service.get_all_todos().map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_todo(todo_service: tauri::State<Arc<TodoService>>, id: i64) -> Result<Todo, String> {
    todo_service.get_todo(id).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn create_todo(todo_service: tauri::State<Arc<TodoService>>, title: String) -> Result<Todo, String> {
    todo_service.create_todo(title).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn update_todo(
    todo_service: tauri::State<Arc<TodoService>>,
    id: i64,
    title: Option<String>,
    completed: Option<bool>,
) -> Result<(), String> {
    todo_service.update_todo(id, title, completed).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn delete_todo(todo_service: tauri::State<Arc<TodoService>>, id: i64) -> Result<(), String> {
    todo_service.delete_todo(id).map_err(|e| e.to_string())
}
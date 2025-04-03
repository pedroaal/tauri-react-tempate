use crate::domain::models::Todo;
use std::error::Error;

pub trait TodoRepository: Send + Sync {
    fn get_all(&self) -> Result<Vec<Todo>, Box<dyn Error>>;
    fn get_by_id(&self, id: i64) -> Result<Todo, Box<dyn Error>>;
    fn create(&self, todo: Todo) -> Result<Todo, Box<dyn Error>>;
    fn update(&self, todo: Todo) -> Result<(), Box<dyn Error>>;
    fn delete(&self, id: i64) -> Result<(), Box<dyn Error>>;
}
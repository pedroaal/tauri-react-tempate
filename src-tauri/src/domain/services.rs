use crate::domain::models::Todo;
use crate::ports::repositories::TodoRepository;
use std::error::Error;
use std::sync::Arc;

pub struct TodoService {
    repository: Arc<dyn TodoRepository>,
}

impl TodoService {
    pub fn new(repository: Arc<dyn TodoRepository>) -> Self {
        Self { repository }
    }

    pub fn get_all_todos(&self) -> Result<Vec<Todo>, Box<dyn Error>> {
        self.repository.get_all()
    }

    pub fn get_todo(&self, id: i64) -> Result<Todo, Box<dyn Error>> {
        self.repository.get_by_id(id)
    }

    pub fn create_todo(&self, title: String) -> Result<Todo, Box<dyn Error>> {
        let todo = Todo {
            id: None,
            title,
            completed: false,
        };
        self.repository.create(todo)
    }

    pub fn update_todo(&self, id: i64, title: Option<String>, completed: Option<bool>) -> Result<(), Box<dyn Error>> {
        let mut todo = self.repository.get_by_id(id)?;
        
        if let Some(new_title) = title {
            todo.title = new_title;
        }
        
        if let Some(new_completed) = completed {
            todo.completed = new_completed;
        }
        
        self.repository.update(todo)
    }

    pub fn delete_todo(&self, id: i64) -> Result<(), Box<dyn Error>> {
        self.repository.delete(id)
    }
}
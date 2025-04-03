use crate::domain::models::Todo;
use crate::ports::repositories::TodoRepository;
use rusqlite::{params, Connection, Result as SqliteResult};
use std::error::Error;
use std::sync::Mutex;

pub struct SqliteTodoRepository {
    conn: Mutex<Connection>,
}

impl SqliteTodoRepository {
    pub fn new(conn: Connection) -> Self {
        Self {
            conn: Mutex::new(conn),
        }
    }

    pub fn init_database(&self) -> SqliteResult<()> {
        let conn = self.conn.lock().unwrap();
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
}

impl TodoRepository for SqliteTodoRepository {
    fn get_all(&self) -> Result<Vec<Todo>, Box<dyn Error>> {
        let conn = self.conn.lock().unwrap();
        let mut stmt = conn.prepare("SELECT id, title, completed FROM todos")?;
        
        let todos = stmt.query_map([], |row| {
            Ok(Todo {
                id: Some(row.get(0)?),
                title: row.get(1)?,
                completed: row.get(2)?,
            })
        })?
        .collect::<SqliteResult<Vec<Todo>>>()?;
        
        Ok(todos)
    }

    fn get_by_id(&self, id: i64) -> Result<Todo, Box<dyn Error>> {
        let conn = self.conn.lock().unwrap();
        
        let mut stmt = conn.prepare("SELECT id, title, completed FROM todos WHERE id = ?1")?;
        
        let todo = stmt.query_row(params![id], |row| {
            Ok(Todo {
                id: Some(row.get(0)?),
                title: row.get(1)?,
                completed: row.get(2)?,
            })
        })?;
        
        Ok(todo)
    }

    fn create(&self, todo: Todo) -> Result<Todo, Box<dyn Error>> {
        let conn = self.conn.lock().unwrap();
        
        conn.execute(
            "INSERT INTO todos (title, completed) VALUES (?1, ?2)",
            params![todo.title, todo.completed],
        )?;
        
        let id = conn.last_insert_rowid();
        
        Ok(Todo {
            id: Some(id),
            title: todo.title,
            completed: todo.completed,
        })
    }

    fn update(&self, todo: Todo) -> Result<(), Box<dyn Error>> {
        let conn = self.conn.lock().unwrap();
        
        let id = todo.id.ok_or("Todo must have an ID to be updated")?;
        
        conn.execute(
            "UPDATE todos SET title = ?1, completed = ?2 WHERE id = ?3",
            params![todo.title, todo.completed, id],
        )?;
        
        Ok(())
    }

    fn delete(&self, id: i64) -> Result<(), Box<dyn Error>> {
        let conn = self.conn.lock().unwrap();
        
        conn.execute("DELETE FROM todos WHERE id = ?1", params![id])?;
        
        Ok(())
    }
}
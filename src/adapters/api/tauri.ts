import { invoke } from "@tauri-apps/api/tauri"
import type { ITodo } from "../../domain/models/Todo"
import type { ITodoApi } from "../../ports/api/TodoApi"

export class TauriTodoApi implements ITodoApi {
  getAllTodos(): Promise<ITodo[]> {
    return invoke("get_all_todos")
  }

  getTodo(id: number): Promise<ITodo> {
    return invoke("get_todo", { id })
  }

  createTodo(title: string): Promise<ITodo> {
    return invoke("create_todo", { title })
  }

  updateTodo(
    id: number,
    updates: { title?: string; completed?: boolean },
  ): Promise<void> {
    return invoke("update_todo", {
      id,
      title: updates.title,
      completed: updates.completed,
    })
  }

  deleteTodo(id: number): Promise<void> {
    return invoke("delete_todo", { id })
  }
}

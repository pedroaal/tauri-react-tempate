import { invoke } from "@tauri-apps/api/core"
import type { ITodo } from "~/domain/models/todo.interface"
import type { ITodoApi } from "~/domain/ports/todo.adapter.interface"

export class TodoApi implements ITodoApi {
  async getAllTodos(): Promise<ITodo[]> {
    return await invoke("get_all_todos")
  }

  async getTodo(id: number): Promise<ITodo> {
    return await invoke("get_todo", { id })
  }

  async createTodo(title: string): Promise<ITodo> {
    return await invoke("create_todo", { title })
  }

  async updateTodo(
    id: number,
    updates: { title?: string; completed?: boolean },
  ): Promise<void> {
    return await invoke("update_todo", {
      id,
      title: updates.title,
      completed: updates.completed,
    })
  }

  async deleteTodo(id: number): Promise<void> {
    return await invoke("delete_todo", { id })
  }
}

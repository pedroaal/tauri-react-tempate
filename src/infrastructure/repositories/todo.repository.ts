import type { ITodo } from "~/domain/models/todo.interface"
import type { ITodoApi } from "~/domain/ports/api/todo.adapter.interface"

export class TodoRepository implements ITodoApi {
  constructor(private api: ITodoApi) {}

  async getAllTodos(): Promise<ITodo[]> {
    return this.api.getAllTodos()
  }

  async getTodo(id: number): Promise<ITodo> {
    return this.api.getTodo(id)
  }

  async createTodo(title: string): Promise<ITodo> {
    return this.api.createTodo(title)
  }

  async updateTodo(
    id: number,
    updates: { title?: string; completed?: boolean },
  ): Promise<void> {
    return this.api.updateTodo(id, updates)
  }

  async deleteTodo(id: number): Promise<void> {
    return this.api.deleteTodo(id)
  }
}

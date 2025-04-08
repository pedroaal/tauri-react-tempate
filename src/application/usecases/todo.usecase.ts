import type { ITodo } from "~/domain/models/todo.interface"
import type { ITodoApi } from "~/domain/ports/api/todo.adapter.interface"

export class TodoUseCase {
  constructor(private repository: ITodoApi) {}

  async getAllTodos(): Promise<ITodo[]> {
    return this.repository.getAllTodos()
  }

  async getTodo(id: number): Promise<ITodo> {
    return this.repository.getTodo(id)
  }

  async createTodo(title: string): Promise<ITodo> {
    return this.repository.createTodo(title)
  }

  async updateTodo(
    id: number,
    updates: { title?: string; completed?: boolean },
  ): Promise<void> {
    return this.repository.updateTodo(id, updates)
  }

  async toggleTodoCompletion(id: number, currentStatus: boolean): Promise<void> {
    return this.repository.updateTodo(id, { completed: !currentStatus })
  }

  async deleteTodo(id: number): Promise<void> {
    return this.repository.deleteTodo(id)
  }
}

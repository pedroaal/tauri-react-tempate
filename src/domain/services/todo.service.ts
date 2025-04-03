import type { ITodo } from "../models/todo.interface"
import type { ITodoApi } from "../ports/todo.adapter.interface"

export class TodoService {
  constructor(private api: ITodoApi) {}

  getAllTodos(): Promise<ITodo[]> {
    return this.api.getAllTodos()
  }

  getTodo(id: number): Promise<ITodo> {
    return this.api.getTodo(id)
  }

  createTodo(title: string): Promise<ITodo> {
    return this.api.createTodo(title)
  }

  updateTodo(
    id: number,
    updates: { title?: string; completed?: boolean },
  ): Promise<void> {
    return this.api.updateTodo(id, updates)
  }

  toggleTodoCompletion(id: number, currentStatus: boolean): Promise<void> {
    return this.api.updateTodo(id, { completed: !currentStatus })
  }

  deleteTodo(id: number): Promise<void> {
    return this.api.deleteTodo(id)
  }
}

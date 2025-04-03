import type { ITodo } from "../../domain/models/Todo"

export interface ITodoApi {
  getAllTodos(): Promise<ITodo[]>
  getTodo(id: number): Promise<ITodo>
  createTodo(title: string): Promise<ITodo>
  updateTodo(
    id: number,
    updates: { title?: string; completed?: boolean },
  ): Promise<void>
  deleteTodo(id: number): Promise<void>
}

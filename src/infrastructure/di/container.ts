import { TodoApi } from "~/adapters/api/todo.adapter"
import { TodoUseCase } from "~/application/usecases/todo.usecase"
import { TodoRepository } from "~/infrastructure/repositories/todo.repository"

let todoApiInstance: TodoApi | null = null
let todoRepositoryInstance: TodoRepository | null = null
let todoUseCaseInstance: TodoUseCase | null = null

export const getDependencies = () => {
  if (!todoApiInstance) {
    todoApiInstance = new TodoApi()
  }

  if (!todoRepositoryInstance) {
    todoRepositoryInstance = new TodoRepository(todoApiInstance)
  }

  if (!todoUseCaseInstance) {
    todoUseCaseInstance = new TodoUseCase(todoRepositoryInstance)
  }

  return {
    todoApi: todoApiInstance,
    todoRepository: todoRepositoryInstance,
    todoUseCase: todoUseCaseInstance,
  }
}

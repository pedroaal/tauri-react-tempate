import { create } from "zustand"
import type { ITodo } from "~/domain/models/todo.interface"
import { getDependencies } from "~/infrastructure/di/container"

interface ITodoStore {
  todos: ITodo[]
  loading: boolean
  error: string | null
  fetchTodos: () => Promise<void>
  addTodo: (title: string) => Promise<void>
  toggleTodo: (id: number, completed: boolean) => Promise<void>
  deleteTodo: (id: number) => Promise<void>
}

const { todoUseCase } = getDependencies()

const useTodoStore = create<ITodoStore>((set) => ({
  todos: [],
  loading: false,
  error: null,

  fetchTodos: async () => {
    try {
      set({ loading: true })
      const todos = await todoUseCase.getAllTodos()
      set({ todos, error: null })
    } catch (err) {
      console.error("Failed to fetch todos:", err)
      set({ error: "Failed to fetch todos" })
    } finally {
      set({ loading: false })
    }
  },

  addTodo: async (title: string) => {
    try {
      const newTodo = await todoUseCase.createTodo(title)
      set((state) => ({ 
        todos: [...state.todos, newTodo],
        error: null
      }))
    } catch (err) {
      console.error("Failed to add todo:", err)
      set({ error: "Failed to add todo" })
    }
  },

  toggleTodo: async (id: number, completed: boolean) => {
    try {
      await todoUseCase.toggleTodoCompletion(id, completed)
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        ),
        error: null
      }))
    } catch (err) {
      console.error("Failed to toggle todo:", err)
      set({ error: "Failed to update todo" })
    }
  },

  deleteTodo: async (id: number) => {
    try {
      await todoUseCase.deleteTodo(id)
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
        error: null
      }))
    } catch (err) {
      console.error("Failed to delete todo:", err)
      set({ error: "Failed to delete todo" })
    }
  }
}))

export default useTodoStore

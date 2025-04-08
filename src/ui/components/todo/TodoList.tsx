import { useEffect } from "react"
import TodoItem from "~/ui/components/todo/TodoItem"
import TodoForm from "~/ui/components/todo/TodoForm"
import useTodoStore from "~/ui/store/todoStore"

const TodoList = () => {
  const { todos, loading, error, fetchTodos, addTodo, toggleTodo, deleteTodo } = useTodoStore()
  
  useEffect(() => {
    fetchTodos()
  }, [])

  if (loading) return <div className="text-center py-4">Loading todos...</div>

  return (
    <div className="flex flex-col gap-4">
      <TodoForm onAddTodo={addTodo} />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="flex flex-col gap-2">
        {todos.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No todos yet. Add one above!</div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default TodoList

import { useEffect } from "react"
import useTodoStore from "~/ui/store/todoStore"

const Main = () => {
  const { todos, loading, fetchTodos } = useTodoStore()

  useEffect(() => {
    fetchTodos()
  }, [])

  if (loading) {
    return <div className="text-center py-4">Loading todos...</div>
  }

  return (
    <div className="grid gap-2">
      {todos.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No todos available</div>
      ) : (
        todos.map((todo) => (
          <div 
            key={todo.id} 
            className={`p-3 border rounded-md ${todo.completed ? 'bg-gray-100' : 'bg-white'}`}
          >
            {todo.title}
          </div>
        ))
      )}
    </div>
  )
}

export default Main

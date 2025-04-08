import type { ITodo } from "~/domain/models/todo.interface"
import { Button } from "~/ui/components/shared/Button"

interface TodoItemProps {
  todo: ITodo
  onToggle: (id: number, completed: boolean) => Promise<void>
  onDelete: (id: number) => Promise<void>
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  const handleToggle = async () => {
    if (todo.id !== undefined) {
      await onToggle(todo.id, todo.completed)
    }
  }

  const handleDelete = async () => {
    if (todo.id !== undefined) {
      await onDelete(todo.id)
    }
  }

  return (
    <div className="flex items-center justify-between p-3 border rounded-md bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="h-4 w-4 rounded border-gray-300"
        />
        <span className={todo.completed ? "line-through text-gray-500" : ""}>
          {todo.title}
        </span>
      </div>
      <Button variant="destructive" size="sm" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  )
}

export default TodoItem

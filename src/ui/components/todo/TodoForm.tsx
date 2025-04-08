import { useState } from "react"
import { Button } from "~/ui/components/shared/Button"
import { Input } from "~/ui/components/shared/Input"

interface TodoFormProps {
  onAddTodo: (title: string) => Promise<void>
}

const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const [title, setTitle] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) return
    
    try {
      setIsSubmitting(true)
      await onAddTodo(title.trim())
      setTitle("")
    } catch (error) {
      console.error("Failed to add todo:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        disabled={isSubmitting}
        className="flex-1"
      />
      <Button type="submit" disabled={!title.trim() || isSubmitting}>
        {isSubmitting ? "Adding..." : "Add"}
      </Button>
    </form>
  )
}

export default TodoForm

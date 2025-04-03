import { TodoService } from "~/services/todo.service"

const Main = () => {
  const repo = new TodoService()
  const data = repo.getAllTodos()

  return (
    <div className="grid">
      {data.map((item) => (
        <div key={item.id} title={item.name} />
      ))}
    </div>
  )
}

export default Main

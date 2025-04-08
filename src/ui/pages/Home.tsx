import { useState } from "react"
import TodoList from "~/ui/components/todo/TodoList"
import { Input } from "~/ui/components/shared/Input"

const Home = () => {
  const [search, setSearch] = useState("")

  return (
    <div className="flex flex-col gap-4 p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Todo Application</h1>
      <Input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search todos..."
        className="mb-2"
      />
      <TodoList />
    </div>
  )
}

export default Home

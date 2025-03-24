import { useState } from "react"

import Main from "~/components/Main"

import { Input } from "~/components/ui/input"

const Home = () => {
  const [search, setSearch] = useState("")

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <Main />
    </div>
  )
}

export default Home

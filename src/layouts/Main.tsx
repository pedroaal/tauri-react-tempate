import { Outlet } from "react-router-dom"

import Nav from "./Nav"

const Main = () => {
  return (
    <div className="h-dvh w-dvw flex flex-col">
      <div className="grow overflow-x-auto max-w-full">
        <Outlet />
      </div>
      <Nav />
    </div>
  )
}

export default Main

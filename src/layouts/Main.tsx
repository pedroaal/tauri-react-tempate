import { Outlet } from "react-router-dom"

import Nav from "./Nav"

const Main = () => {
  return (
    <div className="min-w-screen min-h-screen">
      <div className="container">
        <Outlet />
        <Nav />
      </div>
    </div>
  )
}

export default Main

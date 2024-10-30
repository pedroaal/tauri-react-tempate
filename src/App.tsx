import { createPortal } from "react-dom"
import { RouterProvider } from "react-router-dom"

import router from "./config/router"

import Alerts from "~/components/core/Alerts"
import Loader from "~/components/core/Loader"

import "./index.css"

const App = () => {
  const portal = document.getElementById("portal") as HTMLElement

  return (
    <>
      <RouterProvider router={router} />
      {createPortal(<Alerts />, portal)}
      {createPortal(<Loader />, portal)}
    </>
  )
}

export default App

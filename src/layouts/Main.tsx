import { createPortal } from "react-dom"
import { Outlet } from "react-router-dom"

import Nav from "./Nav"
import Alerts from "~/components/core/Alerts"
import Loader from "~/components/core/Loader"
import Modals from "~/components/core/Modals"

const Main = () => {
  return (
    <div className="min-w-screen min-h-screen">
      <div className="container">
        <Outlet />
        <Nav />
      </div>
      {createPortal(
        <>
          <Alerts />
          <Loader />
          <Modals />
        </>,
        document.getElementById("portal") as HTMLElement,
      )}
    </div>
  )
}

export default Main

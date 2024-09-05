import { createPortal } from "react-dom"
import { RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import router from "./config/router"

import Alerts from "~/components/core/Alerts"
import Loader from "~/components/core/Loader"

import "./index.css"

const queryClient = new QueryClient()

const App = () => {
  const portal = document.getElementById("portal") as HTMLElement

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {createPortal(<Alerts />, portal)}
      {createPortal(<Loader />, portal)}
    </QueryClientProvider>
  )
}

export default App

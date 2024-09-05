import { createPortal } from "react-dom"
import { RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import router from "./config/router"

import Alerts from "~/components/core/Alerts"
import Loader from "~/components/core/Loader"
import Modals from "~/components/core/Modals"

import "./index.css"

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {createPortal(
        <>
          <Alerts />
          <Loader />
          <Modals />
        </>,
        document.getElementById("portal") as HTMLElement,
      )}
    </QueryClientProvider>
  )
}

export default App

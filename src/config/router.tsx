import { createBrowserRouter } from "react-router-dom"

import About from "~/screens/About"
import Home from "~/screens/Home"
import Main from "~/layouts/Main"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
])

export default router

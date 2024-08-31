import { createBrowserRouter } from "react-router-dom"

import Routes from "~/constants/routes"

import Main from "~/layouts/Main"

import About from "~/screens/About"
import Home from "~/screens/Home"

const router = createBrowserRouter([
  {
    path: Routes.Home,
    element: <Main />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: Routes.About,
        element: <About />,
      },
    ],
  },
])

export default router

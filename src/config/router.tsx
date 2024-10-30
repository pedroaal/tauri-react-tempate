import { createBrowserRouter } from "react-router-dom"

import Routes from "~/constants/routes"

import Main from "~/layouts/Main"

import Home from "~/screens/Home"
import Profile from "~/screens/Profile"

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
        path: Routes.Profile,
        element: <Profile />,
      },
    ],
  },
])

export default router

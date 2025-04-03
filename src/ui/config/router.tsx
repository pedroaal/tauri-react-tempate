import { createBrowserRouter } from "react-router-dom"

import Routes from "~/ui/constants/routes"

import Main from "~/ui/layouts/Main"

import Home from "~/ui/pages/Home"
import Profile from "~/ui/pages/Profile"

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

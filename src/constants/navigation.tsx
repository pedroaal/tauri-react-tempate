import { HomeIcon, PersonIcon } from "@radix-ui/react-icons"

import Routes from "./routes"

const navigation = [
  {
    name: "Home",
    path: Routes.Home,
    icon: <HomeIcon className="size-6" />,
  },
  {
    name: "Profile",
    path: Routes.Profile,
    icon: <PersonIcon className="size-6" />,
  },
]

export default navigation

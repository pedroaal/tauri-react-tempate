import { HomeIcon, UserIcon } from "@heroicons/react/24/outline"

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
    icon: <UserIcon className="size-6" />,
  },
]

export default navigation

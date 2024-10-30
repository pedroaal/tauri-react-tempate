import { HomeIcon, PersonIcon } from "@radix-ui/react-icons"

import Routes from "./routes"

const navigation = [
  {
    name: Routes.Home,
    icon: <HomeIcon className="size-6" />,
  },
  {
    name: Routes.Profile,
    icon: <PersonIcon className="size-6" />,
  },
]

export default navigation

import { Link } from "react-router-dom"

import navigation from "~/constants/navigation"

const Nav = () => {
  return (
    <div className="">
      {navigation.map((route) => {
        return (
          <Link key={route.name} to={route.name}>
            {route.icon}
          </Link>
        )
      })}
    </div>
  )
}

export default Nav

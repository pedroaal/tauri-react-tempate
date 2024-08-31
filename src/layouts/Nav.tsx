import { Link, useLocation } from "react-router-dom"

import navigation from "~/constants/navigation"

const Nav = () => {
  const location = useLocation()

  return (
    <div className="btm-nav">
      {navigation.map((route) => {
        const { icon } = route
        const isActive = location.pathname === route.name ? "active" : ""

        return (
          <Link key={route.name} to={route.name} className={isActive}>
            {icon({ className: "size-6" })}
          </Link>
        )
      })}
    </div>
  )
}

export default Nav

import { Link, useNavigation } from "react-router-dom"

import navigation from "~/constants/navigation"

const Nav = () => {
  const navigator = useNavigation()

  return (
    <div className="btm-nav">
      {navigation.map((route) => {
        const { icon } = route
        const isActive = navigator.location === route.name ? "active" : ""

        return (
          <Link key={route.name} to={route.name}>
            <button className={isActive}>
              {icon({ className: "size-6" })}
            </button>
          </Link>
        )
      })}
    </div>
  )
}

export default Nav

import { useNavigation } from "react-router-dom"

import ROUTES from "@/constants/navigation"

const Nav = () => {
  const { location } = useNavigation()

  return (
    <div className="btm-nav">
      {ROUTES.map((route) => {
        const { icon } = route
        const isActive = location === route.name ? "active" : ""

        return (
          <button key={route.name} className={isActive}>
            {icon({ className: "size-6" })}
          </button>
        )
      })}
    </div>
  )
}

export default Nav

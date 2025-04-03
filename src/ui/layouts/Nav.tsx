import { NavLink } from "react-router-dom"

import navigation from "~/ui/constants/navigation"
import { cn } from "~/utils/classes"

const Nav = () => {
  return (
    <div className="flex h-16 w-full items-center justify-around border-t bg-white shadow-t">
      {navigation.map((route) => {
        return (
          <NavLink
            key={route.name}
            to={route.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground",
              )
            }
          >
            {route.icon}
            <span className="text-xs font-medium">{route.name}</span>
          </NavLink>
        )
      })}
    </div>
  )
}

export default Nav

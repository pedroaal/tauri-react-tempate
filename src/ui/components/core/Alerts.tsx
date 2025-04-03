import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline"

import useAlertStore, { type IAlertTypes } from "~/ui/store/alertStore"

import { Alert, AlertDescription, AlertTitle } from "./Alert"

const getConfig = (
  type: IAlertTypes,
): {
  variant: IAlertTypes
  icon: JSX.Element
} => {
  switch (type) {
    case "success":
      return {
        variant: "success",
        icon: <CheckCircleIcon className="size-4" />,
      }
    case "error":
      return {
        variant: "error",
        icon: <ExclamationTriangleIcon className="size-4" />,
      }
    case "warning":
      return {
        variant: "warning",
        icon: <ExclamationTriangleIcon className="size-4" />,
      }
    case "info":
      return {
        variant: "info",
        icon: <InformationCircleIcon className="size-4" />,
      }
    default:
      return {
        variant: undefined,
        icon: <RocketLaunchIcon className="size-4" />,
      }
  }
}

const Alerts = () => {
  const { alerts } = useAlertStore()

  if (alerts.length === 0) return null

  return (
    <div className="w-full md:w-1/2 fixed top-0 right-0 overflow-y-auto z-50">
      <div className="flex flex-col gap-4 p-4">
        {alerts.map((item, index) => {
          const { variant, icon } = getConfig(item.type)

          return (
            <Alert
              key={`alert.${index}`}
              variant={variant}
              className="flex gap-2"
            >
              {icon}
              <div className="flex flex-col gap-2">
                <AlertTitle>{item.title}</AlertTitle>
                {item.description && (
                  <AlertDescription>{item.description}</AlertDescription>
                )}
              </div>
            </Alert>
          )
        })}
      </div>
    </div>
  )
}

export default Alerts

import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
  RocketIcon,
} from "@radix-ui/react-icons"

import useAlertStore, { type IAlertTypes } from "~/store/alertStore"

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"

const getConfig = (
  type: string,
): {
  variant: IAlertTypes
  icon: JSX.Element
} => {
  switch (type) {
    case "success":
      return {
        variant: "success",
        icon: <CheckCircledIcon className="size-4" />,
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
        icon: <InfoCircledIcon className="size-4" />,
      }
    default:
      return {
        variant: undefined,
        icon: <RocketIcon className="size-4" />,
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
            <Alert key={index} variant={variant} className="flex gap-2">
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

import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons"

import useAlertStore from "~/store/alertStore"

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"

const getConfig = (type: string): JSX.Element => {
  switch (type) {
    case "success":
      return <CheckCircledIcon className="size-6" />
    case "error":
      return <ExclamationTriangleIcon className="size-6" />
    case "warning":
      return <ExclamationTriangleIcon className="size-6" />
    default:
      return <InfoCircledIcon className="size-6" />
  }
}

const Alerts = () => {
  const { alerts } = useAlertStore()

  if (alerts.length === 0) return null

  return (
    <div className="w-full md:w-1/2 fixed top-0 right-0 overflow-y-auto z-50">
      <div className="flex flex-col gap-4 p-4">
        {alerts.map((item, index) => {
          const icon = getConfig(item.type)
          const variant = item.type === "error" ? "destructive" : "default"

          return (
            <Alert key={index} variant={variant}>
              {icon}
              <AlertTitle>{item.title}</AlertTitle>
              {item.description && (
                <AlertDescription>{item.description}</AlertDescription>
              )}
            </Alert>
          )
        })}
      </div>
    </div>
  )
}

export default Alerts

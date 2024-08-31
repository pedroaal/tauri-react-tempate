import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineExclamationTriangle,
  HiOutlineInformationCircle,
} from "react-icons/hi2"
import useAlertStore from "~/store/alertStore"

interface IConfig {
  color: string
  icon: JSX.Element
}

const getConfig = (type: string): IConfig => {
  switch (type) {
    case "success":
      return {
        color: "alert-success",
        icon: <HiOutlineCheckCircle className="size-6" />,
      }
    case "error":
      return {
        color: "alert-error",
        icon: <HiOutlineExclamationCircle className="size-6" />,
      }
    case "warning":
      return {
        color: "alert-warning",
        icon: <HiOutlineExclamationTriangle className="size-6" />,
      }
    default:
      return {
        color: "alert-info",
        icon: <HiOutlineInformationCircle className="size-6" />,
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
          const { color, icon } = getConfig(item.type)

          return (
            <div key={index} className={`alert ${color}`} role="alert">
              {icon}
              <div className="flex flex-col gap-2">
                <span>{item.title}</span>
                {item.value && <span>{item.value}</span>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Alerts

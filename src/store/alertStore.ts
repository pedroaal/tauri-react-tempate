import { create } from "zustand"
import { AUTO_DISMISS_AFTER_MS } from "~/constants/core"

export type IAlertTypes =
  | "success"
  | "error"
  | "warning"
  | "info"
  | null
  | undefined

export interface IAlert {
  id: string
  type: IAlertTypes
  title: string
  description?: string
}

interface IAlertStore {
  alerts: IAlert[]
  addAlert: (alert: IAlert) => void
  removeAlert: (alert: IAlert) => void
}

const useAlertStore = create<IAlertStore>((set) => ({
  alerts: [],
  addAlert: (alert: IAlert) => {
    set((state: IAlertStore) => ({
      alerts: [...state.alerts, alert],
    }))

    setTimeout(() => {
      set((state: IAlertStore) => ({
        alerts: state.alerts.filter((item) => item.id !== alert.id),
      }))
    }, AUTO_DISMISS_AFTER_MS)
  },
  removeAlert: (alert: IAlert) =>
    set((state: IAlertStore) => ({
      alerts: state.alerts.filter((item) => item.id !== alert.id),
    })),
}))

export default useAlertStore

import { create } from "zustand"

export type IAlertTypes = "SUCCESS" | "DANGER" | "WARNING" | "INFO"

export interface IAlert {
  type: IAlertTypes
  title?: string
  value: string
}

interface IAlertStore {
  alerts: IAlert[]
  addAlert: (alert: IAlert) => void
  removeAlert: (alert: IAlert) => void
}

const useAlertStore = create<IAlertStore>((set) => ({
  alerts: [],
  addAlert: (alert) =>
    set((state) => ({
      alerts: [...state.alerts, alert],
    })),
  removeAlert: (alert) =>
    set((state) => ({
      alerts: state.alerts.filter((item) => item.value !== alert.value),
    })),
}))

export default useAlertStore

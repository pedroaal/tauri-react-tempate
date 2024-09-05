import { create } from "zustand"

export type IAlertTypes =
  | "success"
  | "error"
  | "warning"
  | "info"
  | null
  | undefined

export interface IAlert {
  type: IAlertTypes
  title?: string
  description: string
}

interface IAlertStore {
  alerts: IAlert[]
  addAlert: (alert: IAlert) => void
  removeAlert: (alert: IAlert) => void
}

const useAlertStore = create<IAlertStore>((set) => ({
  alerts: [],
  addAlert: (alert: IAlert) =>
    set((state: IAlertStore) => ({
      alerts: [...state.alerts, alert],
    })),
  removeAlert: (alert: IAlert) =>
    set((state: IAlertStore) => ({
      alerts: state.alerts.filter(
        (item) => item.description !== alert.description,
      ),
    })),
}))

export default useAlertStore

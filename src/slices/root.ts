import alertsSlice from "./alertsSlice"
import loaderSlice from "./loaderSlice"
import modalSlice from "./modalSlice"

export const rootReducer = {
  alerts: alertsSlice,
  loader: loaderSlice,
  modal: modalSlice,
}

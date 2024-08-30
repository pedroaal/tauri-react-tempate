import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type IAlertTypes = "SUCCESS" | "DANGER" | "WARNING" | "INFO"

export interface IAlert {
  type: IAlertTypes
  title?: string
  value: string
}

export interface IAlertsState {
  list: IAlert[]
}

const initialState: IAlertsState = {
  list: [],
}

export const alertsSlice = createSlice({
  name: "alertsSlice",
  initialState,
  reducers: {
    addAlertItem: (state, { payload }: PayloadAction<IAlert>) => {
      state.list = [...state.list, payload]
    },
    removeAlertItem: (state, { payload }: PayloadAction<IAlert>) => {
      state.list = state.list.filter((item) => item.value !== payload.value)
    },
  },
})

export const { addAlertItem, removeAlertItem } = alertsSlice.actions

export default alertsSlice.reducer

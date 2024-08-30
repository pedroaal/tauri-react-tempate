import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface ILoaderState {
  list: string[]
}

const initialState: ILoaderState = {
  list: [],
}

export const loaderSlice = createSlice({
  name: "loaderSlice",
  initialState,
  reducers: {
    addLoaderItem: (state, { payload }: PayloadAction<string>) => {
      state.list = [...state.list, payload]
    },
    removeLoaderItem: (state, { payload }: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item !== payload)
    },
  },
})

export const { addLoaderItem, removeLoaderItem } = loaderSlice.actions
export default loaderSlice.reducer

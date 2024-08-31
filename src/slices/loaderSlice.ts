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
    addLoader: (state, { payload }: PayloadAction<string>) => {
      state.list = [...state.list, payload]
    },
    removeLoader: (state, { payload }: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item !== payload)
    },
  },
})

export const { addLoader, removeLoader } = loaderSlice.actions
export default loaderSlice.reducer

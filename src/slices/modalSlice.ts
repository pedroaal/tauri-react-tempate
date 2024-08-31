import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { IModals } from "~/modals/Index"

export interface IModalComponent {
  component: IModals
  // eslint-disable-next-line
  props?: any
}

export interface IReducer {
  showModal: boolean
  modal?: IModalComponent
}

const initialState: IReducer = {
  showModal: false,
}

export const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IModalComponent>) => {
      state.showModal = true
      state.modal = action.payload
    },
    closeModal: (state) => {
      state.showModal = false
      state.modal = undefined
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer

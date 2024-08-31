import { create } from "zustand"

import type { IModals } from "~/modals/Index"

export interface IModalComponent {
  component: IModals
  // eslint-disable-next-line
  props?: any
}

interface IModalStore {
  showModal: boolean
  modal?: IModalComponent
  openModal: (modal: IModalComponent) => void
  closeModal: () => void
}

const useModalStore = create<IModalStore>((set) => ({
  showModal: false,
  modal: undefined,
  openModal: (modal) =>
    set({
      showModal: true,
      modal,
    }),
  closeModal: () =>
    set({
      showModal: false,
      modal: undefined,
    }),
}))

export default useModalStore

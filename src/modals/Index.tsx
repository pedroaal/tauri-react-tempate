import Main from "./Main"

const MODALS = {
  main: {
    component: Main,
    props: {},
  },
}

export type IModals = keyof typeof MODALS
export default MODALS

const MODALS = {
  main: {
    component: <div>Main Modal</div>,
    props: {},
  },
}

export type IModals = keyof typeof MODALS
export default MODALS

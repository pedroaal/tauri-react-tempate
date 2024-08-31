import { useMemo } from "react"

import { useAppSelector } from "~/hooks/useStore"

import MODALS from "~/modals/Index"

const Modals = () => {
  const { showModal, modal } = useAppSelector((state) => state.modal)

  const props = useMemo(() => {
    if (modal?.component && MODALS[modal?.component]) {
      return {
        ...MODALS[modal?.component].props,
        ...modal?.props,
      }
    }
    return modal?.props || {}
  }, [modal])

  const ActiveComponent = useMemo(() => {
    if (modal?.component && MODALS[modal.component]) {
      return MODALS[modal.component].component
    }
    return null
  }, [modal?.component])

  if (!showModal || !ActiveComponent) {
    return null
  }

  return <>{ActiveComponent(props)}</>
}

export default Modals

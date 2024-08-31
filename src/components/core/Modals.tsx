import { createContext, useMemo, useState, useCallback } from "react"

import { useAppSelector } from "~/hooks/useStore"

import MODALS from "~/modals/Index"

interface ICallback {
  callback(): void
  addCallback(fn: (...args: any) => void): void
}

export const CallbackContext = createContext<ICallback | null>(null)

const Modals = () => {
  const { showModal, modal } = useAppSelector((state) => state.modal)

  const [callback, setCallback] = useState<() => void>(() => null)

  const props = useMemo(() => {
    if (modal?.component && MODALS[modal?.component]) {
      return {
        ...MODALS[modal?.component].props,
        ...modal?.props,
      }
    }
    return modal?.props
  }, [modal])

  const getActiveComponent = (): any => {
    if (modal?.component && MODALS[modal?.component]) {
      return MODALS[modal?.component].component
    }
    return null
  }

  const ActiveComponent = getActiveComponent()

  const addCallback = useCallback((fn: () => void) => {
    setCallback(() => fn)
  }, [])

  if (!(showModal && ActiveComponent)) {
    return <></>
  }

  return (
    <CallbackContext.Provider value={{ callback, addCallback }}>
      <ActiveComponent {...props} />
    </CallbackContext.Provider>
  )
}

export default Modals

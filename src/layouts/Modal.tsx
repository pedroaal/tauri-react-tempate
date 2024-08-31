import type { ReactNode } from "react"
import { HiOutlineXMark } from "react-icons/hi2"

import useModalStore from "~/store/modalStore"

import ButtonIcon from "~/components/core/ButtonIcon"

interface IProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
}

const Modal = (props: IProps) => {
  const { children, header, footer } = props

  const { closeModal } = useModalStore()

  const handleClose = () => {
    closeModal()
  }

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <div className="flex flex-row-reverse justify-between">
          <ButtonIcon
            onClick={handleClose}
            icon={
              <HiOutlineXMark
                className="text-gray-900 size-6"
                aria-hidden="true"
              />
            }
            className="btn-sm btn-circle btn-ghost"
          />
          <h4>{header}</h4>
        </div>

        <div className="flex flex-col flex-wrap items-center flex-1">
          {children}
        </div>

        {footer && <div className="modal-action">{footer}</div>}
      </div>
    </dialog>
  )
}

export default Modal

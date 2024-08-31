import { forwardRef } from "react"
import type { ReactNode } from "react"
import { HiOutlineXMark } from "react-icons/hi2"

import { closeModal } from "~/slices/modalSlice"
import { useAppDispatch } from "~/hooks/useStore"

import ButtonIcon from "~/components/core/ButtonIcon"

interface IProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
}

const Modal = (props: IProps) => {
  const { children, header, footer } = props

  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(closeModal())
  }

  return (
    <dialog className="modal">
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
            className="modal-backdrop"
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

export default forwardRef(Modal)

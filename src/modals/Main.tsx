import Modal from "~/layouts/Modal"

interface IProps {
  title: string
}

const Main = (props: IProps) => {
  const { title } = props

  return (
    <Modal>
      <div>Main Modal {title}</div>
    </Modal>
  )
}

export default Main

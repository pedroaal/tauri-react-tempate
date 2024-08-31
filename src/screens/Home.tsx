import useAlertStore from "~/store/alertStore"
import useLoaderStore from "~/store/loaderStore"
import useModalStore from "~/store/modalStore"

const Home = () => {
  const { addAlert, removeAlert } = useAlertStore()
  const { addLoader, removeLoader } = useLoaderStore()
  const { openModal } = useModalStore()

  const handleModal = () => {
    openModal({ component: "main", props: { title: "Main Modal" } })
  }

  const handleAlert = () => {
    addAlert({ title: "Alert", type: "SUCCESS", value: "Success" })
    setTimeout(() => {
      removeAlert({ title: "Alert", type: "SUCCESS", value: "Success" })
    }, 1000)
  }

  const handleLoader = () => {
    addLoader("main")
    setTimeout(() => {
      removeLoader("main")
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-4">
      <h4>Home</h4>
      <button type="button" className="btn" onClick={handleModal}>
        Open Modal
      </button>
      <button type="button" className="btn" onClick={handleAlert}>
        Add Alert
      </button>
      <button type="button" className="btn" onClick={handleLoader}>
        Add Loader
      </button>
    </div>
  )
}

export default Home

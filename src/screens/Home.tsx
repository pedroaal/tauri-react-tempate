import { Button } from "~/components/ui/button"
import MainModal from "~/modals/Main"
import { sayHello } from "~/services/greet"
import useAlertStore from "~/store/alertStore"
import useLoaderStore from "~/store/loaderStore"

const Home = () => {
  const { addAlert, removeAlert } = useAlertStore()
  const { addLoader, removeLoader } = useLoaderStore()

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

  const handleGreet = () => {
    sayHello("Pedro")
  }

  return (
    <div className="flex flex-col gap-4">
      <h4>Home</h4>
      <MainModal title="Hello from Main Modal" />
      <Button onClick={handleAlert}>Add Alert</Button>
      <Button onClick={handleLoader}>Add Loader</Button>
      <Button onClick={handleGreet}>Say hello</Button>
    </div>
  )
}

export default Home

import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { RouterProvider } from "react-router-dom"

import router from "./config/router"
import { persistor, store } from "~/utils/store"

import "./styles/index.scss"

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  )
}

export default App

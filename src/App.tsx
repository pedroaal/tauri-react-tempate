import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "@/utils/store"

import "./styles/index.scss"

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="container">Welcome to Tauri!</div>
      </PersistGate>
    </Provider>
  )
}

export default App

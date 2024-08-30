import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from "./App"

const container = document.getElementById("root")
createRoot(container as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

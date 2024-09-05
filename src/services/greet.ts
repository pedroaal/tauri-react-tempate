import { invoke } from "@tauri-apps/api/core"

export const sayHello = async (name: string) => {
  const mssg = await invoke("greet", { name })
  return mssg
}

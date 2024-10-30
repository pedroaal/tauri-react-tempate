import { create } from "zustand"
import supabase from "~/utils/supabase"

interface ILaundryStore {
  laundries: string[]
  getAll: (key: string) => void
}

const useLoaderStore = create<ILaundryStore>((set) => ({
  laundries: [],
  getAll: async () => {
    const { data } = await supabase.from("laundries").select()
    set(() => ({ laundries: data ?? [] }))
  },
}))

export default useLoaderStore

import { create } from "zustand"

import { LaundriesCollectionId } from "~/config/collections"
import { APPWRITE_DB_ID, db } from "~/utils/appwrite"
import { useQuery } from "~/utils/baseQuery"

interface ILaundryStore {
  laundries: any[]
  getAll: (key: string) => void
}

const useLaundryStore = create<ILaundryStore>((set) => ({
  laundries: [],
  getAll: async () => {
    const data = await useQuery(
      () => db.listDocuments(APPWRITE_DB_ID, LaundriesCollectionId),
      {},
    )

    set(() => ({ laundries: data ?? [] }))
  },
}))

export default useLaundryStore

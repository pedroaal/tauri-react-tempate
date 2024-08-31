import { create } from "zustand"

interface ILoaderStore {
  loaders: string[]
  addLoader: (key: string) => void
  removeLoader: (key: string) => void
}

const useLoaderStore = create<ILoaderStore>((set) => ({
  loaders: [],
  addLoader: (loader) =>
    set((state) => ({
      loaders: [...state.loaders, loader],
    })),
  removeLoader: (loader) =>
    set((state) => ({
      loaders: state.loaders.filter((item) => item !== loader),
    })),
}))

export default useLoaderStore

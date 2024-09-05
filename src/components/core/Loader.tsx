import useLoaderStore from "~/store/loaderStore"

const Loader = () => {
  const { loaders } = useLoaderStore()

  if (loaders.length === 0) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
      <div className="w-full h-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    </div>
  )
}

export default Loader

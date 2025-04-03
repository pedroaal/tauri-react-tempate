import useLoaderStore from "~/store/loaderStore"

const Loader = () => {
  const { loaders } = useLoaderStore()

  if (loaders.length === 0) return null

  return (
    <div className="fixed inset-0 bg-black/60">
      <div className="w-full h-full flex justify-center items-center">
        <span className="loader w-20 h-20" />
      </div>
    </div>
  )
}

export default Loader

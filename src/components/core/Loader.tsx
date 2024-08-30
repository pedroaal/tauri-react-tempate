import { useAppSelector } from "@/hooks/useStore"

const Loader = () => {
  const { list } = useAppSelector((state) => state.loader)

  if (list.length === 0) return null

  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-50 bg-base-content/25 backdrop-blur-sm">
      <div className="w-full h-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    </div>
  )
}

export default Loader

import useMainStore from "~/store/mainStore"

const Main = () => {
  const data = useMainStore((state) => state.data)

  return (
    <div className="grid">
      {data.map((item) => (
        <div key={item.id} title={item.name} />
      ))}
    </div>
  )
}

export default Main

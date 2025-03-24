const Main = () => {
  const data = [] // call from backend

  return (
    <div className="grid">
      {data.map((item) => (
        <div key={item.id} title={item.name} />
      ))}
    </div>
  )
}

export default Main

import useLaundryStore from "~/store/laundryStore"

import { Card } from "./ui/card"

const Laundries = () => {
  const laundries = useLaundryStore((state) => state.laundries)

  return (
    <div className="grid">
      {laundries.map((item) => (
        <Card key={item.id} title={item.name} />
      ))}
    </div>
  )
}

export default Laundries

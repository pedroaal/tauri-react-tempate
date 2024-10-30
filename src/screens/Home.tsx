import Laundry from "~/components/Laundry"
import Promos from "~/components/Promos"
import Search from "~/components/Search"

const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <Search />
      <Promos />
      <div className="grid">
        <Laundry />
      </div>
    </div>
  )
}

export default Home

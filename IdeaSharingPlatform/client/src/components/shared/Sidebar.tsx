import Community from "./Community"
import NavLinkCompnent from "./NavLinkCompnent"
import UpcomingEvents from "./UpcomingEvents"


const Sidebar = () => {
  return (
    <section className="w-56 bg-[#1e1f24] ">
        {/* Nalink */}
      <NavLinkCompnent/>
      <hr className="border-1 border-gray-500 "/>
      {/* Community */}
        <Community/>
        <hr className="border-1 border-gray-500 "/>
      {/* upcoming Events */}
      <UpcomingEvents/>
    </section>
  )
}

export default Sidebar

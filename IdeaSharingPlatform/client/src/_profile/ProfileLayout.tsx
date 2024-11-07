import { Outlet } from "react-router-dom"
import Sidebar from "../components/shared/Sidebar"
// import Topbar from "../components/shared/Topbar"



const ProfileLayout = () => {
  return (
  
    <section className="flex text-white ">
        {/* SideBAr */}
        <div className="h-screen  bg-[#1e1f24]">
            <Sidebar/>
        </div>

<div className="w-full">
          <Outlet/>
</div>
    </section>
    
  )
}

export default ProfileLayout

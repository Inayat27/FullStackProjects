import { Outlet } from "react-router-dom"
import Sidebar from "../components/shared/Sidebar"
import Topbar from "../components/shared/Topbar"



const RootLayout = () => {
  return (
  
    <section className="flex text-white ">
        {/* SideBAr */}
        <div className="h-screen  bg-[#1e1f24]">
            <Sidebar/>
        </div>

        {/* TopBar */}
        <div className=" w-full ">
        <div className="w-full bg-[#1e1f24]">
            {/* topbar */}
            <Topbar/>
        </div>
         <Outlet/>
        </div>
    </section>
    
  )
}

export default RootLayout

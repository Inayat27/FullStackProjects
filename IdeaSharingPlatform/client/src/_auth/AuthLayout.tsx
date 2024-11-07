import { Outlet } from "react-router-dom"


const authLayout = () => {
  return (
    <section className="grid grid-cols-2 ">
        <Outlet/>
        {/* Imge components */}
        <div>
            Hello Image COmponents
        </div>
      
    </section>
  )
}

export default authLayout

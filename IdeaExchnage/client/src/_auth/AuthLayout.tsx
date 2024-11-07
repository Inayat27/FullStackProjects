import { Outlet } from "react-router-dom"
import logo from '../assets/images/side-img.svg'


const AuthLayout = () => {
  return (
    <>
    <section className="flex flex-1 justify-center items-center flex-col py-10">
  
    {/* Content for the left half of the page */}
    <Outlet/>
    </section>
    {/* Content for the right half of the page */}
    <img src={logo} alt="auth" className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat" />

    </>
  
  )
}

export default AuthLayout

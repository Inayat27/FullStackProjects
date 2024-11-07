
import { Outlet } from 'react-router-dom'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/Shared/Footer'

const RootLayout = () => {
  return (
    <>
      <section className="w-full  ">
        <Navbar/>
        <Outlet/>
        <Footer/>
        </section>
    </>
  )
}

export default RootLayout

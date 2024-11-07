import { Input } from "../ui/input"
import notification from '../../assets/icons/Notifiy.svg'
import profile from '../../assets/icons/people.svg'
import { NavLink } from "react-router-dom"


const AnotherTop = () => {
 
  return (
    <section className=" w-full flex py-3 ">

        
      {/* search */}
      <div className=" ml-5"> 
      {/* <Label htmlFor="search"><img  className='bg-white h-10 pl rounded-2xl ' src={searchLogo} alt='search-logo'/></Label> */}
      <Input id='search' className='px-2 py-0 h-8 w-72 rounded-2xl outline-1 outline-slate-500 bg-black place-content-center' type='search' placeholder='search for people etc.'/>
      </div>
      {/* notificati */}
        <div className=" flex absolute items-center right-10 gap-5"> 
        {/* notification */}
         <img src={notification} alt='notification' />
       
       <NavLink  to='/profile'> <img src={profile}
        className='h-7' alt='notification' />
        </NavLink>

      </div> 
      {/* profile */}
    </section>
  )
}

export default AnotherTop

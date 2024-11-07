
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './_auth/AuthLayout'
import { Login, Signup } from './_auth/Forms'
import RootLayout from './_root/RootLayout'
import { Home ,About,Contact} from './_root/pages'
import { RecoilRoot } from 'recoil'
import Reservation from './_root/pages/Reservation'


function App() {

  return (
    <main className="flex h-screen ">
        <RecoilRoot>  
      <Routes>
        {/* public ROutes */}
        <Route key='auth' element={<AuthLayout  />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* private Routes */}
        <Route key='root' element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/reserve' element={<Reservation/>} />
        </Route>
      </Routes>
        </RecoilRoot>
      {/* <Toaster/> */}
    </main>
  )
}

export default App

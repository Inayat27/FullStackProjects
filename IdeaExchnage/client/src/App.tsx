import { Route, Routes } from "react-router-dom"
import AuthLayout from "./_auth/AuthLayout"
import {Signup,Signin} from './_auth/forms'
import RootLayout from "./_root/RootLayout"
import { Home, Saved, Contribute, About } from "./_root";
import Profile from "./_root/Profile";





function App() {
 

  return (
  
    <main className="flex h-screen bg-black flex-1">
      <Routes>
      {/* public route */}
      <Route  element={<AuthLayout />}>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
      </Route>

{/* private route */}
    <Route element={<RootLayout/>}>
    <Route index element={<Home/>}/>
    <Route path="/contribute" element={<Contribute/>}/>
    <Route path="/saved" element={<Saved/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/profile" element={<Profile/>}/>

    </Route>


      </Routes>
    
    </main>
      
    
  )
}

export default App

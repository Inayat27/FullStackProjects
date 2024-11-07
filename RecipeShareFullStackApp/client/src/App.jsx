
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
function App() {
 

  return (
    <>
     <Navbar/>
     <Routes>
     <Route path="/login" element={<Login/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route path="/" element={<Home/>}/>
     </Routes>
    </>
  )
}

export default App


import { Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Books from './Pages/Books'
import {Toaster} from 'react-hot-toast'
import About from './Pages/About'

import axios from 'axios'
import { UserContext } from '../store/Context'
import { useState ,useEffect} from 'react'
import AddBook from './Pages/AddBook'



axios.defaults.withCredentials = true;

function App() {
  
  const [SignInUser,setSignInUser] = useState(true);
  const [LoggedInUser,setLoggedInUser] = useState('');

  return (
    <UserContext.Provider value={{SignInUser,setSignInUser,LoggedInUser,setLoggedInUser}}>

      <Navbar/>
      <Toaster position="bottom-right" toastOptions={{duration:2000}} />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/books" element={<Books/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/addbook" element={<AddBook/>}/>
      </Routes>
    
  
    </UserContext.Provider>
  )
}

export default App

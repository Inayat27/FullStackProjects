import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./PAges/Home"
import Register from "./PAges/Register"
import Login from "./PAges/Login"
import './App.css'
import {Toaster} from 'react-hot-toast'
import { UserContextProvider } from "../context/userContxt"
import axios from 'axios'
import Dashboard from "./PAges/Dashboard"

axios.defaults.baseURL ='http://localhost:3000';
axios.defaults.withCredentials = true
function App() {


  return (
    <UserContextProvider>
    <Navbar/>
    <Toaster position="bottom-right" toastOptions={{duration:2000}} />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </UserContextProvider>
  )
}

export default App

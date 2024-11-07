import { Route, Routes } from 'react-router-dom'
import './App.css'
// import Home from './pages/Home'
// import SignIn from './pages/SignIn'
// import SignUp from './pages/SignUp'
// import Profile from './pages/Profile'
// import About from './pages/About'
import Navbar from './components/Navbar'
import React from 'react'
import { RecoilRoot } from 'recoil'

const Home = React.lazy(() =>import('./pages/Home'))
const SignUp = React.lazy(() =>import('./pages/SignUp'))
const SignIn = React.lazy(() =>import('./pages/SignIn'))
const About = React.lazy(() =>import('./pages/About'))
const Profile = React.lazy(() =>import('./pages/Profile'))
// const Navbar = React.lazy(() => import('./components/Navbar'))
function App() {


  return (
    
    <React.Suspense fallback={<>Loading..</>}>

    <RecoilRoot>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/about' element={<About/>}/>
    
    </Routes>
    </RecoilRoot>
    </React.Suspense>
  )
}

export default App

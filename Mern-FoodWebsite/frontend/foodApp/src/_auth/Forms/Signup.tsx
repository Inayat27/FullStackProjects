import { ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { authState } from '../../store/atom/auth'
import { useState } from 'react'
import axios from 'axios'



type signupCredentials = {
  name:string,
  email:string,
  password:string
}


const Signup = () => {

  const navigate = useNavigate()
  const [signupState,setSignupState ]= useRecoilState(authState)

const [signupData, setsignupData] = useState<signupCredentials>({
  name:'',
  email:'',
  password:''
})
  return (
    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 h-full w-full">
    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
      <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Signup</h2>
      <p className="mt-2 text-sm text-gray-600">
      Already have an account?{' '}
        <Link to="/login" title="" className="font-semibold inline-block text-black transition-all duration-200 hover:underline">
          Login
        </Link>
      </p>
      <form action="#" id='signup' className="mt-8">
        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="text-base font-medium text-gray-900">
              FullName
            </label>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                id='name'
                value={signupData.name}
                onChange={(e) => {
                  setsignupData({...signupData,name:e.target.value})
                }}
                placeholder="Fullname"
              ></input>
            </div>
          </div>
          <div>
            <label htmlFor="email" className="text-base font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                id='email'
                value={signupData.email}
                onChange={(e) => {
                  setsignupData({...signupData,email:e.target.value})
                }}
                placeholder="Email"
              ></input>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-base font-medium text-gray-900">
                Password
              </label>
              <a href="#" title="" className="text-sm font-semibold text-black hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="password"
                id='password'
                value={signupData.password}
                onChange={(e) => {
                  setsignupData({...signupData,password:e.target.value})
                }}
                placeholder="Password"
              ></input>
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={() =>
                {
                  axios.post('http://localhost:3000/api/v1/auth/signup',{
                    "name":signupData.name,
                      "email":signupData.email,
                      "password":signupData.password
                    
                  })
                  .then(() =>{

                    const bool = true
                    localStorage.setItem('signup',bool.toString())
                    localStorage.setItem('issignup',bool.toString())
                    const storedValue = localStorage.getItem('signup');
                    const storedValue2 = localStorage.getItem('issignup');
                      setSignupState({...signupState,signup:(storedValue === 'true'),issignUp:(storedValue2 === 'true') })
                      
                      navigate('/')
                      
                  })
                  
                  
                }}
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            >
             <h1 className='pb-1'>Signup </h1><ArrowRight className="ml-2" size={16} />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  )
}

// enum boolConstant{
//   True=1,
//   False=0
// }
export default Signup

import { ArrowRight} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { authState } from '../../store/atom/auth'
import axios from 'axios'
import { useState } from 'react'


type loginCredentials = {
    email:string ,
    password:string
  }


const Login = () => {
  const [loginState ,setLoginState] = useRecoilState(authState);
  const [loginData,setLoginData] = useState<loginCredentials>({
    email:'',
    password:''
  })
  const navigate = useNavigate()
  return (
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 h-full">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" title="" className="font-semibold text-black transition-all duration-200 hover:underline">
              Create a free account
            </Link>
          </p>
          <form action="#" id='login' className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => {
                      setLoginData({...loginData ,email:e.target.value})
                    }}
                    id='email'
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
                    value={loginData.password}
                    onChange={(e) => {
                      setLoginData({...loginData ,password:e.target.value})
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
                      axios.post('http://localhost:3000/api/v1/auth/login',{
                          "email":loginData.email,
                          "password":loginData.password
                        
                      })
                      .then((r) =>{
                
                          const bool= true;
                          localStorage.setItem('token',r.data.token)
                          localStorage.setItem('userId',r.data.userId)
                          localStorage.setItem('login',bool.toString())
                          setLoginState({...loginState,login:localStorage.getItem('login') === 'true'})
                          
                          navigate('/')
                          
                      })
                      
                      
                    }}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  <h1 className='pb-1'>Login </h1> <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  
)}
export default Login

import axios from "axios";
import { useState } from "react";

import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
    const [Data, setData] = useState({
        email: "",
        password: "",
      });

    const loginUser = async (e) =>
    {

        e.preventDefault()

        const {email,password}= Data
        try {
          const {data} = await axios.post('/login',{
            email,
            password
          })

          if (data.error) {
            toast.error(data.error)
          }
          else{
            setData({})
            toast.success('Welcome !!')
            navigate('/dashboard')
            
          }
        } catch (error) {
          console.log(error);
        }
        
    }
  return (
    <div>
      <form onSubmit={loginUser}>
      <label>Email</label>
        <input
          type="email"
          placeholder="enter Email.."
          value={Data.email}
          onChange={(e) => setData({ ...Data, email: e.target.value })}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="enter password.."
          value={Data.password}
          onChange={(e) => setData({ ...Data, password: e.target.value })}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Login

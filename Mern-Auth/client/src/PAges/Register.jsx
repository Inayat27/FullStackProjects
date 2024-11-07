import axios from "axios";
import { useState } from "react";

import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";



function Register() {
  const navigate = useNavigate()
  const [Data, setData] = useState({
    name:"",
    email:"",
    password:"",
  });

  const registerUser =  async (e) => {
    e.preventDefault();
    const {name,email,password} = Data;
    try {
      const {data} = await axios.post('/register',{
        name,email,password
      })

      if (data.error) {
        console.log(data.error);
        toast.error(data.error)
      }
      else{
        setData({})
        toast.success('Login SuccessFull ! Welcome ')
        navigate('/login')
      }
    } catch (error) {
      console.log();
    }
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input
          type="text"
          placeholder="enter Name.."
          value={Data.name}
          onChange={(e) => setData({ ...Data, name: e.target.value })}
        />
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;

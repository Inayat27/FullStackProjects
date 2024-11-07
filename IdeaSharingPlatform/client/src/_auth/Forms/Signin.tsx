import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Backend_url } from "../../config";
import axios from "axios";
import {useRecoilState } from "recoil";
import {userLoginState} from  "../../store"

type authInput = {
  email: string;
  username: string;
  password: string;
};




const Signin = () => {
  const navigate = useNavigate();

  const [userPayload, setuserPayload] = useState<authInput>({
    email: "",
    username: "",
    password: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useRecoilState(userLoginState);
  return (
    // <!-- component -->
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8  h-screen flex flex-col items-center justify-center ">
      <h1 className="text-3xl font-semibold p-2">SignIn Form</h1>
      <h1 className="p-2">
        Don't have an account?{" "}
        <Link to="/" className="text-slate-400 underline">
          SignUp
        </Link>
      </h1>
      <div className="mb-4 w-5/6">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="email"
          type="text"
          onChange={(e) => {
            setuserPayload((c) => ({ ...c, email: e.target.value }));
          }}
          placeholder="Username"
        />
      </div>
      <div className="mb-6 w-5/6">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          id="password"
          type="password"
          onChange={(e) => {
            setuserPayload((c) => ({ ...c, password: e.target.value }));
          }}
          placeholder="******************"
        />
        <div className="flex justify-between">
          <p className="text-red text-xs italic">Please choose a password.</p>
          <Link
            to=""
            className="font-extralight text-xs text-blue hover:text-blue-darker"
          >
            forgot Password?
          </Link>
        </div>
      </div>

      <button
        className="bg-blue hover:bg-blue-dark text-white hover:bg-slate-600 bg-slate-400 font-bold py-2 px-4 rounded"
        type="button"
        onClick={async () => {
          const rep = await axios.post(`${Backend_url}/user/signin`, {
            email: userPayload.email,
            password: userPayload.password,
          });
if(isAuthenticated === false)
  {
    
    if (rep.data.msg !== "Invalid Input") {
      navigate("/home");
      setIsAuthenticated(true);
      localStorage.setItem("token",rep.data)
    }
  }
        }}
      >
        Sign In
      </button>
    </div>
  );
};

export default Signin;

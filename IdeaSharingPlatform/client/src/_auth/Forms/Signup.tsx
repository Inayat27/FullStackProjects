import { Link, useNavigate } from "react-router-dom";
import { Backend_url } from "../../config";
import { useState } from "react";
import axios from "axios";

//type of useState should be import from validation doing in the backend
type authInput = {
  email: string;
  username: string;
  password: string;
};

const Signup = () => {
  const navigate = useNavigate();

  const [userPayload, setuserPayload] = useState<authInput>({
    email: "",
    username: "",
    password: "",
  });
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8  h-screen flex flex-col items-center justify-center ">
      <h1 className="text-3xl font-semibold p-2">SignUp Form</h1>

      <h1 className="p-2">
        Already have an Account?{" "}
        <Link to="/signin" className="text-slate-400 underline">
          SignIn
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
          type="email"
          placeholder="Enter your Email"
          onChange={(e) => {
            setuserPayload((c) => ({ ...c, email: e.target.value }));
          }}
          required
        />
      </div>
      <div className="mb-4 w-5/6">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="username"
          type="text"
          onChange={(e) => {
            setuserPayload((c) => ({ ...c, username: e.target.value }));
          }}
          placeholder="Username"
          required
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
        type="submit"
        onClick={async () => {
          const rep = await axios.post(`${Backend_url}/user/signup`, {
            email: userPayload.email,
            name: userPayload.username,
            password: userPayload.password,
          });

          if (rep.data.msg !== "Invalid Input") {
            navigate("/signin");
          }
        }}
      >
        SignUp
      </button>
    </div>
  );
};

export default Signup;

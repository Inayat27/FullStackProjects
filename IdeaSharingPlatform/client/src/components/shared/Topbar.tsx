import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Backend_url } from "../../config";
import { useRecoilState } from "recoil";
import { userAuthState } from "../../store";
import {DropdownMenu} from "../shared";
import { home,chat,notify,profile } from "../../utils/constant";


function Topbar() {
  const [userInfo, setuserInfo] = useRecoilState<{
    email: string;
    name: string;
  }>(userAuthState);

  useEffect(() => {
    axios
      .get(`${Backend_url}/user/user-info`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((r) => {
        setuserInfo({ email: r.data.email, name: r.data.name });
      });
  }, []);



  
  return (
    <nav className="flex justify-between  text-sm xl:text-md py-2 h-14">
      <div className="flex gap-x-14 items-center px-1 ">
        {/* PAgeName */}
        <div className="flex gap-2">
          <img src={home} alt="home" height={20} width={20} /> Home
        </div>
        {/* Link */}
        <div className="">
          <ul className="flex gap-3 text-xs bg-gray-600 py-2 px-1">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) => isActive ? "bg-gray-300 p-1 text-gray-900" : ""}
              >
                {" "}
                Explore
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contribute"
                className={({ isActive }) => isActive ? "bg-gray-300 p-1 text-gray-900" : ""}
              >
                {" "}
                Community feed
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/frieds"
                className={({ isActive }) => isActive ? "bg-gray-300 p-1 text-gray-900" : " px-2"}
              >
                Mutual friends (12)
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* notification */}
      <div className="px-4">
        <ul className="flex items-center gap-5">
          <li>
            <Link to="">
              <img src={chat} alt="chat-logo" />
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={notify} alt="notify-logo" />
            </Link>
          </li>
          <li>
            <div className="flex  justify-center items-center gap-2">
              <h1>{userInfo.name == "" ? "User xyz" : userInfo.name}</h1>
              <div>
                <img src={profile} />
                <span className="flex justify-center items-center fixed right-3 top-8  ">
                  {/* <img src={down} alt="chevron-down" /> */}
                  <DropdownMenu />
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Topbar;

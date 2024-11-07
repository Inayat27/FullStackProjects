import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import home from "../../assets/icons/home.svg";
import people from "../../assets/icons/people.svg";
import SearchInput from "./SearchInput";

const NavLinkCompnent = () => {
  return (
    <div className="m-2 flex flex-col justify-start ">
      {/* lgog */}
      <div className="py-4">
        <Link to="/home">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      {/* search */}
      {/* <input
        type="search"
        placeholder="explore snapgram..."
        className=" placeholder:text-sm focus:text-sm text-black outline-none  focus-within:p-1 rounded-lg placeholder:p-2"
      /> */}

<SearchInput/>

      {/* navliks */}
      <div className="my-2">
        <ul className="text-sm ">
          <li className="flex items-center gap-3 py-2 px-2">
            <img src={home} alt="home" />
            <NavLink to="/home"> Home</NavLink>
          </li>
          <li className="flex items-center gap-3 py-2 px-2">
            <img src={people} alt="home" />
            <NavLink to="/contribute"> Community</NavLink>
          </li>
          <li className="flex  items-center gap-3 py-2 px-2">
            <img src={home} alt="home" />
            <NavLink to="/"> Home</NavLink>
          </li>
          <li className="flex items-center gap-3 py-2 px-2">
            <img src={home} alt="home" />
            <NavLink to="/"> Home</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavLinkCompnent;

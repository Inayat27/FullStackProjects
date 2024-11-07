import  { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { profileState, userAuthState, userLoginState } from "../../store";

const DropdownMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(userLoginState);
  const [userInfo, setUserInfo] = useRecoilState(userAuthState);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isOpen , setIsOpen] = useRecoilState(profileState);

  const handleOnClickOnCross = () =>
      {
          setIsOpen(!isOpen);
      }



  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserInfo({
      email: "",
      name: "",
    });
    setIsLoggingOut(true); // Set the flag to true to trigger useEffect
  };

  useEffect(() => {
    if (isLoggingOut) {
      navigate("/signin");
      setIsLoggingOut(false); // Reset the flag after navigation
    }
  }, [isLoggingOut, navigate]);

  return (
    <div>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="text-black absolute right-0 bg-[#ebe4e4] hover:bg-[#ebe4e4] focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-xs p-1 text-center inline-flex items-center dark:bg-[#ebe4e4] dark:hover:bg-gray-100 dark:focus:ring-black"
        type="button"
      >
        <svg
          className="w-1.5 h-1.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdown"
        className={`z-10 ${
          isDropdownOpen ? "block" : "hidden"
        } my-6 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <p
             
              onClick={handleOnClickOnCross}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            >
              Profile
            </p>
          </li>

          <li>
            <p
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              onClick={handleLogout}
            >
              {(isAuthenticated && userInfo.name !== '') ? (
                <span>Log out</span>
              ) : (
                <Link to="/signin">Sign In</Link>
              )}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;

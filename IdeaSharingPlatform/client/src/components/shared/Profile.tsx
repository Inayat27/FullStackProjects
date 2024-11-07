import { useNavigate } from "react-router-dom";
import { profileState } from "../../store";
import {
  camera,
  cross,
  followers,
  github,
  link_chain,
  message,
  twitter,
} from "../../utils/constant";
import { useRecoilState } from "recoil";
import EditProfileForm from "../ui/EditProfileForm";

const Profile = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useRecoilState(profileState);

  const handleOnClickOnCross = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <div
      className={`fixed top-[56px] bg-[#ffffffc1] flex justify-end right-0 w-full h-[calc(100vh-56px)] transform transition-transform duration-1000 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <img
        src={cross}
        alt="close"
        className="h-6 w-6  hover:cursor-pointer "
        onClick={handleOnClickOnCross}
      />
      <div
        className="  w-2/3  dark:text-white  flex-col bg-black
     "
      >
        <div
          className="relative rounded-sm py-4  bg-black w-full flex justify-center 
        "
        >
          <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center">
            <input type="file" hidden />
            <button>
              <img src={camera} alt="upload" />
            </button>
          </div>
        </div>
        <div className="bg-gray-800 px-4 py-2 rounded-lg w-full text-white relative h-2/7">
          <div className="flex justify-between items-center">
            <div className="relative">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <button>
                  <img src={camera} alt="upload" />
                </button>
              </div>
              <div className="w-4 h-4 bg-gray-700 rounded-full flex items-center justify-center absolute bottom-0 right-0 transform translate-x-0 translate-y-0">
                <svg
                  className="w-3 h-3 text-gray-200 hover:cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </div>
            <button className="bg-purple-500 text-sm px-3 py-1 rounded-full"
            onClick={() =>
              {
                navigate('/Edit-profile')
              }
            }
            >
              Edit Profile
            </button>
          </div>
          <div className="mt-1">
            <h2 className="text-base font-bold">NeoNova</h2>
            <p className="mt-1 text-sm text-gray-400">Add profession</p>
            <p className="mt-1 text-xs text-gray-400">Add your bio</p>
          </div>
          <div className="flex mt-4 space-x-2">
            <button className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <img src={twitter} alt="twitter" />
            </button>
            <button className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <img src={github} alt="github" />
            </button>
            <button className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
              {/* <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg> */}
              <img src={link_chain} alt="github" />
            </button>
          </div>
          <div className="flex gap-4 mt-2">
            <button className="px-4 my-1 bg-pink-100 text-black rounded-md">
              <div className="flex gap-2 p-1 text-sm">
                <img src={followers} alt="img" />
                Followers
              </div>
            </button>
            <button className="px-4 my-1 bg-pink-100 text-black rounded-md">
              <div className="flex gap-2 p-1 text-sm">
                <img src={message} alt="img" />
                Messages
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile */}
      {/* <EditProfileForm/>
       */}

    </div>
</>
  );
};

export default Profile;

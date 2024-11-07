import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MessageView = () => {
  const user = useParams();
  const id = user.id;
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user details from the backend server
    fetch(`http://localhost:3000/api/v1/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((err) => setError(err.message));
  }, [id]);

  return (
    <div className="flex flex-col h-full">
      <div className="h-[60px] flex items-center gap-1 px-1 border border-gray-200 sticky top-0 bg-white">
        <div className="h-24 flex items-center px-2">
          <img
            alt="pic"
            src={userData.profile_image_url}
            className="border h-10 w-10 rounded-3xl"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1">
            {id?.slice(0, 4) === "user" ? (
              <h1 className="font-bold text-sm">
                {userData.first_name} {userData.last_name}
              </h1>
            ) : (
              <h1 className="font-bold text-sm">{userData.GroupDetails?.GroupName}</h1>
             )} 
            <span className="text-gray-400">
              <svg
                width="8px"
                height="8px"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path fill="#1d9a4d" d="M8 3a5 5 0 100 10A5 5 0 008 3z" />
              </svg>
            </span>
          </div>
          <div>
            <h1 className="text-xs text-gray-400">Typing...</h1>
          </div>
        </div>
      </div>

      {/* Middle content */}
      <div className="flex-grow ">Hello</div>

      {/* Bottom div */}
      <div className="h-16  justify-end sticky bottom-0 border border-gray-200">
        <form className="relative top-2 p-2">
          <div className="relative">
            <input
              type="text"
              id="default-search"
              className="block w-full ps-2 text-sm py-2  focus:outline-none focus:ring-0  focus:border-gray-400 font-semibold text-white border border-gray-300 rounded-lg bg-gray-50  dark:bg-gray-100 dark:placeholder-gray-400 dark:text-black placeholder:absolute placeholder:left-2"
              placeholder="Type Your Message here"
            />
            <div className="absolute inset-y-0 right-0 flex items-center gap-2 p-2 ">
              <button
                type="submit"
                className="hover:bg-[#fde7d7]  focus:ring-4 focus:outline-none  font-medium rounded-xl text-sm px-2 py-2 "
              >
                <img src="../../attachment.svg" alt="Attach" />
              </button>
              <button
                type="submit"
                className="hover:bg-[#fde7d7]  focus:ring-4 focus:outline-none font-medium rounded-xl text-sm px-2 py-2 "
              >
                <img src="../../send.svg" alt="send" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageView;

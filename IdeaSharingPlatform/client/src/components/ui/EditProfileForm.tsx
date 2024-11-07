
// import Signup from "../../_auth/Forms/Signup";
import { Link } from "react-router-dom";
type EditInput = {
    email: string;
    username: string;
    password: string;
  };

const EditProfileForm = () => {

    // const [userPayload, setuserPayload] = useState<authInput>({
    //     email: "",
    //     username: "",
    //     password: "",
    //   });
    return (
   <div
    >
     {/* Edit Profile */}
     <form className="flex flex-col gap-4  bg-white  text-black  py-10 items-center ">
      <div className="flex gap-2 ">
        <label
          className="block text-grey-400 text-sm font-bold mb-2 my-auto"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full p-1 text-grey-400"
          id="username"
          type="text"
        //   onChange={(e) => {
        //     setuserPayload((c) => ({ ...c, username: e.target.value }));
        //   }}
          placeholder="Username"
          required
        />
      </div>
      <div className="flex gap-2">
        <label
          className="block text-grey-400 text-sm font-bold mb-2 my-auto"
          htmlFor="profession"
        >
          Add Profession
        </label>
        <input
          className="shadow appearance-none border rounded w-full p-1 text-grey-400"
          id="profession"
          type="text"
        //   onChange={(e) => {
        //     setuserPayload((c) => ({ ...c, username: e.target.value }));
        //   }}
          placeholder="Add Profession"
          required
        />
      </div>
      <div className="flex gap-2">
        <label
          className="block text-grey-400 text-sm font-bold mb-2 my-auto"
          htmlFor="bio"
        >
          Add Bio
        </label>
        <input
          className="shadow appearance-none border rounded w-full p-1 text-grey-400"
          id="bio"
          type="text"
        //   onChange={(e) => {
        //     setuserPayload((c) => ({ ...c, username: e.target.value }));
        //   }}
          placeholder="Add Bio"
          required
        />
      </div>

      <div className="flex gap-2">
        <label
          className="block text-grey-400 text-sm font-bold mb-2 my-auto"
          htmlFor="Links"
        >
          github Links
        </label>
        <input
          className="shadow appearance-none border rounded w-full p-1 text-grey-400"
          id="Links"
          type="text"
        //   onChange={(e) => {
        //     setuserPayload((c) => ({ ...c, username: e.target.value }));
        //   }}
          placeholder="Add Links"
          required
        />
      </div>
      <div className="flex gap-2">
        <label
          className="block text-grey-400 text-sm font-bold mb-2 my-auto"
          htmlFor="xLinks"
        >
          X Links
        </label>
        <input
          className="shadow appearance-none border rounded w-full p-1 text-grey-400"
          id="xLinks"
          type="text"
        //   onChange={(e) => {
        //     setuserPayload((c) => ({ ...c, username: e.target.value }));
        //   }}
          placeholder="Add Links"
          required
        />
      </div>

      <button
        className="bg-blue hover:bg-blue-dark text-white hover:bg-slate-300 w-32 hover:text-black bg-slate-600 font-bold py-2 px-4 rounded"
        type="submit"
        // onClick={async () => {
        //   const rep = await axios.post(`${Backend_url}/user/signup`, {
        //     email: userPayload.email,
        //     name: userPayload.username,
        //     password: userPayload.password,
        //   });

        //   if (rep.data.msg !== "Invalid Input") {
        //     navigate("/signin");
        //   }
        // }}
      >
        Submit
      </button>
     
     </form >
     
    </div >
  )
}

export default EditProfileForm

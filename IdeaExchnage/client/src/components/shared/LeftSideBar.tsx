
import { Link } from 'react-router-dom';
import logout from "../../assets/icons/logout.svg"
import home from '../../assets/icons/home.svg'
import share from '../../assets/icons/share.svg'
import save from '../../assets/icons/save.svg'
import about from '../../assets/icons/people.svg'


const LeftSideBar = () => {
  return (
    <div className=" text-white flex flex-col">
      <div className="flex mt-5">
        <ul >
          <li className="py-3 ">
            <Link className='flex gap-2 items-center' to="/"><img src={home} /> <p>Home</p></Link>
          </li>
          <li className="py-3">
            <Link  className='flex gap-2 items-center' to="/contribute"> <img src={share} />Contribute</Link>
          </li>
          <li className="py-3">
            <Link className='flex gap-2 items-center'  to="/saved"><img src={save} />Saved</Link>
          </li>
          <li className="py-3">
            <Link  className='flex gap-2 items-center' to="/about"><img src={about} />About us</Link>
          </li>
        </ul>
      </div>

      <div className="absolute bottom-5 hover:cursor-pointer">
        <p> <img className="inline-flex  justify-center " src={logout} /> Logout</p>
      </div>
    </div>
  );
};

export default LeftSideBar;

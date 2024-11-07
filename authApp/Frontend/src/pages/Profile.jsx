import { useRecoilValue } from "recoil"
import { userData } from "../store/atoms/userAtom"


function Profile() {
const currentUser = useRecoilValue(userData)
  

  return (
    <div>
    {/* <h1>Welcome hero {currentUser}</h1> */}
    </div>
  )
}

export default Profile

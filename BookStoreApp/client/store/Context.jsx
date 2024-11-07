import { createContext} from "react";
// import axios from 'axios'


export const UserContext = createContext({});


// export default function UserContextProvider({child}){
//     const [user,setUser] = useState(null);

//     useEffect(() =>{
//         if (!user) {
//             axios.get("http://localhost:3000/user/profile").then((r) => {
//             //   setUser(data);
//             console.log(r);
//             });
//           }
//     },[])

//     return (

//         <UserContext.Provider value={{user,setUser}}>
//             {child}
//         </UserContext.Provider>
//     )
// }
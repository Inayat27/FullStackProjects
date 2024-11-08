import { getCurrentUser } from "@/lib/appwrite/api";
import { IContextType, IUser } from "@/types";

import { useContext, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export const INITIAL_USER =
{
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: ''

};


export const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => { },
    setIsAuthenticated: () => { },
    checkAuthUser: async () => false as boolean,
}


const AuthContext = createContext<IContextType>(INITIAL_STATE);


const AuthProvider = ({childeren}: { childeren: React.ReactNode }) => {

    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setLoading] = useState(false);


    const checkAuthUser = async () => {

        try {
            const currentAccount = await getCurrentUser();
            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio
                })
                setIsAuthenticated(true)
                return true;
            }



            return false;


        } catch (error) {
            console.log(error);
            return false;

        }
        finally {
            setLoading(false)
        }
    }
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('cookieFallback') === '[] ' || localStorage.getItem('cookieFallback') === null) {
            navigate('/')
            checkAuthUser()
        }

    }, [])

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }

    return (
        <AuthContext.Provider value={value} >
            {childeren}
        </AuthContext.Provider>
    )

}



export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
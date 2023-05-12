import {createContext, useState} from "react";
import requestServer from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [userValues, setUserValues] = useState();
    
    const login = async (inputs) => {
        const res = await requestServer.post("http://localhost:8800/api/auth/login", inputs, {
            withCredentials: true
        });

        setUserValues(res.data);
    }

    const logout = () => {
        console.log("attempting logout")
        setUserValues(undefined)
        requestServer.post("http://localhost:8800/api/auth/logout")
    }

    const getUser = async () => {
        try{
            const res = await requestServer.post("http://localhost:8800/api/auth/userInfo")
        
            const user = {
                "userId" : res.data.userId,
                "username" : res.data.username,
                "verified" : res.data.verified,
                "isAdmin" : res.data.isAdmin
            }
            setUserValues(user);

        }catch{
            console.log("user not found")
        }
    }

    return(
        <AuthContext.Provider value={{userValues, getUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};
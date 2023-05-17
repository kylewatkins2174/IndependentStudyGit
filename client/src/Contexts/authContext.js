import {createContext, useState} from "react";
import requestServer from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [userValues, setUserValues] = useState();
    const [sudo, setSudo] = useState(false);
    
    const login = async (inputs) => {
        const res = await requestServer.post("http://localhost:8800/api/auth/login", inputs, {
            withCredentials: true
        });

        getUser()
    }

    const logout = async () => {
        console.log("attempting logout")
        setUserValues(undefined)
        requestServer.post("http://localhost:8800/api/auth/logout")
    }

    const getUser = async () => {
        try{
            const res = await requestServer.post("http://localhost:8800/api/auth/userInfo")
        
            const user = {
                "userId" : res.data.userId,
                "firstname" : res.data.firstname,
                "lastname" : res.data.lastname,
                "username" : res.data.username,
            }
            setUserValues(user);

            if(user.userId === 1){
                setSudo(true)
            }

            console.log(JSON.stringify(user))

        }catch{
            console.log("user not found")
        }
    }

    return(
        <AuthContext.Provider value={{userValues, sudo, getUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};
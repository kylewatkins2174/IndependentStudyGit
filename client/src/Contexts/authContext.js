import {createContext, useState, useEffect} from "react";
import requestServer from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [userValues, setUserValues] = useState();    

    const login = async (inputs) => {
        const res = await requestServer.post("http://localhost:8800/api/auth/login", inputs, {
            withCredentials: true
        });

        console.log(res.data)

        setUserValues(res.data);
    }

    const getUser = async() => {
        try{
            const res = await requestServer.post("http://localhost:8800/api/auth/userInfo")
            
            const user = {
                "userId" : res.data.userId,
                "username" : res.data.username,
                "departmentId" : res.data.departmentId
            }
            setUserValues(user);
        }catch(error){
            console.log(error)
        }
    }

    return(
        <AuthContext.Provider value={{userValues, getUser, login}}>
            {children}
        </AuthContext.Provider>
    )
};
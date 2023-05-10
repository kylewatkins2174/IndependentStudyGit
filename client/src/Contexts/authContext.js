import {createContext, useState, useEffect} from "react";
import requestServer from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [userValues, setUserValues] = useState();   
    const [verifiedDepartments, setVerifiedDepartments] = useState([])
    
    

    const login = async (inputs) => {
        const res = await requestServer.post("http://localhost:8800/api/auth/login", inputs, {
            withCredentials: true
        });

        setUserValues(res.data);
    }

    const getUser = async function(){
        try{
            const res = await requestServer.post("http://localhost:8800/api/auth/userInfo")
            
            const user = {
                "userId" : res.data.userId,
                "username" : res.data.username,
                "verified" : res.data.verified,
                "isAdmin" : res.data.isAdmin
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
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

        console.log(res.data)

        setUserValues(res.data);
    }

    const getUser = async() => {
        try{
            const res = await requestServer.post("http://localhost:8800/api/auth/userInfo")
            
            const user = {
                "userId" : res.data.userId,
                "username" : res.data.username,
                "verified" : res.data.verified,
                "isAdmin" : res.data.isAdmin
            }
            setUserValues(user);

            const res2 = await requestServer.post("http://localhost:8800/api/auth/verifiedDepartments", {"userId" : userValues.userId})

            setVerifiedDepartments(res2.data)

            console.log(verifiedDepartments)

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
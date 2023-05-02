import {createContext, useState} from "react";
import requestServer from "../axios";
import axios from "axios"

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [userValues, setUserValues] = useState({
        userId: 1,
        userName: 'JonathanWatkinsAdmin',
        authorized: true,
        isAdmin: true,
        depId: 1
        });

    const updateUser = (username) => {
        const userInfo = requestServer.post('/auth/userInfo', {username})
        console.log(userInfo.data);

        const user = {}
        setUserValues(user);
        console.log(user);
    }

    return(
        <AuthContext.Provider value={{userValues, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}
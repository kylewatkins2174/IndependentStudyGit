import {createContext, useState} from "react";
import requestServer from "../axios";

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
        const userInfo = requestServer.post('/auth/userInfo', {username : username})

        const user = {
            userId : userInfo.userId,
            username: userInfo.username,
            authorized : userInfo.isVerified,
            isAdmin: userInfo.isAdmin
        }
        setUserValues(user);
    }

    return(
        <AuthContext.Provider value={{userValues, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}
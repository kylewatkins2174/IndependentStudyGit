import {createContext, useState} from "react";
import requestServer from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [userValues, setUserValues] = useState({
        userId: 1,
        username: 'JonathanWatkinsAdmin',
        authorized: true,
        isAdmin: true,
        depId: 1
        });

    const updateUser = (username) => {
        console.log("getting info...")
        requestServer.post('/auth/userInfo', {"username" : username}).then((res) => {
            const user = {
                userId : res.data.userId,
                username: res.data.username,
                authorized : res.data.isVerified,
                isAdmin: res.data.isAdmin
            }
            console.log("username is " + res.firstname);
            console.log(res);

            setUserValues(user);
        })
    }

    return(
        <AuthContext.Provider value={{userValues, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}
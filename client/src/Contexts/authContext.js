import {createContext, useState} from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [userValues, setUserValues] = useState({
        userName: 'JonathanWatkinsAdmin',
        authorized: true,
        isAdmin: true,
        depId: 1,
    });

    const updateUser = ({user}) => {
        setUserValues(user);
    }

    return(
        <AuthContext.Provider value={{userValues, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}
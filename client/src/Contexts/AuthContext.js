import {createContext, useState} from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [userName, setUserName] = useState("RodneyReedRocks123");

    const updateUser = (name) => {
        setUserName(name);
    }

    const [authorized, setAuthorized] = useState(false);

    const updateAuthorization = (auth) => {
        setAuthorized(auth);
    }

    return(
        <AuthContext.Provider value={{userName, updateUser, authorized, updateAuthorization}}>
            {children}
        </AuthContext.Provider>
    )
}
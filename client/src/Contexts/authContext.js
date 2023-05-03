import {createContext, useState, useEffect} from "react";
import requestServer from "../axios";
import axios from "axios"

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [userValues, setUserValues] = useState(
        JSON.parse(localStorage.getItem("user")) || null
        );

        const login = async (inputs) => {
            const res = await requestServer.post("http://localhost:8800/api/auth/login", inputs, {
                withCredentials: true
            });

        setUserValues(res.data);

        console.log(userValues);
    }


    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(userValues))
    }, [userValues]);

    return(
        <AuthContext.Provider value={{userValues, login }}>
            {children}
        </AuthContext.Provider>
    )

};
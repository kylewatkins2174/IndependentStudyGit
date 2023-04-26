import {createContext, useState} from "react";

export const AuthContext = createContext();                 // A new Context is created, labeled AuthContext. This context is meant
                                                            // to hold the user values, such as their username, authorization status,
export const AuthContextProvider = ({children}) => {        // admin status, and department.
                                                            //
    const [userValues, setUserValues] = useState({          // The Context state object variable, userValues, is declared here. It can
        userName: 'RodneyReedrocks123',                     // be used on any page, using the syntax "userValues.userName". 
        authorized: true,                                   //
        isAdmin: true,                                      //
        depId: 1,                                           //
    });                                                     //
                                                            //
    const updateUser = ({user}) => {                        // updateUser() is a function used to set the context variable to a new user.
        setUserValues(user);                                // It takes in the user values from the login, and then uses setUserValues()
    }                                                       // to update it.
                                                            //
                                                            //
    return(                                                 // This is the AuthContextProvider to be wrapped around the App in index.js
                                                            // so that every page will hold the variables necessary. The "value" declares
                                                            // what is shared for other components to access.
        <AuthContext.Provider value={{userValues, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}
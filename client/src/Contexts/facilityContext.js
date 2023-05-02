import { createContext, useState } from "react";

export const FacilityContext = createContext();         // Creates a new context to store all the information about a facility.
                                                        //
export const FacilityContextProvider = ({children}) => {// Creates another ContextProvider to wrap around the App (denoted by {children})
                                                        //
    const [fId, setFId] = useState("");                 //
                                                        //
    const updateFId = (fac) => {                        // A function to update the facility. Takes in the prop "fac" and then
        setFId(fac);                                    // sets the state of the facility variable to the new facility sent in 
    }                                                   // with "fac"
                                                        //
    return(                                             // Generate the ContextProvider to be exported to index.js to wrap around the
                                                        // App. Provides the ability to access contact and updateContact on any page.
                                                        // 
        <FacilityContext.Provider value={{fId, updateFId}}>
            {children}
        </FacilityContext.Provider>
    )
}

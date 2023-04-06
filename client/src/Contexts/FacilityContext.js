import { createContext, useEffect, useState } from "react";

export const FacilityContext = createContext();

export const FacilityContextProvider = ({children}) => {
    const [facility, setFacility] = useState(localStorage.getItem("facility") || ""
    );

    const toggleFacility = (id) => {
        setFacility(id);
        console.log(id);
    }

    useEffect(()=>{
        localStorage.setItem("facility", facility);
    }, [facility]);

    return(
        <FacilityContext.Provider value={{facility, toggleFacility}}>
            {children}
        </FacilityContext.Provider>
    )
}
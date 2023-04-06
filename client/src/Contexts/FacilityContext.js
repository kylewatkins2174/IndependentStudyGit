import { createContext, useState } from "react";

export const FacilityContext = createContext();

export const FacilityContextProvider = ({children}) => {
    const [facility, setFacility] = useState({
        fId: "",
        fName: "",
        fAddr: "",
        fCity: "",
        fState: "",
        fZip: 0,
        lat: 0, 
        longitude: 0,
        maxOccupants: 0
    })
    ;

    const updateFacility = (fac) => {
        setFacility(fac);
    }

    const fId = facility.fId;

    return(
        <FacilityContext.Provider value={{facility, fId, updateFacility}}>
            {children}
        </FacilityContext.Provider>
    )
}
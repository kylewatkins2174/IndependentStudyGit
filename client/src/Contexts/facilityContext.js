import { createContext, useState } from "react";

export const FacilityContext = createContext();         // Creates a new context to store all the information about a facility.
                                                        //
export const FacilityContextProvider = ({children}) => {// Creates another ContextProvider to wrap around the App (denoted by {children})
                                                        //
    const [facility, setFacility] = useState({          // This useState generates the facility variable and all the information related to
        fId: "",                                        // it from the database. Facility makes use of one database: facility. Facility is 
        fName: "",                                      // related to the Contact table by fId (short for Facility ID). The information to
        fAddr: "",                                      // the left is the generic information that will be filled in if no API requests have 
        fCity: "",                                      // been made. The variables are as follows: fId (facility ID), fName (name of facility),
        fState: "",                                     // fAddr (facility's street address), fCity (facility's city address, i.e. Houston), 
        fZip: 0,                                        // fState (can only be two letters, i.e. TX or AL), fZip (facility's zipcode), 
        lat: 0,                                         // lat (latitude of facility's address), longitude (longitude of facility's address), 
        longitude: 0,                                   // and maxOccupants (the maximum number of occupants in the facility at a given time).
        maxOccupants: 0                                 //
    });                                                 //
                                                        //
    const updateFacility = (fac) => {                   // A function to update the facility. Takes in the prop "fac" and then
        setFacility(fac);                               // sets the state of the facility variable to the new facility sent in 
    }                                                   // with "fac"
                                                        //
    const fId = facility.fId;                           // A variable to hold the Facility ID to reduce callback times.
                                                        //
    return(                                             // Generate the ContextProvider to be exported to index.js to wrap around the
                                                        // App. Provides the ability to access contact and updateContact on any page.
                                                        // 
        <FacilityContext.Provider value={{facility, fId, updateFacility}}>
            {children}
        </FacilityContext.Provider>
    )
}

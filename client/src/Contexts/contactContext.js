import { createContext, useState } from "react";

export const ContactContext = createContext();          // Creates a new Context named ContactContext to wrap around the App.
                                                        // 
export const ContactContextProvider = ({children}) => { // Creates a ContextProvider to wrap around the App (denoted by {children}).
                                                        //
    const [contact, setContact] = useState([]);         // This useState generates the contact variable and all the fields within.
                                                        // The default is an empty array, ready to be filled with the objects of
                                                        // information from the database.
                                                        //
    const updateContact = (contactInfo) => {            // A function to update the contact to the most current facility to be used 
        setContact(contactInfo);                        // in the MoreInfoFacility component.
    };                                                  //
                                                        //
    return(                                             // Generate the ContextProvider to be exported to index.js to wrap around the
                                                        // App. Provides the ability to access contact and updateContact on any page.
                                                        // 
        <ContactContext.Provider value={{contact, updateContact}} >
            {children}
        </ContactContext.Provider>
    )
}

import { createContext, useState } from "react";

export const ContactContext = createContext();          // Creates a new Context named ContactContext to wrap around the App.
                                                        // 
export const ContactContextProvider = ({children}) => { // Creates a ContextProvider to wrap around the App (denoted by {children})
                                                        //
    const [contact, setContact] = useState([{           // This useState generates the contact variable and all the fields within.
        cId: 0,                                         // The default is an empty Contact with general information and the same
        firstName: "First",                             // fields to be filled later by a real Contact.
        lastName: "Last",                               //
        title: "Title",                                 //
        phoneNum: 0,                                    //
        cType: "one",                                   //
        cEmail: "example@gmail.com",                    //
        fId: 0,                                         //
        cMailAddr: "123 EXAMPLE RD",                    //
        cMailCity: "EXAMPLE",                           //
        cMailState: "TX",                               //
        cMailZip: "12345"                               // 
    }]);                                                //
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
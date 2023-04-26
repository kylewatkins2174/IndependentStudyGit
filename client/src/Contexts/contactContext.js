import { createContext, useState } from "react";

export const ContactContext = createContext();          // Creates a new Context named ContactContext to wrap around the App.
                                                        // 
export const ContactContextProvider = ({children}) => { // Creates a ContextProvider to wrap around the App (denoted by {children}).
                                                        //
    const [contact, setContact] = useState([{           // This useState generates the contact variable and all the fields within.
        cId: 0,                                         // The default is an empty Contact with general information and the same
        firstName: "First",                             // fields to be filled later by a real Contact.
        lastName: "Last",                               //
        title: "Title",                                 // Contact makes use of two databases: contact and contactinfo.
        phoneNum: 0,                                    // Related by the cId (short for contact ID), contact stores the names of the contacts
        cType: "one",                                   // and contactinfo stores the address of the contact. Until an API request is called,  
        cEmail: "example@gmail.com",                    // the information to the left will be automatically filled in. The field variables are
        fId: 0,                                         // as follows: cId (contact ID), firstName (contact's first name), lastName (contact's lastName),
        cMailAddr: "123 EXAMPLE RD",                    // title (contact's title), phoneNum (contact's phone number), cType (?), cEmail (contact's email
        cMailCity: "EXAMPLE",                           // address), fId (foreign key for facility's ID), cMailAddr (contact's mailing address),
        cMailState: "TX",                               // cMailCity (contact's mailing city), cMailState (contact's mailing state, only two letters,
        cMailZip: "12345"                               // i.e. TX or AL), and cMailZip (contact's mailing zipcode). 
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

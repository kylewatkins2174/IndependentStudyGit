import { createContext, useState } from "react";

export const MapContext = createContext();               // Creates a new Context named ContactContext to wrap around the App.
                                                         //
export const MapContextProvider = ({children}) => {      // Creates a provider to wrap around the App (denoted by {children}).
                                                         //
    const [visibility, setVisibility] = useState(false); // This useState generates a Boolean variable "visibility" and a function to 
                                                         // set the visibility to true or false. Used to display MoreInfoFacility on searchFacility.jsx.
                                                         // 
    const setVisible = () => {                           // A function to set visibility to true, used to open the component
        setVisibility(true);                             // MoreInfoFacility.
    }                                                    //  
                                                         //
    const setInvisible = () => {                         // A function to set visibility to false, used to close the component
        setVisibility(false);                            // MoreInfoFacility.
    }                                                    //

    const [selected, setSelected] = useState(false);

    const select = () => {
        setSelected(true);
    }

    const deselect = () => {
        setSelected(false);
    }
                                                         //
    return(                                              // Generate the ContextProvider to be exported to index.js to wrap around the
                                                         // App. Provides the ability to access visibility, setVisible, and setInvisible
                                                         // on any page.
        <MapContext.Provider value={{visibility, setVisible, setInvisible, selected, select, deselect}}>
            {children}
        </MapContext.Provider>
    )
}
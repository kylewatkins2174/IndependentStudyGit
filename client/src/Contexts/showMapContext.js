import { createContext, useEffect, useState } from "react";

export const MapContext = createContext();

export const MapContextProvider = ({children}) => {
    const [visibility, setVisibility] = useState(
        JSON.parse(localStorage.getItem("visibility")) || true
    );

    const toggle = () => {
        setVisibility(!visibility);
    }

    useEffect(() => {
        localStorage.setItem("visibility", visibility);
    }, [visibility]);

    return(
        <MapContext.Provider value={{visibility, toggle}}>
            {children}
        </MapContext.Provider>
    )
}
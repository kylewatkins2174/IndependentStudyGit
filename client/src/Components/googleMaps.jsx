import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import React from "react";
import {MapContext} from "../Contexts/showMapContext";
import {FacilityContext} from "../Contexts/facilityContext";
import {ContactContext} from "../Contexts/contactContext";
import {useContext, useEffect} from "react";
import axios from "axios";

const ContainerStyle = {                       // Style variable to set the position and height of the Maps Container.
    position: 'relative',                      //
    height:'80vh',                             //
}                                              //
                                               //
export const MapContainer = (props) => {       // MapContainer is a functional component, as opposed to a class.
                                               // It takes in markers as a prop, and uses that to render the markers
                                               // on the map, which store all the data about the facilities in them.
                                               // It also generates the map with an initial center in the middle of
                                               // Houston.
                                               //
                                               //
                                               // Three useContexts are initialized to pass around data and 
                                               // information about the facilities and their contacts:
                                               //    -- setVisible() to set the small info window to visible,
                                               //    -- fId and updateFacility() to set the facility and form API request for contacts
                                               //    -- updateContact() to set the current contact as the one for the selected marker
    const {setVisible} = useContext(MapContext);
    const{fId, updateFacility} = useContext(FacilityContext); 
    const {updateContact} = useContext(ContactContext);
                                               //
    useEffect(() => {                          // This useEffect takes in the fId context variable and sets jsonLoad
                                               // to the same value. jsonLoad is then sent to the server with axios. 
        const jsonLoad = {fId};                // If there is no error in retrieving the response, the Contact context
      axios.post('http://localhost:8800/api/facility/contacts', jsonLoad)// variable will be updated. Otherwise, it
      .then(function (response) {              // catches the error. The useEffect is only triggered when the fId is
          updateContact(response.data);        // changed, hence the fId in the Dependency Array at the end.
      })                                       //  
      .catch(function (error) {                //
          console.log(error);                  //
      })                                       //
    }, [fId])                                  //
                                               //
    const onMarkerClick = (props, marker) => { // onMarkerClick is a function, taking in props and marker, in order
                                               // update the Facility using the updateFacility() context function. 
        updateFacility(marker)                 // It also sets the Visibility context variable to true by using
        setVisible();                          // setVisible().
    };                                         //  
                                               //
    return(                                    // This is the MapContainer rendering. Within, there is found:
                                               // 
                                               // 1.  <Map/> React Component, which requires google={props.google}
                                               //     in order to function. The street view, full screen, and map type
                                               //     controls have all been disabled. The initial center is in the middle of Houston.
                                               //
                                               // 2. <Marker> React Component. Using the .map() function, for every marker 
                                               //    gathered in the <SearchFacility> Component saved as the markers prop.
                                               //    Calls the onMarkerClick method and contains all the information about
                                               //    a facility. 
        // {/* 1 */}
        <Map
        google={props.google} 
        containerStyle={ContainerStyle}
        zoom={9} 
        initialCenter={{
            lat: 29.7604,
            lng: -95.3698 }}
        streetViewControl={false}
        fullscreenControl={false}
        mapTypeControl={false}
        >
        {/* 2 */}
        {props.markers.map(marker => {
            return (
            <Marker 
              key={marker.fId}
              fId={marker.fId}
              title={marker.fName}
              name={marker.fName}
              address={marker.fAddr}
              city={marker.fCity}
              zip={marker.fZip}
              state={marker.fState}
              occ={marker.maxOccupants}
              position={{lat:marker.lat, lng:marker.longitude}}
              onClick={onMarkerClick}
            />
            )
          })}

        </Map>
    )
}

export default GoogleApiWrapper({ // This is the Google API Wrapper for the map. Using the given API key,
                                  // it wraps around the MapContainer, which enables the Google Maps API
                                  // to function.
    apiKey: 'AIzaSyAyJTyMNsRkZ8FXk3hpGs3CGlplmw6oJnE'
  })(MapContainer)

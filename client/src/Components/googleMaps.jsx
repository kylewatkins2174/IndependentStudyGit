import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import React from "react";
import {MapContext} from "../Contexts/showMapContext";
import {FacilityContext} from "../Contexts/facilityContext";
import {ContactContext} from "../Contexts/contactContext";
import {useContext, useEffect} from "react";
import axios from "axios";

const ContainerStyle = {                       //creates a style for the Google Maps object
    position: 'relative',                      //
    height:'80vh',                             //
}                                              //
                                               //
export const MapContainer = (props) => {       // creating a MapContainer functional component, takes in markers as a prop,
                                               // and uses that to create all the markers, which store all the data about the 
                                               // facility itself. Generates the map with an initial center in the middle of
                                               // Houston.
                                               //
                                               //
                                               // Three useContexts to pass around data and information about the facilities and
                                               // their contacts:
                                               //    -- setVisible() to set the small info window to visible,
                                               //    -- fId and updateFacility() to set the facility and form API request for contacts
                                               //    -- updateContact() to set the current contact as the one for the selected marker
    const {setVisible} = useContext(MapContext);
                                               //
    const{fId, updateFacility} = useContext(FacilityContext); 
                                               //
    const {updateContact} = useContext(ContactContext);
                                               //
    useEffect(() => {                          // useEffect pulls data from the database, sending in the fId and quering the 
                                               //contact for the facility with the same fId.
        const jsonLoad = {fId};                //  
      axios.post('http://localhost:8800/api/facility/contacts', jsonLoad)
      .then(function (response) {              //
          updateContact(response.data);        //
      })                                       //  
      .catch(function (error) {                //
          console.log(error);                  //
      })                                       //
    }, [fId])                                  //
                                               //
    const onMarkerClick = (props, marker) => { // function to set the current facility to all the information
                                               // given in the marker. It then sets the visibility of the 
                                               // information.
        updateFacility(marker)                 //  
        setVisible();                          //
    };                                         //  
    return(                                    // MapContainer render. Requires a <Map /> component.
                                               // google={props.google} is important to get it to function.
                                               // Set streetViewControl and fullscreenControl to false to limit user's
                                               // capabilities with the google map.
                                               // 
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
        {/*
          Creates all the markers. Taking in the markers prop, it renders as many markers as are within the
          jurisdiction. Each marker takes in all the necessary information to pass around to other pages.
        */}
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

export default GoogleApiWrapper({ // The API Wrapper. Without this, the Google Maps would not work. 
                                  // Requires an API key in order to display, and then wraps around the
                                  // MapContainer. 
    apiKey: 'AIzaSyAyJTyMNsRkZ8FXk3hpGs3CGlplmw6oJnE'
  })(MapContainer)

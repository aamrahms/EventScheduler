import React, {useState} from 'react';
import  {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';

//import 'use-places-autocomplete'
function Map(){

    const [coordinates, setCoordinates]=useState({});
    const libraries =  ["places"]
    const mapContainerStyle= {
        width : '100vw',
        height : '100vh',
    };
    const defaultCenter= {lat : 42.360081, lng :-71.058884};
    const options ={
        disableDefaultUI : true,
        zoomControl : true,
    }
    const {isLoaded, loadError}= useLoadScript({
        //googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        googleMapsApiKey : 'AIzaSyBSw_xCmTchDi3a3L6IMKn9aJjnR0qgAIE',
        libraries,
    });

   
    if(loadError) return "Error Loading maps";
    if(!isLoaded) return "Loading maps";
    return ((
        <div>
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} defaultCenter={defaultCenter} options={options} ></GoogleMap>
        {/* onClick={onMapClick} */}
        </div>
    ));
}



export default Map;
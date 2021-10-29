import React, {useEffect, useState} from 'react';
import {GoogleMap, InfoWindow, LoadScript, Marker, useJsApiLoader} from '@react-google-maps/api';

const containerStyle = {
    width: '500px',
    height: '550px'
};

const centerMap = {
    lat: 43.0008,
    lng: -78.7890
};


function GoogleMaps(){
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const [ currentPosition, setCurrentPosition ] = useState({});

    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    })

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPosition}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */ }
            {/*<Marker position={{lat: 43.0008, lng: -78.7891}}/>*/}
            {
                currentPosition.lat &&
                (
                    <Marker position={currentPosition}/>
                )
            }
            <Marker position={centerMap}/>
        </GoogleMap>
    ) : <></>
}

export default GoogleMaps;
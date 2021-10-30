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

const student_parking_lots = {
    "Alumni A Lot" : [43.000716, -78.780223],
    "Alumni B Lot" : [43.001901, -78.77871],
    "Alumni C Lot" : [43.001909, -78.779976],
    "Arena Lot" : [43.000857, -78.779418],
    "Baird A Lot" : [42.998558, -78.784504],
    "Cooke A Lot" : [42.999437, -78.793216],
    "Cooke B Lot" : [42.998715, -78.793237],
    "Fronczak Lot" : [43.002425, -78.791424],
    "Hochstetter B Lot" : [42.99859, -78.790212],
    "Jarvis A Lot" : [43.003721, -78.788517],
    "Jarvis B Lot" : [43.003972, -78.786929],
    "Ketter Lot" :  [43.002466, -78.788838],
    "Park Hall Lot" : [42.999657, -78.788688]
}

const iconBase = "https://maps.google.com/mapfiles/kml/shapes/";

const customStyle = [
    {
        featureType: "poi.business",
        elementType: "labels",
        stylers: [
            { visibility: "off" }
        ]
    }
]

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

    // map.set('styles', customStyle);

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
            {Object.entries(student_parking_lots).map((key,value)=>{
                const positionMarker = {
                    lat : key[1][0],
                    lng : key[1][1]
                }
                return <Marker position={positionMarker} icon={iconBase+'parking_lot_maps.png'}/>
            })}
            <Marker position={centerMap}/>
        </GoogleMap>
    ) : <></>
}

export default GoogleMaps;
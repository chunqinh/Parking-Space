import React, {useEffect, useState} from 'react';
import {GoogleMap, InfoWindow, LoadScript, Marker, useJsApiLoader} from '@react-google-maps/api';
import carParkedIcon from '../icons/car-parked.svg'

const containerStyle = {
    width: '500px',
    height: '550px'
};


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

function GoogleMaps({frees,paids,nearbyFree,nearbyPaid,nearbyFaculty,faculty,userParkedLotName, parkingLotsMap}:{frees:boolean,paids:boolean, faculty:boolean,nearbyFaculty:string, nearbyFree:string,nearbyPaid:string,userParkedLotName:string, parkingLotsMap:Array}){
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API
    })

    const [selectedCenter, setSelectedCenter] = useState(false);
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
            {
                currentPosition.lat &&
                (
                    <Marker position={currentPosition} onClick={() => {
                        setSelectedCenter("Current Location");}}/>

                )
            }
            {
                currentPosition.lat && selectedCenter && (
                    <InfoWindow
                        onCloseClick={() => {
                            setSelectedCenter(false);
                        }}
                        position={{
                            lat: currentPosition.lat,
                            lng: currentPosition.lng
                        }}
                    >
                        <div>
                            <h3>Current Location</h3>
                        </div>

                    </InfoWindow>
                )
            }
            }
            {
                !userParkedLotName && parkingLotsMap ?

                parkingLotsMap.map( data =>{
                    const positionMarker = {
                        lat : data['lat'],
                        lng : data['long']
                    }

                    if(paids && !frees){
                        if(data['paid'] && data['available'] > 0){
                            return (<Marker position={positionMarker} icon={iconBase+'parking_lot_maps.png'}/>)
                        }
                    }
                    else if(frees && !paids){
                        if(data['free'] && data['available'] > 0){
                            return (<Marker position={positionMarker} icon={iconBase+'parking_lot_maps.png'}/>)
                        }
                    }
                    else if(faculty){
                        if(data['faculty'] && data['available'] > 0){
                            return (<Marker position={positionMarker} icon={iconBase+'parking_lot_maps.png'}/>)
                        }
                    }
                    else{
                        if(data['free'] && data['available'] > 0){
                            return (<Marker position={positionMarker} icon={iconBase+'parking_lot_maps.png'}/>)
                        }
                    }

            })
                    :
                    <></>

            }
            {

                nearbyFree && frees && parkingLotsMap ? parkingLotsMap.map(data=>{
                    if(data['name'] === nearbyFree){
                        return <Marker position={{lat:data['lat'],lng: data['long']}} onClick={() =>{setSelectedCenter(nearbyFree)}}/>
                    }
                })
                :
                    <></>

            }
            {
                nearbyPaid && paids && parkingLotsMap  ? parkingLotsMap.map(data=>{
                        if(data['name'] === nearbyPaid){
                            return <Marker position={{lat:data['lat'],lng: data['long']}} onClick={() =>{setSelectedCenter(nearbyPaid)}}/>
                        }
                    })
                    :
                    <></>
            }
            {
                nearbyFaculty && faculty && parkingLotsMap  ? parkingLotsMap.map(data=>{
                        if(data['name'] === nearbyFaculty){
                            return <Marker position={{lat:data['lat'],lng: data['long']}} onClick={() =>{setSelectedCenter(nearbyFaculty)}}/>
                        }
                    })
                    :
                    <></>
            }
            {
                nearbyFree && selectedCenter && frees && parkingLotsMap ? (
                    parkingLotsMap.map(data=>{
                        if(data['name'] === nearbyFree){
                            return(
                                <InfoWindow
                                    onCloseClick={() => {
                                        setSelectedCenter(false);
                                    }}
                                    position={{
                                        lat: data['lat'],
                                        lng: data['long']
                                    }}
                                >
                                    <div>
                                        <h3>{nearbyFree}</h3>
                                        <a href= {data['link']} target={"_blank"}> Navigate Here</a>
                                    </div>
                                </InfoWindow>
                            )
                        }
                    })

                ) : <></>
            }

            {
                nearbyPaid && parkingLotsMap && paids && selectedCenter ?   (
                    parkingLotsMap.map(data=>{
                        if(data['name'] === nearbyPaid){
                            return(
                                <InfoWindow
                                    onCloseClick={() => {
                                        setSelectedCenter(false);
                                    }}
                                    position={{
                                        lat: data['lat'],
                                        lng: data['long']
                                    }}
                                >
                                    <div>
                                        <h3>{nearbyPaid}</h3>
                                        <a href= {data['link']} target={"_blank"}> Navigate Here</a>
                                    </div>

                                </InfoWindow>
                            )
                        }
                    })
                ) : <></>

            }
            {
                nearbyFaculty && parkingLotsMap && faculty && selectedCenter ?   (
                    parkingLotsMap.map(data=>{
                        if(data['name'] === nearbyFaculty){
                            return(
                                <InfoWindow
                                    onCloseClick={() => {
                                        setSelectedCenter(false);
                                    }}
                                    position={{
                                        lat: data['lat'],
                                        lng: data['long']
                                    }}
                                >
                                    <div>
                                        <h3>{nearbyFaculty}</h3>
                                        <a href= {data['link']} target={"_blank"}> Navigate Here</a>
                                    </div>

                                </InfoWindow>
                            )
                        }
                    })
                ) : <></>
            }

            {
                userParkedLotName && parkingLotsMap ?
                    parkingLotsMap.map(data=>{
                        if(data['name'] === userParkedLotName){
                            return <Marker position={{lat:data['lat'],lng: data['long']}} icon={carParkedIcon}/>
                        }
                    })
                :
                <></>
            }

        </GoogleMap>
    ) : <></>
}

export default GoogleMaps;
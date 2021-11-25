import React, {useEffect, useState} from 'react';
import {GoogleMap, InfoWindow, LoadScript, Marker, useJsApiLoader} from '@react-google-maps/api';

const containerStyle = {
    width: '500px',
    height: '550px'
};

const student_parking_lots = {
    "Alumni A Lot" : [43.000716, -78.780223, true,"https://goo.gl/maps/z4SbM4aJdfuB5HwV6", false],
    "Alumni B Lot" : [43.001901, -78.77871, true,"https://goo.gl/maps/s33e9WZaAFmrB4Rz7",false],
    "Alumni C Lot" : [43.001909, -78.779976, true,"https://goo.gl/maps/Camn2CzybZpLsUcU9",false],
    "Arena Lot" : [43.000857, -78.779418, true,"https://goo.gl/maps/5pTg8WhP4RhjSy8X7",false],
    "Baird A Lot" : [42.998558, -78.784504, true,"https://goo.gl/maps/45MivZVFVq22L2Fh9",false],
    "Bookstore Lot": [43.002333,-78.78534, false,"https://goo.gl/maps/87c2krGjP7XR92qQ7",false],
    "Cooke A Lot" : [42.999437, -78.793216 ,true,"https://goo.gl/maps/Pk3XbMH2YNsZXkLj9",false],
    "Cooke B Lot" : [42.998715, -78.793237, true,"https://goo.gl/maps/dyMAes4BksPJ8FdZ7",false],
    "Crofts Lot" : [42.994807, -78.797078, true,"https://goo.gl/maps/GKfubFAw3Gjcy8pi7",false],
    "Furnas Lot" : [43.00245, -78.786328, true,"https://goo.gl/maps/sTBnFFY6f53cRRdH6", true],
    "Fronczak Lot" : [43.002425, -78.791424, true,"https://goo.gl/maps/VchkxMUY14nd4Nwq8",false],
    "Hochstetter A Lot" : [42.998809, -78.791585, true,"https://goo.gl/maps/9V5vYTvcDN2eT8Xx9", true],
    "Hochstetter B Lot" : [42.99859, -78.790212, false,"https://goo.gl/maps/bUJnnMTF1eFhpxRc7",false],
    "Governors A Lot" :[43.00234,-78.790877,true,"https://goo.gl/maps/28n38jT1GiTqfQqF9", true],
    "Jacobs B Lot": [42.998401,-78.7871, true,"https://goo.gl/maps/qGXTVax2x9d6YNFj9",false],
    "Jacobs A Lot": [42.998511,-78.788302, true,"https://goo.gl/maps/xgxEpQ4t3bUt9z6x6",true],
    "Jacobs C Lot": [42.998574,-78.786113, true,"https://goo.gl/maps/Ha3VeTLKDvSWJCTB9",false],
    "Jarvis A Lot" : [43.003721, -78.788517, false,"https://goo.gl/maps/DJrwMmxD3FNmkjr96",false],
    "Jarvis B Lot" : [43.003972, -78.786929, true,"https://goo.gl/maps/pcVVLd6PnjKf1hZa9",false],
    "Ketter Lot" :  [43.002466, -78.788838, true,"https://goo.gl/maps/6h7i4edeea1Jd2BKA",false],
    "Park Hall Lot" : [42.999657, -78.788688, true,"https://goo.gl/maps/5ja1ArexJ4VQQ3UX7",false],
    "Slee A Lot" : [42.99848, -78.783517, true,"https://goo.gl/maps/3eavzUUU53MVKbmt9",false],
    "Slee B Lot" : [42.999374, -78.783474, true,"https://goo.gl/maps/qDQPpq8UavPQi75q6",false]
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

function GoogleMaps({availables,frees,paids,nearbyFree,nearbyPaid,nearbyFaculty,faculty}:{availables:boolean,frees:boolean,paids:boolean, faculty:boolean,nearbyFaculty:string, nearbyFree:string,nearbyPaid:string}){
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
                            {/*<a href= {student_parking_lots[nearbyPaid][3]} target={"_blank"}> Navigate Here</a>*/}
                        </div>

                    </InfoWindow>
                )
            }
            }
            {

                Object.entries(student_parking_lots).map((key,value)=>{
                const positionMarker = {
                    lat : key[1][0],
                    lng : key[1][1]
                }

                if(paids && !frees){
                    if(!key[1][2] && !key[1][4]){
                        return (<Marker position={positionMarker} icon={iconBase+'parking_lot_maps.png'}/>)
                    }
                }
                else if(frees && !paids){
                    if(key[1][2] && !key[1][4]){
                        return (<Marker position={positionMarker} icon={iconBase+'parking_lot_maps.png'}/>)
                    }
                }
                else if(faculty){
                    if(key[1][4]){
                        return (<Marker position={positionMarker} icon={iconBase+'parking_lot_maps.png'}/>)
                    }
                }
                else{
                    if(!key[1][4]){
                        return (<Marker position={positionMarker} icon={iconBase+'parking_lot_maps.png'}/>)
                    }
                }

            })}
            {

                nearbyFree !== "" ? <Marker position={{lat: student_parking_lots[nearbyFree][0],
                    lng:student_parking_lots[nearbyFree][1]}} onClick={() => {
                        setSelectedCenter(nearbyFree);
                    }}/>
                :
                nearbyPaid !== "" ? <Marker position={{lat: student_parking_lots[nearbyPaid][0],
                lng: student_parking_lots[nearbyPaid][1]}} onClick={() => {
                        setSelectedCenter(nearbyPaid);
                    }}/>
                :
                nearbyFaculty !== "" ? <Marker position={{lat: student_parking_lots[nearbyFaculty][0],
                        lng: student_parking_lots[nearbyFaculty][1]}} onClick={() => {
                        setSelectedCenter(nearbyFaculty);
                        }}/>
                :
                    <></>
            }
            {
                nearbyFree !== "" ? selectedCenter && (
                    <InfoWindow
                        onCloseClick={() => {
                            setSelectedCenter(false);
                        }}
                    position={{
                        lat: student_parking_lots[nearbyFree][0],
                        lng: student_parking_lots[nearbyFree][1]
                    }}
                    >
                        <div>
                            <h3>{nearbyFree}</h3>
                            <a href= {student_parking_lots[nearbyFree][3]} target={"_blank"}> Navigate Here</a>
                        </div>

                    </InfoWindow>
                ) : <></>

            }

            {
                nearbyPaid !== "" ? selectedCenter && (
                    <InfoWindow
                        onCloseClick={() => {
                            setSelectedCenter(false);
                        }}
                        position={{
                            lat: student_parking_lots[nearbyPaid][0],
                            lng: student_parking_lots[nearbyPaid][1]
                        }}
                    >
                        <div>
                            <h3>{nearbyPaid}</h3>
                            <a href= {student_parking_lots[nearbyPaid][3]} target={"_blank"}> Navigate Here</a>
                        </div>

                    </InfoWindow>
                ) : <></>

            }
            {
                nearbyFaculty !== "" ? selectedCenter && (
                    <InfoWindow
                        onCloseClick={() => {
                            setSelectedCenter(false);
                        }}
                        position={{
                            lat: student_parking_lots[nearbyFaculty][0],
                            lng: student_parking_lots[nearbyFaculty][1]
                        }}
                    >
                        <div>
                            <h3>{nearbyFaculty}</h3>
                            <a href= {student_parking_lots[nearbyFaculty][3]} target={"_blank"}> Navigate Here</a>
                        </div>

                    </InfoWindow>
                ) : <></>
            }

        </GoogleMap>
    ) : <></>
}

export default GoogleMaps;
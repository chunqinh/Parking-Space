import React, {useEffect, useState} from 'react'
import GoogleMaps from "../google-map-api/map";


const parking = {
    "Alumni A Lot" : [43.000716, -78.780223, true,"https://goo.gl/maps/z4SbM4aJdfuB5HwV6"],
    "Alumni B Lot" : [43.001901, -78.77871, true,"https://goo.gl/maps/s33e9WZaAFmrB4Rz7"],
    "Alumni C Lot" : [43.001909, -78.779976, true,"https://goo.gl/maps/Camn2CzybZpLsUcU9"],
    "Arena Lot" : [43.000857, -78.779418, true,"https://goo.gl/maps/5pTg8WhP4RhjSy8X7"],
    "Baird A Lot" : [42.998558, -78.784504, true,"https://goo.gl/maps/45MivZVFVq22L2Fh9"],
    "Bookstore Lot": [43.002333,-78.78534, false,"https://goo.gl/maps/87c2krGjP7XR92qQ7"],
    "Cooke A Lot" : [42.999437, -78.793216 ,true,"https://goo.gl/maps/Pk3XbMH2YNsZXkLj9"],
    "Cooke B Lot" : [42.998715, -78.793237, true,"https://goo.gl/maps/dyMAes4BksPJ8FdZ7"],
    "Crofts Lot" : [42.994807, -78.797078, true,"https://goo.gl/maps/GKfubFAw3Gjcy8pi7"],
    "Fronczak Lot" : [43.002425, -78.791424, true,"https://goo.gl/maps/VchkxMUY14nd4Nwq8"],
    "Hochstetter B Lot" : [42.99859, -78.790212, false,"https://goo.gl/maps/bUJnnMTF1eFhpxRc7"],
    "Jacobs B Lot": [42.998401,-78.7871, true,"https://goo.gl/maps/qGXTVax2x9d6YNFj9"],
    "Jacobs C Lot": [42.998574,-78.786113, true,"https://goo.gl/maps/Ha3VeTLKDvSWJCTB9"],
    "Jarvis A Lot" : [43.003721, -78.788517, false,"https://goo.gl/maps/DJrwMmxD3FNmkjr96"],
    "Jarvis B Lot" : [43.003972, -78.786929, true,"https://goo.gl/maps/pcVVLd6PnjKf1hZa9"],
    "Ketter Lot" :  [43.002466, -78.788838, true,"https://goo.gl/maps/6h7i4edeea1Jd2BKA"],
    "Park Hall Lot" : [42.999657, -78.788688, true,"https://goo.gl/maps/5ja1ArexJ4VQQ3UX7"],
    "Slee A Lot" : [42.99848, -78.783517, true,"https://goo.gl/maps/3eavzUUU53MVKbmt9"],
    "Slee B Lot" : [42.999374, -78.783474, true,"https://goo.gl/maps/qDQPpq8UavPQi75q6"]
}

function UserDashboard(){
    const [available, setAvailable] = useState(true);
    const [free, setFree] = useState(false);
    const [paid, setPaid] = useState(false);

    const [nearByLotFree, setNearByLotFree] = useState(Object.keys(parking)[0]);
    const [nearByLotPaid, setNearByLotPaid] = useState(Object.keys(parking)[0]);

    const [times, setTime] = useState(new Date().toLocaleTimeString());

    const [currentPosition, setCurrentPosition] = useState({});

    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    // useEffect(() => {
    //     let secTimer = setInterval(() => {
    //         setTime(new Date().getMinutes)
    //     }, 1000)
    //
    //     return () => clearInterval(secTimer);
    // },[]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
        findNearFreeLots(free,paid)
    })

    function findNearFreeLots(free,paid){
        let distance = {};
        for(let [keys,values] of Object.entries(parking)){
            if(free){
                if(values[2]){
                    distance[keys] = distanceFormula(currentPosition.lat, currentPosition.lng, values[0], values[1]);
                }
            }
            else if(paid){
                if(!values[2]){
                    distance[keys] = distanceFormula(currentPosition.lat, currentPosition.lng, values[0], values[1]);
                }
            }
        }
        distance = Object.entries(distance).sort((a, b) => a[1] - b[1])
        if (free){
            setNearByLotFree(distance[0][0]);
            console.log(distance);
        }
        else if(paid){
            setNearByLotPaid(distance[0][0]);
            console.log(distance);
        }
        return 0;
    }


    function distanceFormula(latitude1, longitude1, latitude2, longitude2){

        //Radius of Earth
        const radius =  6371000;

        //Change PI into Radians
        const latitude1InRadians = latitude1 * (Math.PI/180);
        const latitude2InRadians = latitude2 * (Math.PI/180);

        //Change in Longitude and Latitude
        const changeInLatitude = (latitude2 - latitude1) * (Math.PI/180);
        const changeInLongitude = (longitude2 - longitude1) * (Math.PI/180);

        const sum = (Math.sin(changeInLatitude/2) * Math.sin(changeInLatitude/2)) +
            (Math.cos(latitude1InRadians) * Math.cos(latitude2InRadians) * Math.sin(changeInLongitude/2) *
                Math.sin(changeInLongitude/2))

        const tanInverse = 2 * Math.atan(Math.sqrt(sum), Math.sqrt(1-sum));

        return (radius * tanInverse)/1000;

    }

    useEffect(()=>{
        getParkingLotsData();
        setInterval(getTime,1000);
    });
    function getParkingLotsData(){
        fetch('/dashboard')
            .then(res => res.json())
            .then(userData => {
                for (let details in userData[0]){
                    console.log(userData[0][details])
                }
            })
    }

    function handleLots(setLots){
        if (setLots === "free"){
            setFree(!free);
        }
        else if (setLots === "paid"){
            setPaid(!paid);
        }
        else{
            setAvailable(!available);
        }

        return 0;
    }

    function getTime(){
        const today = new Date();
        const currentTime = today.toLocaleTimeString();
        setTime(currentTime);
    }
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    return(
        <div className="single-height-pages">
            <div className="row dashboard">
                <div style={{textAlign:'center'}}>
                    <div className="column dashboard" >
                        <h1 className="super-heading time" >{times}</h1>
                        <h3 className="heading">{date}</h3>
                        {/*<a href={"/edit-time"} className="menu-links register" style={{borderRadius:'5px', width:'85px'}}>EDIT TIME</a>*/}
                    </div>
                    {/*<AvailableParkingLots/>*/}
                    <div>
                        <div>
                            <button onClick={()=>handleLots("available")} className={available ? "dashboard-buttons active" : "dashboard-buttons"}>Available Lots</button>
                            <button onClick={()=>handleLots("free")} className={free ? "dashboard-buttons active" : "dashboard-buttons"}>Free Lots</button>
                            <button onClick={()=>handleLots("paid")} className={paid ? "dashboard-buttons active" : "dashboard-buttons"}>Paid Lots</button>
                        </div>
                        <div>
                            {available || free || paid ?
                                !free && available && paid ?
                                    <div className="dashboard-parking-lots">
                                        {Object.entries(parking).map((key,value)=>{
                                            if (!key[1][2]){
                                                return (
                                                    <div className="available-parking-lots">
                                                        <a href={key[1][3]} target={"_blank"}>
                                                            {key[0]}
                                                        </a>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                    : !paid && available && free ?
                                    <div className="dashboard-parking-lots">
                                        {Object.entries(parking).map((key,value)=>{
                                            if (key[1][2]){
                                                return (<div className="available-parking-lots">
                                                    <a href={key[1][3]} target={"_blank"}>
                                                        {key[0]}
                                                    </a>
                                                </div>)
                                            }
                                        })}
                                    </div>
                                    : paid && !free && !available ?
                                        <div className="dashboard-parking-lots">
                                            {Object.entries(parking).map((key,value)=>{
                                                if (!key[1][2]){
                                                    return (<div className="available-parking-lots">
                                                        <a href={key[1][3]} target={"_blank"}>
                                                            {key[0]}
                                                        </a>
                                                    </div>)
                                                }
                                            })}
                                        </div>
                                        : free && !paid && !available ?
                                            <div className="dashboard-parking-lots">
                                                {Object.entries(parking).map((key,value)=>{
                                                    if (key[1][2]){
                                                        return (<div className="available-parking-lots">
                                                            <a href={key[1][3]} target={"_blank"}>
                                                                {key[0]}
                                                            </a>
                                                        </div>)
                                                    }
                                                })}
                                            </div>
                                            : <div className="dashboard-parking-lots">
                                                {Object.entries(parking).map((key,value)=>{
                                                    return (<div className="available-parking-lots">
                                                        <a href={key[1][3]} target={"_blank"}>
                                                            {key[0]}
                                                        </a>
                                                    </div>)

                                                })}
                                            </div>
                                : <div/>
                            }
                        </div>
                    </div>
                </div>
                <div>
                    {
                        free && !paid ?
                            <GoogleMaps frees={true} availables={true} paids={false} nearbyFree={nearByLotFree} nearbyPaid={""} />
                        :
                        paid && !free ?
                            <GoogleMaps frees={false} availables={true} paids={true} nearbyFree={""} nearbyPaid={nearByLotPaid} />
                        :
                            <GoogleMaps frees={true} availables={true} paids={true} nearbyFree={""} nearbyPaid={""} />
                    }

                </div>
            </div>
        </div>
    )
}

export default UserDashboard;
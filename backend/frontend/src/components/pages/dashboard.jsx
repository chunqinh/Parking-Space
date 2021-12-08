import React, {useEffect, useState} from 'react'
import GoogleMaps from "../google-map-api/map";
import axios from "axios";
import ParkingLotsTab from "./parking-lots-tab";

import closeButton from "../icons/close_black_24dp.svg";
import {auth} from "../../firebase";
import EditTime from "./edit-time";


const parking = {
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


function UserDashboard(){
    const [parkingLots, setParkingLots] = useState([]);
    const [userParked, setUserParked] = useState(false);
    const [userStartTime, setUserStartTime] = useState('');
    const [userEndTime, setUserEndTime] = useState('');
    const [userParkedLot, setUserParkedLot] = useState('');
    const [carTimer,setTimer] = useState('');
    const [loading, setLoading] =  useState(false);

    useEffect(()=>{
        getParkingLots();

        auth.currentUser.getIdToken(true).then(function(idToken) {
            // Send token to your backend via HTTPS
            axios.get("http://localhost:8081/current-user-details", {
                headers:{
                    Authorization : idToken
                }})
                .then(details=>details.data).then( userData =>{
                for (let details in userData[0]){
                    if(details === "parked"){
                        setUserParked(userData[0][details])
                    }
                    else if(details === "starttimer"){
                        setUserStartTime(userData[0][details])
                    }
                    else if(details === "endtimer"){
                        setUserEndTime(userData[0][details])
                    }
                    else if(details === "parkinglot"){
                        setUserParkedLot(userData[0][details])
                    }
                }
            })
        }).catch(function(error) {
            // Handle error
        });

    }, [])

    function getParkingLots(){
        axios.get('http://localhost:8081/get-parking-lots').then(parking=>parking.data).then(parkinglots =>{
            setParkingLots(parkinglots);
        })
    }

    useEffect(()=>{
        setInterval(timer,1000);
    })

    function timer(){
        const now = new Date();
        const now_time = now.toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit', hour12: false})
        if(userEndTime && userEndTime !== 'TIME UP'){
            const split_userEndTime = userEndTime.split(':')
            const endTime = (parseInt(split_userEndTime[0]) * 60) + (parseInt(split_userEndTime[1]));
            const split_startTime = now_time.split(':')
            const startTime = (parseInt(split_startTime[0]) * 60) + (parseInt(split_startTime[1]));
            if (startTime > endTime){
                setTimer('TIME UP');
                auth.currentUser.getIdToken(true).then(function(idToken) {
                    const data = {
                        endTime : 'TIME UP'
                    }
                    axios.post("http://localhost:8081/current-user-time-up",data,{
                        headers:{
                            Authorization: idToken
                        }
                    })
                        .then( res => {
                            console.log(res);
                            console.log(res.data);

                        });
                }).catch(function(error) {
                    // Handle error
                });
            }
            else{
                let difference = endTime - startTime;
                const minutes = difference % 60;
                const hours = (difference-minutes) / 60;
                let timerString = ''
                if (minutes.toString().length === 1){
                    if(hours.toString().length === 1){
                        timerString = '0' + hours.toString() + ':' + '0' + minutes.toString()
                        return setTimer(timerString);
                    }
                    timerString = hours.toString() + ':' + '0' + minutes.toString()
                    return setTimer(timerString);
                }
                else if(hours.toString().length === 1){
                    timerString = '0' + hours.toString() + ':' + minutes.toString()
                    return setTimer(timerString);
                }
                else{
                    timerString = hours.toString() + ':' + minutes.toString()
                    return setTimer(timerString);
                }
            }
        }
        else if(userEndTime === 'TIME UP'){
            return  setTimer('TIME UP');
        }
    }

    function handleUserLeaving(e){
        e.preventDefault();
        try{
            setLoading(true);
            const parkingData = {
                parkingLotName : userParkedLot,
            }
            auth.currentUser.getIdToken(true).then((idToken)=>{
                axios.post("http://localhost:8081/user-leaving",parkingData,{
                    headers:{
                        Authorization: idToken
                    }
                })
                    .then( res => {
                        console.log(res);
                        console.log(res.data);

                    });
                setTimeout(function () { window.location.reload(); }, 5)
            })

        }catch{
            setLoading(false);
            return console.log("Something wasn't right")
        }

    }

    //Filter Tabs for Parking Lots
    const [free, setFree] = useState(true);
    const [paid, setPaid] = useState(false);
    const [faculty, setFaculty] = useState(false);

    //For Parking Side Tabs
    const [parkingTab, setParkingTab] = useState(false);
    const [parkingTabName, setParkingTabName] = useState('');
    const [parkingTabLink, setParkingTabLink] = useState('');
    const [parkingTabLat, setParkingTabLat] = useState(0);
    const [parkingTabLong, setParkingTabLong] = useState(0);
    const [parkingTabAvailableSpots, setParkingTabAvailableSpots] = useState(0);

    function handleParkingTab(name,link,spotsAvailable,lat,long){
        setParkingTab(!parkingTab);
        setParkingTabName(name);
        setParkingTabLink(link);
        setParkingTabAvailableSpots(spotsAvailable);
        setParkingTabLat(lat);
        setParkingTabLong(long)
    }

    //For Edit Time
    const [editTime, setEditTime] = useState(false);

    function editUserTime(){
        setEditTime(!editTime);
    }

    //For Nearest Parking Lot
    const [nearByLotFree, setNearByLotFree] = useState("");
    const [nearByLotPaid, setNearByLotPaid] = useState("");
    const [nearByFacultyLot, setNearByFacultyLot] = useState("");


    const [times, setTime] = useState(new Date().toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit', hour12: false}));

    const [currentPosition, setCurrentPosition] = useState({});

    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
        findNearFreeLots(free,paid,faculty)
    })

    function findNearFreeLots(free,paid,faculty){
        let distance = {};
        for(let [keys,values] of Object.entries(parking)){
            if(free){
                if(values[2]){
                    distance[keys] = distanceFormula(currentPosition.lat, currentPosition.lng, values[0], values[1]);
                }
            }
            else if(paid) {
                if (!values[2]) {
                    distance[keys] = distanceFormula(currentPosition.lat, currentPosition.lng, values[0], values[1]);
                }
            }
            else if(faculty){
                if(values[4]){
                    distance[keys] = distanceFormula(currentPosition.lat, currentPosition.lng, values[0], values[1]);
                }
            }

        }

        distance = Object.entries(distance).sort((a, b) => a[1] - b[1])
        if (free){
            setNearByLotFree(distance[0][0]);
        }
        else if(paid){
            setNearByLotPaid(distance[0][0]);
        }
        else if(faculty){
            setNearByFacultyLot(distance[0][0]);
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
        setInterval(getTime,60000);
    });

    function handleLots(setLots){
        if (setLots === "free"){
            setFree(!free);
            setPaid(false);
            setFaculty(false);
        }
        else if (setLots === "paid"){
            setPaid(!paid);
            setFree(false)
            setFaculty(false);
        }
        else if(setLots === "faculty"){
            setFaculty(!faculty);
            setPaid(false);
            setFree(false);
        }
        else{
            setFaculty(false);
        }

        return 0;
    }

    function getTime(){
        const today = new Date();
        let currentTime = today.toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit', hour12:false});
        setTime(currentTime);
    }
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    return(
        <div className="single-height-pages">
            <div className="row dashboard">
                <div style={{textAlign:'center'}}>
                    {
                        userParked ?
                            <div className="column dashboard" style={{background:'#EEF5FF', padding:'24px 0', borderRadius:'20px', width:'500px', height:'500px', display:'flex', flexDirection:'column'}}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                    <h3>YOUR CAR IS PARKED IN</h3>
                                    <h3 className="car-parked-tabs" style={{fontSize:'24px', width:'unset'}}>{userParkedLot}</h3>
                                    <h3> FOR </h3>
                                </div>
                                <h1 className="super-heading time" style={{fontSize:'98px',width:'unset'}}>{carTimer}</h1>
                                <h3 className="heading">{date}</h3>

                                <div style={{display:'flex', justifyContent:'center'}}>
                                    <form onSubmit={handleUserLeaving}>
                                        <button disabled={loading} type={"submit"} name={"Leaving"} className="login-button profile" style={{marginTop:'24px', marginRight:'20px'}} > LEAVING? </button>
                                    </form>
                                    <button disabled={loading} type={"submit"} name={"Updating"} onClick={() => editUserTime()} className="login-button profile" style={{background:'#242324',marginTop:'24px'}}>EDIT TIME</button>
                                </div>
                            </div>
                            :
                            <div>
                                <div className="column dashboard" >
                                    <h1 className="super-heading time" >{times}</h1>
                                    <h3 className="heading">{date}</h3>
                                </div>
                                <div>
                                    {/*<button onClick={()=>handleLots("available")} className={available ? "dashboard-buttons active" : "dashboard-buttons"}>Available Lots</button>*/}
                                    <button onClick={()=>handleLots("free")} className={free ? "dashboard-buttons active" : "dashboard-buttons"}>Free Lots</button>
                                    <button onClick={()=>handleLots("paid")} className={paid ? "dashboard-buttons active" : "dashboard-buttons"}>Paid Lots</button>
                                    <button onClick={()=>handleLots("faculty")} className={faculty ? "dashboard-buttons active" : "dashboard-buttons"}>Faculty Lots</button>
                                </div>
                                { parkingLots ?
                                    <div>
                                        {
                                            paid ?
                                                <div className="dashboard-parking-lots">
                                                    {parkingLots.map(data=>{
                                                        if(data['paid'] && data['available'] > 0){
                                                            return(
                                                                <div className="available-parking-lots">
                                                                    <p onClick={() => handleParkingTab(data['name'],data['link'],data['available'],data['lat'],data['long'])}>
                                                                        {data['name']}
                                                                    </p>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                    }
                                                </div> : <></>
                                        }
                                        {
                                            free ?
                                                <div className="dashboard-parking-lots">
                                                    {parkingLots.map(data=>{
                                                        if(data['free'] && data['available'] > 0){
                                                            return(
                                                                <div className="available-parking-lots">
                                                                    <p onClick={() => handleParkingTab(data['name'],data['link'],data['available'],data['lat'],data['long'])}>
                                                                        {data['name']}
                                                                    </p>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                    }
                                                </div> : <></>
                                        }
                                        {
                                            faculty ?
                                                <div className="dashboard-parking-lots">
                                                    {parkingLots.map(data=>{
                                                        if(data['faculty'] && data['available'] > 0){
                                                            return(
                                                                <div className="available-parking-lots">
                                                                    <p onClick={() => handleParkingTab(data['name'],data['link'],data['available'],data['lat'],data['long'])}>
                                                                        {data['name']}
                                                                    </p>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                    }
                                                </div> : <></>
                                        }
                                    </div>
                                    :
                                    <></>
                                }

                            </div>
                    }
                </div>
                <div>
                    {
                        userParked ?
                            <GoogleMaps parkingLotsMap={parkingLots} frees={false} paids={false} faculty={false} nearbyFree={""} nearbyPaid={""} nearbyFaculty={""} userParkedLotName={userParkedLot}/>
                        :

                            <GoogleMaps parkingLotsMap={parkingLots} frees={free} paids={paid} faculty={faculty} nearbyFree={nearByLotFree} nearbyPaid={nearByLotPaid} nearbyFaculty={nearByFacultyLot} userParkedLotName={""}/>
                    }

                </div>
            </div>
            { parkingTab ?
                (<div className="dashboard-parking-background">
                        <div className="dashboard-parking-box">
                            <div style={{textAlign:'right', margin:'24px', cursor:'pointer'}}>
                                <img src={closeButton} onClick={() => setParkingTab(!parkingTab)} alt={"Close Icon"}/>
                                <ParkingLotsTab name={parkingTabName} currentLat={currentPosition.lat} currentLong={currentPosition.lng} spotsLeft={parkingTabAvailableSpots} lat={parkingTabLat} long={parkingTabLong} hyperlink={parkingTabLink}/>
                            </div>
                        </div>
                    </div>)
                :
                <></>
            }
            {
                editTime ?
                    (
                        <div className="dashboard-parking-background">
                            <div className="dashboard-parking-box">
                                <div style={{textAlign:'right', margin:'24px', cursor:'pointer'}}>
                                    <img src={closeButton} onClick={() => setEditTime(!editTime)} alt={"Close Icon"}/>
                                    <EditTime name={userParkedLot} />
                                </div>
                            </div>
                        </div>
                    )
                :
                    <></>
            }
        </div>
    )
}

export default UserDashboard;
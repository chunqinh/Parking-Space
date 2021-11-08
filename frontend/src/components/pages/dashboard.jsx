import React, {useEffect, useState} from 'react'
import GoogleMaps from "../google-map-api/map";
import AvailableParkingLots from "./parking-lots-tab";


const parking = {
    "Alumni A Lot" : [43.000716, -78.780223, true],
    "Alumni B Lot" : [43.001901, -78.77871, false],
    "Alumni C Lot" : [43.001909, -78.779976, true],
    "Arena Lot" : [43.000857, -78.779418, false],
    "Baird A Lot" : [42.998558, -78.784504, true],
    "Cooke A Lot" : [42.999437, -78.793216 ,true],
    "Cooke B Lot" : [42.998715, -78.793237, false],
    "Fronczak Lot" : [43.002425, -78.791424, false],
    "Hochstetter B Lot" : [42.99859, -78.790212, false],
    "Jarvis A Lot" : [43.003721, -78.788517, false],
    "Jarvis B Lot" : [43.003972, -78.786929, true],
    "Ketter Lot" :  [43.002466, -78.788838, true],
    "Park Hall Lot" : [42.999657, -78.788688, true]
}

function UserDashboard(){
    const [available, setAvailable] = useState(true);
    const [free, setFree] = useState(false);
    const [paid, setPaid] = useState(false);
    const [markers, setMarkers] = useState("available");

    useEffect(()=>{
        getParkingLotsData();
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

    return(
        <div className="single-height-pages">
            <div className="row dashboard">
                <div style={{textAlign:'center'}}>
                    <div className="column dashboard" >
                        <h1 className="super-heading time" style={{lineHeight:'200px'}}>00:00</h1>
                        <h3 className="heading">TIME REMAINING</h3>
                        <a href={"/edit-time"} className="menu-links register" style={{borderRadius:'5px', width:'85px'}}>EDIT TIME</a>
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
                                                return (<div className="available-parking-lots">{key[0]}</div>)
                                            }
                                        })}
                                    </div>
                                    : !paid && available && free ?
                                    <div className="dashboard-parking-lots">
                                        {Object.entries(parking).map((key,value)=>{
                                            // setMarkers("free available");
                                            if (key[1][2]){
                                                return (<div className="available-parking-lots">{key[0]}</div>)
                                            }
                                        })}
                                    </div>
                                    : paid && !free && !available ?
                                        <div className="dashboard-parking-lots">
                                            {Object.entries(parking).map((key,value)=>{
                                                if (!key[1][2]){
                                                    // setMarkers("paid available");
                                                    return (<div className="available-parking-lots">{key[0]}</div>)
                                                }
                                            })}
                                        </div>
                                        : free && !paid && !available ?
                                            <div className="dashboard-parking-lots">
                                                {Object.entries(parking).map((key,value)=>{
                                                    if (key[1][2]){
                                                        // setMarkers("free available");
                                                        return (<div className="available-parking-lots">{key[0]}</div>)
                                                    }
                                                })}
                                            </div>
                                            : <div className="dashboard-parking-lots">
                                                {Object.entries(parking).map((key,value)=>{
                                                    // setMarkers("available");
                                                    return (<div className="available-parking-lots">{key[0]}</div>)

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
                            <GoogleMaps frees={true} availables={true} paids={false}/>
                        :
                        paid && !free ?
                            <GoogleMaps frees={false} availables={true} paids={true}/>
                        :
                            <GoogleMaps frees={true} availables={true} paids={true}/>
                    }

                </div>
            </div>
        </div>
    )
}

export default UserDashboard;
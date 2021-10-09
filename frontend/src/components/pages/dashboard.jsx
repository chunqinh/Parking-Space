import React from 'react'
import GoogleMap from "../google-map/map";

function UserDashboard(){

    const availableParkingLots = ["Jarvis A Lot", "Jarvis B Lot", "Slee A Lot", "Slee B Lot", "Baird B Lot", "Furnas Lot"];

    return(
        <div className="single-height-pages">
            <div className="row dashboard">
                <div>
                    <div className="column dashboard">
                        <h1 className="super-heading time" style={{lineHeight:'200px'}}>00:00</h1>
                        <h3 className="heading">TIME REMAINING</h3>
                        <a href={"/edit-time"} className="menu-links register" style={{borderRadius:'5px', width:'75px'}}>EDIT TIME</a>
                    </div>
                    <div className="column dashboard" style={{marginTop:'64px'}}>
                        <h3 className="heading">AVAILABLE PARKING LOTS</h3>
                        <div className="dashboard-parking-lots">
                            {availableParkingLots.map((value)=>{
                                return <div className="available-parking-lots">{value}</div>
                            })}
                        </div>
                    </div>
                </div>
                <GoogleMap/>
            </div>
        </div>
    )
}

export default UserDashboard;
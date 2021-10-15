import React from 'react';

function EditSchedule(){
    return(
        <div className="edit-schedule">
            <div style={{marginTop:'25px', textAlign:'center'}}>
                <h1 className="sub-heading">Edit Schedule</h1>
            </div>
            <div className="row">
                <div style={{marginLeft:'10px'}}>
                    <h4 className="Time">8:00 AM</h4>
                    <input type={"text"}/>
                    <h4 className="Time">9:00 AM</h4>
                    <input type={"text"}/>
                    <h4 className="Time">10:00 AM</h4>
                    <input type={"text"}/>
                    <h4 className="Time">11:00 AM</h4>
                    <input type={"text"}/>
                    <h4 className="Time">12:00 PM</h4>git
                    <input type={"text"}/>
                    <h4 className="Time">1:00 PM</h4>
                    <input type={"text"}/>
                    <h4 className="Time">2:00 PM</h4>
                    <input type={"text"}/>
                    <h4 className="Time">3:00 PM</h4>
                    <input type={"text"}/>
                    <h4 className="Time">4:00 PM</h4>
                    <input type={"text"}/>
                    <h4 className="Time">5:00 PM</h4>
                    <input type={"text"}/>
                    <h4 className="Time">6:00 PM</h4>
                    <input type={"text"}/>
                    <h4 className="Time">7:00 PM</h4>
                    <input type={"text"}/>
                    <h4 className="Time">8:00 PM</h4>
                    <input type={"text"}/>
                    <h4 className="Time">9:00 PM</h4>
                    <input type={"text"}/>
                    <h4 className="Time">10:00 PM</h4>
                    <input type={"text"}/>
                </div>
            </div>
            <div className="column">
                <div style={{marginTop:'10px'}}>
                    <h3 className="Week">Monday</h3>
                    <h3 className="Week">Tuesday</h3>
                    <h3 className="Week">Wednesday</h3>
                    <h3 className="Week">Thursday</h3>
                    <h3 className="Week">Friday</h3>
                </div>
            </div>
        </div>
    )
}

export default EditSchedule;
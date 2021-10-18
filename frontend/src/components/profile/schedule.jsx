import React from 'react';

function EditSchedule(){
    return(
        <div className="edit-schedule">
            <div style={{textAlign:'center'}}>
                <h1 className="sub-heading">YOUR SCHEDULE</h1>
            </div>
            <div className="row">
                <div className="schedule-column">
                    <h3 className="week">Monday</h3>
                    <div className="week-column">
                        <div className="week-column-box">
                            <h3 className="schedule-time"> 8:00 AM - 8:50 AM</h3>
                            <h2 className="schedule-location"> Knox 112 </h2>
                        </div>
                        <div className="week-column-box">
                            <h3 className="schedule-time"> 8:00 AM - 8:50 AM</h3>
                            <h2 className="schedule-location"> Knox 112 </h2>
                        </div>
                    </div>
                </div>
                <div  className="schedule-column">
                    <h3 className="week">Tuesday</h3>
                    <div className="week-column">
                        <div className="week-column-box">
                            <h3 className="schedule-time"> 08:00 AM - 08:50 AM</h3>
                            <h2 className="schedule-location"> Knox 112 </h2>
                        </div>
                        <div className="week-column-box">
                            <h3 className="schedule-time"> 10:00 AM - 10:50 AM</h3>
                            <h2 className="schedule-location"> Knox 112 </h2>
                        </div>
                        <div className="week-column-box">
                            <h3 className="schedule-time"> 01:00 PM - 01:50 PM</h3>
                            <h2 className="schedule-location"> Knox 112 </h2>
                        </div>
                        <div className="week-column-box">
                            <h3 className="schedule-time"> 04:00 PM - 04:50 PM</h3>
                            <h2 className="schedule-location"> Knox 112 </h2>
                        </div>
                    </div>
                </div>
                <div  className="schedule-column">
                    <h3 className="week">Wednesday</h3>
                    <div className="week-column">
                        <div className="week-column-box">
                            <h3 className="schedule-time"> 8:00 AM - 8:50 AM</h3>
                            <h2 className="schedule-location"> Knox 112 </h2>
                        </div>
                        <div className="week-column-box">
                            <h3 className="schedule-time"> 8:00 AM - 8:50 AM</h3>
                            <h2 className="schedule-location"> Knox 112 </h2>
                        </div>
                        <div className="week-column-box">
                            <h3 className="schedule-time"> 8:00 AM - 8:50 AM</h3>
                            <h2 className="schedule-location"> Knox 112 </h2>
                        </div>

                    </div>
                </div>
                <div  className="schedule-column">
                    <h3 className="week">Thursday</h3>
                    <div className="week-column">
                        <div className="week-column-box">
                            <h3 className="schedule-time"> 8:00 AM - 8:50 AM</h3>
                            <h2 className="schedule-location"> Knox 112 </h2>
                        </div>

                    </div>
                </div>
                <div className="schedule-column">
                    <h3 className="week">Friday</h3>
                    <div className="week-column">
                        <div className="week-column-box">
                            <h3 className="schedule-time"> 8:00 AM - 8:50 AM</h3>
                            <h2 className="schedule-location"> Knox 112 </h2>
                        </div>
                        <div className="week-column-box">
                            <h3 className="schedule-time"> 8:00 AM - 8:50 AM</h3>
                            <h2 className="schedule-location"> Knox 112 </h2>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditSchedule;
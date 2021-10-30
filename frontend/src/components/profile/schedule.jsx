import React, {useState} from 'react';
import closeButton from '../icons/close_black_24dp.svg'

const sample_schedule = {
    "Monday": [["8:00 AM - 8:50 AM","Knox 112"],["9:00 AM - 9:50 AM", "Baldy 101"]],
    "Tuesday": [["8:00 AM - 8:50 AM","Knox 112"],["9:00 AM - 9:50 AM", "Baldy 101"], ["10:00 AM - 10:50 AM","NSC 215"]],
    "Wednesday": [["8:00 AM - 8:50 AM","Knox 112"]],
    "Thursday": [["8:00 AM - 8:50 AM","Knox 112"],["9:00 AM - 9:50 AM", "Baldy 101"], ["10:00 AM - 10:50 AM", "NSC 215"], ["11:00 AM - 11:50 AM","Cooke 112"]],
    "Friday": [["8:00 AM - 8:50 AM","Knox 112"],["9:00 AM - 9:50 AM", "Baldy 101"]]
}

function EditSchedule(){
    const [classTime, setClassTime] = useState("");
    const [classLocation, setLocationTime] = useState("");
    const [schedulePanel, setSchedulePanel] = useState(false);
    const showSchedulePanel = () => setSchedulePanel(!schedulePanel)

    function handleClick(time,location){
        setSchedulePanel(!schedulePanel);
        setClassTime(time);
        setLocationTime(location);
        return 0;
    }

    return(
        <div className="edit-schedule">
            <div className="row">
                {Object.entries(sample_schedule).map((value, index, array)=>{
                    return (
                        <div className="schedule-column">
                            <h3 className="week">{value[0]}</h3>
                            <div className="week-column">
                                {value[1].map((data)=>{
                                    return(
                                        <div className="week-column-box" onClick={() => handleClick(data[0],data[1])}>
                                            <h3 className="schedule-time">{data[0]}</h3>
                                            <h2 className="schedule-location"> {data[1]} </h2>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                )})}
            </div>

            {schedulePanel
                ?
                <div className="edit-schedule-background">
                    <div className="edit-schedule-box">
                        <div style={{textAlign:'right', margin:'24px', cursor:'pointer'}}>
                            <img src={closeButton} onClick={showSchedulePanel}/>
                            <form className="edit-schedule-form">
                                <div>
                                    <h6 className="labels profile" style={{padding:'0'}}>TIMESTAMP:</h6>
                                    <div>
                                        <input type={"text"} value={classTime}/></div>
                                </div>
                                <div>
                                    <h6 className="labels profile" style={{padding:'0'}}>LOCATION:</h6>
                                    <div>
                                        <input type={"text"} value={classLocation}/>
                                    </div>
                                </div>
                                <button type={"submit"} className="login-button profile"> SAVE CHANGES</button>
                            </form>
                        </div>
                    </div>
                </div>
                :
                <div/>
            }
        </div>
    )
}

export default EditSchedule;
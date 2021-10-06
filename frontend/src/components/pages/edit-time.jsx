import React, {useState} from "react";

function EditTime(){

    let [minuteOnes, setMinuteOnes] = useState(0);
    let [minuteTens, setMinuteTens] = useState(0);
    let [hoursOnes, setHourOnes] = useState(0);
    let [hoursTens, setHourTens] = useState(0);

    let hours = 12;

   const addMin = () => {
        if (minuteOnes < 9){
            setMinuteOnes(minuteOnes += 1);
        }
        else if(minuteOnes === 9 && minuteTens !== 5){
            setMinuteOnes(minuteOnes = 0);
            setMinuteTens(minuteTens += 1);
        }
        else if(minuteOnes === 9 && minuteTens === 5){
            setMinuteOnes(minuteOnes = 0);
            setMinuteTens(minuteTens = 0);
            addHours();
        }
    }

    const addHours = () => {
        if (hoursOnes === 2 && hoursTens === 1){
            setHourOnes(hoursOnes=1);
            setHourTens(hoursTens=0);
        }
        else if (hoursOnes < 9){
            setHourOnes(hoursOnes+=1);
        }
        else if(hoursOnes === 9){
            setHourOnes(hoursOnes=0);
            setHourTens(hoursTens+=1);
        }
    }

    return(
        <div className="single-height-pages">
            <div className="edit-time">
                <div style={{marginTop:'50px', textAlign:'center'}}>
                    <h1 className="sub-heading">EDIT TIME</h1>
                </div>
                <div className="row between">
                    <button className="edit-time-buttons"> ADD 30 MINUTES </button>
                    <button className="edit-time-buttons"> ADD 1 HOUR </button>
                    <button className="edit-time-buttons"> ADD 2 HOURS </button>
                </div>
                <div className="row" style={{marginTop:'48px'}}>
                    <div style={{display:'flex',flexDirection:'column', alignItems:'center', marginRight:'24px'}}>
                        <button className="edit-time-buttons add" onClick={addHours}> + </button>
                        <h1 className="super-heading time">{hoursTens} {hoursOnes} :</h1>
                        <button className="edit-time-buttons add"> - </button>
                    </div>

                    <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
                        <button className="edit-time-buttons add" onClick={addMin}> + </button>
                        <h1 className="super-heading time">{minuteTens} {minuteOnes}</h1>
                        <button className="edit-time-buttons add"> - </button>
                    </div>
                </div>
            </div>

        </div>
          
    )

}
export default EditTime;
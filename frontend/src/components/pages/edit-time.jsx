import React, {useState} from "react";


import { useEffect } from 'react';



function EditTime(){

    let [minuteOnes, setMinuteOnes] = useState(9);
    let [minuteTens, setMinuteTens] = useState(5);
    let [hoursOnes, setHourOnes] = useState(2);
    let [hoursTens, setHourTens] = useState(1);

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

    const subtractHours = () => {
       if( hoursOnes === 0 && hoursTens === 1){
           setHourOnes(hoursOnes = 9);
           setHourTens(hoursTens = 0);
       }
       else if(hoursOnes > 0){
           setHourOnes(hoursOnes-=1);
       }
    }

    const subtractMinutes = () => {
       if( minuteOnes === 0 && minuteTens !== 0){
           setMinuteOnes(minuteOnes = 9);
           setMinuteTens( minuteTens -= 1);
       }
       else if(minuteOnes >= 1){
           setMinuteOnes(minuteOnes-=1);
       }
    }

    const startTimer = () => {
      const interval = setInterval(() => {
        setMinuteOnes(minuteOnes-=1);
        if (minuteOnes < 0){
          console.log("WHAAAA")
          // clearInterval(interval);
          setMinuteOnes(Math.abs(minuteOnes = 59));
          setHourOnes(hoursOnes-=1)
          // setMinuteTens(minuteTens-=1);
        }

      }, 1000);
    }

    const defaultRemainingTime = {
      seconds: '00',
      minutes: '00',
      hours: '00',
      days: '00'
    }

    // const Countdowntimer = ({countdownTimestampMs}) => {
    //   const [remainingTime, setRemainingTime] = useState(defaultRemainingTime)
    //
    //   useEffect(() => {
    //     const intervalId =setInterval(() => {
    //         updateRemainingTime({countdownTimestampMs});
    //     }, 1000 );
    //     return () => clearInterval(intervalId);
    //   },[{countdownTimestampMs}])
    //   function updateRemainingTime(countdown){
    //     console.log("Hello World")
    //   }
    //
    // }






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
                <div className="row" style={{marginTop:'24px', width:'800px', alignItems:'center'}}>
                    <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
                        <button className="edit-time-buttons add" onClick={addHours}> + </button>
                        <h1 className="super-heading time">{hoursTens} {hoursOnes} </h1>
                        <button className="edit-time-buttons add" onClick={subtractHours}> - </button>
                        <button className="edit-time-buttons add" onClick={startTimer}> Start Timer </button>

                    </div>
                    <div>
                        <h1 className="super-heading time" style={{transform:'translateY(-30px)'}}>:</h1>
                    </div>
                    <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
                        <button className="edit-time-buttons add" onClick={addMin}> + </button>
                        <h1 className="super-heading time">{minuteTens} {minuteOnes}</h1>
                        <button className="edit-time-buttons add" onClick={subtractMinutes}> - </button>
                    </div>
                </div>
            </div>



        </div>

    )

}
export default EditTime;

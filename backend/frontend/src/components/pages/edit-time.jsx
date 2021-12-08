import React, {useRef, useState} from "react";
import {auth} from "../../firebase";
import axios from "axios";

function EditTime({name}:{name:string}){

    const [loading, setLoading] =  useState(false);
    const[error, setError] =  useState('');

    const endTimeRef = useRef();

    function handleSubmit(e) {
        e.preventDefault()
        try{
            setLoading(true);
            const today = new Date();
            const currentTime = today.toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit', hour12: false})
            const parkingData = {
                parkingLotName : name,
                startTime: currentTime,
                endTime : endTimeRef.current.value
            }
            auth.currentUser.getIdToken(true).then((idToken)=>{
                axios.post("https://parking-space-442.herokuapp.com/user-edit-time",parkingData,{
                    headers:{
                        Authorization: idToken
                    }
                })
                    .then( res => {
                        console.log(res);
                        console.log(res.data);

                    });
                // console.log(links);
                // window.open(links,'_blank')
                setTimeout(function () { window.location.reload(); }, 5)
            })

        }catch{
            setLoading(false);
            return setError("Something wasn't right")
        }
    }

    return(
        <form className="edit-schedule-form" onSubmit={handleSubmit}>
            <div>
                <h1 className="labels" style={{padding:'24px'}}>{name}</h1>
            </div>
            <div>
                <h6 className="labels profile" style={{paddingTop:'24px'}}>ADDED TIME:</h6>
                <div>
                    <input type={"time"} ref={endTimeRef} max={"23:59"} min={new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false})}/>
                </div>
            </div>
            <button disabled={loading} type={"submit"} className="login-button profile" style={{marginTop:'24px'}} > ADD TIME </button>
        </form>
    )
}
export default EditTime;
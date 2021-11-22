import React, {useRef, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {auth} from "../../firebase";

function PersonalInfoForm(){
    const {currentUser} = useAuth()
    const[loading, setLoading] =  useState(false);
    const[error, setError] =  useState('');
    const history = useHistory();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const phoneNumberRef = useRef();

    function handleSubmit(e) {
        e.preventDefault()
        try{
            setLoading(true);
            const userData = {
                email : currentUser.email,
                firstName : firstNameRef.current.value,
                lastName : lastNameRef.current.value,
                phoneNumber : phoneNumberRef.current.value,
            }
            auth.currentUser.getIdToken(true).then((idToken)=>{
                axios.post("https://parking-space-442.herokuapp.com/personal-info",userData,{
                    headers:{
                        Authorization: idToken
                    }
                })
                    .then( res => {
                        console.log(res);
                        console.log(res.data);

                    });
                history.push('/dashboard');
            })

        }catch{
            setLoading(false);
            return setError("Something wasn't right")
        }
    }

    console.log(auth.currentUser.getIdToken(true))

    return(
        <form className="profile-user-details" onSubmit={handleSubmit} >
            <div>
                <h6 className="labels">FIRST NAME:</h6>
                <input type={"text"} name={"first-name"} ref={firstNameRef}/>
            </div>
            <div>
                <h6 className="labels">LAST NAME:</h6>
                <input type={"text"} name={"last-name"} ref={lastNameRef}/>
            </div>
            <div>
                <h6 className="labels">PHONE NUMBER:</h6>
                <input type={"text"} name={"phone"} ref={phoneNumberRef}/>
            </div>
            <div style={{textAlign:'center'}}>
                {error && <h6 className="error">{error}</h6>}
            </div>
            <div style={{display:'flex',flexDirection:'column', marginTop:'12px', alignItems:'center'}}>
                <button disabled={loading} type={"submit"} className="login-button"> SUBMIT </button>
            </div>
        </form>
    )
}

export default PersonalInfoForm;
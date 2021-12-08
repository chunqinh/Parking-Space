import React, {useEffect, useRef, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import axios from 'axios';
import {auth} from "../../firebase";
import {useHistory} from "react-router-dom";

function AccountDetails(){
    const {currentUser} = useAuth();
    const [loading, setLoading] =  useState(false);
    const [firstname,setFirstName] = useState("");
    const [lastname,setLastName] = useState("");
    const [phone,setPhone] = useState("");
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const phonenumberRef = useRef();
    const[error, setError] =  useState('');
    const[success, setSuccess] = useState('');

    useEffect(() =>{
        getUserData();
    })

    function getUserData(){
        auth.currentUser.getIdToken(true).then(function(idToken) {
            // Send token to your backend via HTTPS
            axios.get("http://localhost:8081/current-user-details", {
                headers:{
                    Authorization : idToken
                }})
                .then(details=>details.data).then( userData =>{
                    for (let details in userData[0]){
                        if(details === "firstname"){
                            setFirstName(userData[0][details])
                        }
                        else if(details === "lastname"){
                            setLastName(userData[0][details])
                        }
                        else if(details === "phonenumber"){
                            setPhone(userData[0][details])
                        }
                    }
            })
        }).catch(function(error) {
            // Handle error
        });
    }

    function handleUserDetailSubmit(e){
        e.preventDefault()
        try{
            setLoading(true);
            const userData = {
                firstName : firstnameRef.current.value === '' ? firstname : firstnameRef.current.value,
                lastName : lastnameRef.current.value === '' ? lastname : lastnameRef.current.value,
                phoneNumber : phonenumberRef.current.value === '' ? phone : phonenumberRef.current.value
            }
            auth.currentUser.getIdToken(true).then((idToken)=>{
                axios.post("http://localhost:8081/personal-info-update",userData,{
                    headers:{
                        Authorization: idToken
                    }
                })
                    .then( res => {
                        console.log(res);
                        console.log(res.data);

                    });
                setTimeout(function () { window.location.reload(); }, 5)
                setSuccess("Form Updated Successfully");
            })

        }catch{
            setLoading(false);
            return setError("Something wasn't right")
        }
    }

    return(
        <div>
            <h2 className="heading">ACCOUNT OVERVIEW</h2>
            <form className="profile-user-details" style={{marginTop:'32px'}} onSubmit={handleUserDetailSubmit}>
                <div className="row">
                    <div style={{marginRight:'32px'}}>
                        <h6 className="labels profile">FIRST NAME:</h6>
                        <input type={"text"} placeholder={firstname} ref={firstnameRef} />
                    </div>
                    <div>
                        <h6 className="labels profile">LAST NAME:</h6>
                        <input type={"text"} placeholder={lastname} ref={lastnameRef}/>
                    </div>
                </div>

                <div className="row" style={{marginTop:'48px'}}>
                    <div style={{marginRight:'32px'}}>
                        <h6 className="labels profile">EMAIL ID:</h6>
                        <input type={"email"} value={currentUser.email} disabled={true}/>
                    </div>
                    <div>
                        <h6 className="labels profile">PHONE NUMBER:</h6>
                        <input type={"text"} placeholder={phone} ref={phonenumberRef}/>
                    </div>
                </div>
                <div style={{marginTop:'48px', textAlign:'right'}}>
                    <button disabled={loading} type={"submit"}  className="login-button profile">SAVE CHANGES</button>
                </div>
            </form>
            <div style={{textAlign:'center'}}>
                {error && <h6 className="error">{error}</h6>}
                {success && <h6 className="error">{success}</h6>}
            </div>
        </div>
    )
}

export default AccountDetails;
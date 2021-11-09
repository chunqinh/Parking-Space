import React, {useEffect, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import axios from 'axios';

function AccountDetails(){
    const {currentUser} = useAuth();
    const [firstname,setFirstName] = useState("");
    const [lastname,setLastName] = useState("");
    const [phone,setPhone] = useState("");

    useEffect(()=>{
        getUserData();
    });
    // useEffect(()=>{
    //     sendCurrentUser()
    // })
    // function sendCurrentUser(){
    //     const user = { email: currentUser.email }
    //     axios.post('http://localhost:5000/current-user',user).then(()=> console.log("User Sent"))
    // }

    function getUserData(){
        fetch('/user-profile')
            .then(res => res.json())
            .then(userData => {
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
    }
     return(
        <div>
            <h2 className="heading">ACCOUNT OVERVIEW</h2>
            <form className="profile-user-details" style={{marginTop:'32px'}}>
                <div className="row">
                    <div style={{marginRight:'32px'}}>
                        <h6 className="labels profile">FIRST NAME:</h6>
                        <input type={"text"} value={firstname}/>
                    </div>
                    <div>
                        <h6 className="labels profile">LAST NAME:</h6>
                        <input type={"text"} value={lastname}/>
                    </div>
                </div>

                <div className="row" style={{marginTop:'48px'}}>
                    <div style={{marginRight:'32px'}}>
                        <h6 className="labels profile">EMAIL ID:</h6>
                        <input type={"email"} value={currentUser.email} disabled={true}/>
                    </div>
                    <div>
                        <h6 className="labels profile">PHONE NUMBER:</h6>
                        <input type={"text"} value={phone}/>
                    </div>
                </div>
                <div style={{marginTop:'48px', textAlign:'right'}}>
                    <button type={"submit"} className="login-button profile">SAVE CHANGES</button>
                </div>
            </form>
        </div>
    )
}

export default AccountDetails;
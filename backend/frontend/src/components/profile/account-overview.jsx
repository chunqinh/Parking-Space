import React, {useEffect, useState} from 'react';
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
    const[error, setError] =  useState('');
    const history = useHistory();


    useEffect(() =>{
        getUserData();
    })

    function getUserData(){
        auth.currentUser.getIdToken(true).then(function(idToken) {
            // Send token to your backend via HTTPS
            axios.get("https://parking-space-442.herokuapp.com/current-user-details", {
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
                firstName : firstname,
                lastName : lastname,
                phoneNumber : phone,
            }
            auth.currentUser.getIdToken(true).then((idToken)=>{
                axios.post("https://parking-space-442.herokuapp.com/personal-info-update",userData,{
                    headers:{
                        Authorization: idToken
                    }
                })
                    .then( res => {
                        console.log(res);
                        console.log(res.data);

                    });
                history.push('/user-profile');
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
                        <input type={"text"} value={firstname} onChange={(e) => {setFirstName(e.target.value)}}/>
                    </div>
                    <div>
                        <h6 className="labels profile">LAST NAME:</h6>
                        <input type={"text"} value={lastname} onChange={(e)=>{setLastName(e.target.value)}}/>
                    </div>
                </div>

                <div className="row" style={{marginTop:'48px'}}>
                    <div style={{marginRight:'32px'}}>
                        <h6 className="labels profile">EMAIL ID:</h6>
                        <input type={"email"} value={currentUser.email} disabled={true}/>
                    </div>
                    <div>
                        <h6 className="labels profile">PHONE NUMBER:</h6>
                        <input type={"text"} value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
                    </div>
                </div>
                <div style={{marginTop:'48px', textAlign:'right'}}>
                    <button disabled={loading} type={"submit"}  className="login-button profile">SAVE CHANGES</button>
                </div>
            </form>
        </div>
    )
}

export default AccountDetails;
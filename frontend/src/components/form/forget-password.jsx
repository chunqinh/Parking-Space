import React, {useRef, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {waitFor} from "@testing-library/react";
import {useHistory} from "react-router-dom";

function ForgetPassword({inProfile}:{inProfile: Boolean}){

    const usernameRef = useRef();
    const {resetPassword , logout} = useAuth();
    const[error, setError] =  useState('');
    const[message, setMessage] =  useState('');
    const[loading, setLoading] =  useState(false);
    const history = useHistory();
    const delay = ms => new Promise(res => setTimeout(res, ms));



    async function handleSubmit(e) {
        e.preventDefault()
        console.log(usernameRef.current.valueOf());

        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(usernameRef.current.value)
            setMessage("Check your inbox for further instructions");
            if (inProfile){
                await delay(5000);
                await logout();
                history.push('/sign-in')
            }
        } catch{
            setLoading(false);
            return setError("Failed to reset password.")
        }

    }


    return(
        <form className="login-form" onSubmit={handleSubmit} >
            <div>
                <h6 className="labels">EMAIL ID:</h6>
                <input type={"email"} name={"email"} ref={usernameRef}/>
            </div>
            <div style={{textAlign:'center'}}>
                {error && <h6 className="error">{error}</h6>}
            </div>
            <div style={{textAlign:'center'}}>
                {message && <h6 className="error">{message}</h6>}
            </div>
            <div style={{display:'flex',flexDirection:'column', marginTop:'12px', alignItems:'center'}}>
                <button disabled={loading} type={"submit"} className={ inProfile === false ? "login-button" : "login-button profile"}> RESET PASSWORD </button>
                {
                    inProfile === false ?
                        <div>
                            <a href={"/sign-in"} className="links"> Login to your account. </a>
                            <a href={"/sign-up"} className="links" style={{marginLeft:'18px'}}> Don't have an account? </a>
                        </div>
                    :
                        <div/>
                }

            </div>
        </form>
    )
}
export default ForgetPassword;
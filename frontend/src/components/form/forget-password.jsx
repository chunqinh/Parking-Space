import React, {useRef, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";

function ForgetPassword(){

    const usernameRef = useRef();
    const {resetPassword} = useAuth();
    const[error, setError] =  useState('');
    const[message, setMessage] =  useState('');
    const[loading, setLoading] =  useState(false);



    async function handleSubmit(e) {
        e.preventDefault()
        console.log(usernameRef.current.valueOf());

        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(usernameRef.current.value)
            setMessage("Check your inbox for further instructions");
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
                <button disabled={loading} type={"submit"} className="login-button"> RESET PASSWORD </button>
                <div>
                    <a href={"/sign-in"} className="links"> Login to your account. </a>
                    <a href={"/sign-up"} className="links" style={{marginLeft:'18px'}}> Don't have an account? </a>
                </div>

            </div>
        </form>
    )
}
export default ForgetPassword;
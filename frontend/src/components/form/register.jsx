import React from "react";

function RegisterForm(){
    return(
        <form className="login-form">
            <div>
                <h6 className="labels">USERNAME:</h6>
                <input type={"text"}/>
            </div>
            <div>
                <h6 className="labels">PASSWORD:</h6>
                <input type={"password"}/>
            </div>
            <div>
                <h6 className="labels">CONFIRM PASSWORD:</h6>
                <input type={"password"}/>
            </div>
            <div style={{display:'flex',flexDirection:'column', marginTop:'24px', alignItems:'center'}}>
                <button type={"submit"} className="login-button" style={{background:'#232424'}}> REGISTER </button>
            </div>
        </form>
    )
}

export default RegisterForm;
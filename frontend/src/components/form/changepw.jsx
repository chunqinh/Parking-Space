import React from "react";

function ChangePassward(){
    return(
        <form className="edit-time">
            <div style={{display:'flex',flexDirection:'column', marginTop:'50px', alignItems:'center'}}>
                <h1 className="labels">CHANGE PASSWARD</h1>
                
            </div>
            <div style={{display:'flex',flexDirection:'column', marginBottom:'50px',alignItems:'center'}}>
                <h6 className="labels">New Passward:</h6>
                <input type={"text"}/>
            </div>
            <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
                <h3 className="labels">Confirm New Passward:</h3>
                <input type={"text"}/>
            </div>
            <div style={{display:'flex',flexDirection:'column', marginTop:'24px', alignItems:'center'}}>
                <button type={"submit"} className="login-button"> SUBMIT </button>
            </div>
            </form>

    )
}
export default ChangePassward;
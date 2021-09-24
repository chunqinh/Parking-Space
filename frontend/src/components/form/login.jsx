import React from 'react'

function LoginForm(){
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
            <div style={{display:'flex',flexDirection:'column', marginTop:'24px', alignItems:'center'}}>
                <button type={"submit"} className="login-button"> LOGIN </button>
                <a className="links"> Forget your password? </a>
            </div>
        </form>
    )
}

export default LoginForm;
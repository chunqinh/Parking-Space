import React from 'react'

function LoginForm(){
    return(
        <form className="login-form">
            <div>
                <h6>USERNAME:</h6>
                <input type={"text"}/>
            </div>
            <div>
                <h6>PASSWORD:</h6>
                <input type={"password"}/>
            </div>
            <div>
                <button type={"submit"}> LOGIN </button>
                <a> Forget your password? </a>
            </div>
        </form>
    )
}

export default LoginForm;
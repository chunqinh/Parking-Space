import React from 'react';
// import IconButton from "@material-ui/core/IconButton";
// import InputLabel from "@material-ui/core/InputLabel";
// import Visibility from "@material-ui/icons/Visibility";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import Input from "@material-ui/core/Input";

let showPassword = false;
function handleShowPassword(){
    showPassword = !showPassword;
}
function LoginForm(){


    return(
        <form className="login-form">
            <div>
                <h6 className="labels">USERNAME:</h6>
                <input type={"text"}/>
            </div>
            <div>
                <h6 className="labels">PASSWORD:</h6>
                <input type={showPassword ? "text":"password"}/>
            </div>
            <div style={{display:'flex',flexDirection:'column', marginTop:'24px', alignItems:'center'}}>
                <button type={"submit"} className="login-button"> LOGIN </button>
                <a className="links"> Forget your password? </a>
            </div>
        </form>
    )
}

export default LoginForm;
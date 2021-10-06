import React, {useState} from 'react';
import hide from '../icons/visibility_off_black_24dp.svg'
import show from '../icons/visibility_black_24dp.svg'

function LoginForm(){

    const [password, setPassword] = useState(false);
    const showPassword = () => setPassword(!password);
    return(
        <form className="login-form">
            <div>
                <h6 className="labels">USERNAME:</h6>
                <input type={"text"}/>
            </div>
            <div>
                <h6 className="labels">PASSWORD:</h6>
                <div>
                    <input type={password ? "text":"password"}/>
                    {password ? <img src={hide} className="password-hide-show" onClick={showPassword}/> : <img src={show} className="password-hide-show" onClick={showPassword}/>}
                </div>
            </div>
            <div style={{display:'flex',flexDirection:'column', marginTop:'24px', alignItems:'center'}}>
                <button type={"submit"} className="login-button"> LOGIN </button>
                <a href={"/change-pw"} className="links"> Forget your password? </a>
            </div>
        </form>
    )
}

export default LoginForm;
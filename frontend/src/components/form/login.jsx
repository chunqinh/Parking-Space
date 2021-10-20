import React, {useRef, useState} from 'react';
import hide from '../icons/visibility_off_black_24dp.svg';
import show from '../icons/visibility_black_24dp.svg';
import {useAuth} from "../../context/AuthContext";
import {Link, useHistory} from "react-router-dom";


function LoginForm(){
    const [password, setPassword] = useState(false);
    const showPassword = () => setPassword(!password);

    const usernameRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const[error, setError] =  useState('');
    const[loading, setLoading] =  useState(false);
    const history = useHistory();



    async function handleSubmit(e) {
        e.preventDefault()
        console.log(usernameRef.current.valueOf());

        try {
            setError("");
            setLoading(true);
            await login(usernameRef.current.value, passwordRef.current.value)
            history.push('/dashboard')
        } catch{
            setError("Failed to login")
        }

    }


    return(
        <form className="login-form" onSubmit={handleSubmit} >
            <div>
                <h6 className="labels">EMAIL ID:</h6>
                <input type={"email"} name={"email"} ref={usernameRef}/>
            </div>
            <div>
                <h6 className="labels">PASSWORD:</h6>
                <div>
                    <input type={password ? "text":"password"} name={"password"} ref={passwordRef}/>
                    {password ? <img src={hide} className="password-hide-show" onClick={showPassword}/> : <img src={show} className="password-hide-show" onClick={showPassword}/>}
                </div>
            </div>
            <div style={{textAlign:'center'}}>
                {error && <h6 className="error">{error}</h6>}
            </div>
            <div style={{display:'flex',flexDirection:'column', marginTop:'12px', alignItems:'center'}}>
                <button disabled={loading} type={"submit"} className="login-button"> LOGIN </button>
                <div>
                    <a href={"/change-pw"} className="links"> Forget your password? </a>
                    <a href={"/sign-up"} className="links" style={{marginLeft:'18px'}}> Don't have an account? </a>
                </div>

            </div>
        </form>
    )
}





export default LoginForm;
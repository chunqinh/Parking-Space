import React from 'react';
import blob from '../icons/login-blob.svg';



import LoginForm from "../form/login";


function Login(){

    return(
        <div>
            <div className="single-height-pages">
                <div className="login">
                    <div>
                        <LoginForm/>
                    </div>
                    <div className="single-height-blob">
                        <div style={{width:'400px', textAlign:'right'}}>
                            <h1 className="super-heading">TROUBLE FINDING A SPOT?</h1>
                        </div>
                    </div>
                    <div className="absolute-blob">
                        <img src={blob}/>
                    </div>
                    <div className="absolute-blob2">
                        <img src={blob}/>
                    </div>
                    <div className="absolute-blob3">
                        <img src={blob}/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;
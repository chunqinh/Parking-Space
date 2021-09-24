import React from 'react'
import RegisterForm from "../form/register";

function Register(){
    return(
        <div>
            <div className="single-height-pages">
                <div className="login">
                    <div>
                        <RegisterForm/>
                    </div>
                    <div className="single-height-blob">
                        <div style={{width:'450px', textAlign:'right'}}>
                            <h1 className="super-heading">JOIN AND PARK EASIER.</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
import React, {useRef, useState} from "react";
import blob from "../icons/login-blob.svg";
import ForgetPassword from "../form/forget-password";

function ChangePassword(){

    return(
        <div>
            <div className="single-height-pages">
                <div className="login">
                    <div>
                        <ForgetPassword inProfile={false}/>
                    </div>
                    <div className="single-height-blob">
                        <div style={{width:'450px', textAlign:'right'}}>
                            <h1 className="super-heading">RESET YOUR PASSWORD.</h1>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default ChangePassword;
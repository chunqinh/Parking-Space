import React, {useState} from 'react';
import ForgetPassword from "../form/forget-password";

function ProfilePasswordChange(){
    return(
        <div>
            <div>
                <ForgetPassword inProfile={true}/>
            </div>
        </div>
    )
}

export default  ProfilePasswordChange;
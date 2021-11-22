import React from 'react';
import PersonalInfoForm from "../form/personal-info-form";
import blob from "../icons/login-blob.svg";

function PersonalInfo(){
    return(
        <div>
            <div className="single-height-pages">
                <div className="login">
                    <div>
                        <PersonalInfoForm/>
                    </div>
                    <div className="single-height-blob">
                        <div style={{width:'400px', textAlign:'right'}}>
                            <h1 className="super-heading">FILL IN THE DETAILS.</h1>
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

export default PersonalInfo;
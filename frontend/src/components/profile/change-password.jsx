import React, {useState} from 'react';
import hide from "../icons/visibility_off_black_24dp.svg";
import show from "../icons/visibility_black_24dp.svg";

function ProfilePasswordChange(){
    return(
        <div>
            <div>
                <h2 className="heading">CHANGE PASSWORD</h2>
                <form className="profile-user-details">
                    <div className="row" style={{marginTop:'48px'}}>
                        <div>
                            <h6 className="labels profile">NEW PASSWORD:</h6>
                            <div>
                                <input type={"password"}/></div>
                        </div>
                        <div style={{marginLeft:'48px'}}>
                            <h6 className="labels profile">OLD PASSWORD:</h6>
                            <div>
                                <input type={"password"}/>
                            </div>
                        </div>
                    </div>
                    <div style={{textAlign:'center',marginTop:'32px'}}>
                        <button type={"submit"} className="login-button profile">UPDATE PASSWORD</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default  ProfilePasswordChange;
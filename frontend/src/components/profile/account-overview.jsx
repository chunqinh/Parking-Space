import React from 'react';
import {useAuth} from "../../context/AuthContext";

function AccountDetails(){
    const {currentUser} = useAuth();
    return(
        <div>
            <h2 className="heading">ACCOUNT OVERVIEW</h2>
            <form className="profile-user-details" style={{marginTop:'32px'}}>
                <div className="row">
                    <div style={{marginRight:'32px'}}>
                        <h6 className="labels profile">FIRST NAME:</h6>
                        <input type={"text"}/>
                    </div>
                    <div>
                        <h6 className="labels profile">LAST NAME:</h6>
                        <input type={"text"}/>
                    </div>
                </div>

                <div className="row" style={{marginTop:'48px'}}>
                    <div style={{marginRight:'32px'}}>
                        <h6 className="labels profile">EMAIL ID:</h6>
                        <input type={"email"} value={currentUser.email} disabled={true}/>
                    </div>
                    <div>
                        <h6 className="labels profile">PHONE NUMBER:</h6>
                        <input type={"text"}/>
                    </div>
                </div>
                <div style={{marginTop:'48px', textAlign:'right'}}>
                    <button type={"submit"} className="login-button profile">SAVE CHANGES</button>
                </div>
            </form>
        </div>
    )
}

export default AccountDetails;
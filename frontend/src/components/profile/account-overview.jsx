import React from 'react';

function AccountDetails(){
    return(
        <div>
            <form className="profile-user-details">
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
                        <input type={"text"}/>
                    </div>
                    <div>
                        <h6 className="labels profile">PHONE NUMBER:</h6>
                        <input type={"text"}/>
                    </div>
                </div>
                <div style={{marginTop:'48px', textAlign:'center'}}>
                    <button type={"submit"} className="login-button profile">SAVE CHANGES</button>
                </div>
            </form>
        </div>
    )
}

export default AccountDetails;
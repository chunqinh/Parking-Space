import React from 'react';
import car from '../icons/landing-page.svg'
import {Link} from "react-router-dom";

function LandingPage(){
    return(
        <div className="single-height-pages">
            <div className="row" style={{flexWrap:'nowrap', alignItems:'center'}}>
                <div>
                    <img src={car} alt={"Undraw.co Car Illustration"} width={"700px"}/>
                </div>
                <div className="column" style={{marginLeft:'48px'}}>
                    <h1 className="super-heading" style={{textAlign:'right', lineHeight:'110px'}}>PARKING ON US!</h1>
                    <h6 className="body landing"> A web app to solve the issue of finding parking spots for students and faculty. Sign up
                        and answer few questions and forget about all the hassle in finding a spot on University at Buffalo,
                        North Campus.
                    </h6>
                    <div style={{textAlign:'right', marginTop:'28px'}}>
                        <Link to="/sign-up" className="register">BECOME A MEMBER</Link>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default LandingPage;

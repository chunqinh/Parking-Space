import React from 'react'
import {Link} from "react-router-dom";
import {useState} from 'react';

import mobileMenu from '../icons/menu_black_24dp.svg'
import closeMenu from '../icons/close_black_24dp.svg'



function Navigation(){

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar)

    return(
        <div>
            <div><h3>PARKAPP</h3></div>
            <div className="menu">
                <Link to="/" className="page-links">Home</Link>
                <Link to="/sign-in" className="page-links">LOGIN</Link>
                <Link to="/sign-up" className="page-links">SIGN UP</Link>
            </div>
            <div className="hamburger">
                <img className="hamburger-icon" src={sidebar ? closeMenu : mobileMenu} onClick={showSidebar} />
                <div className={sidebar ?  "hamburger-menu active" : "hamburger-menu"} onClick={showSidebar}>
                    <Link to="/" className="page-links">Home</Link>
                    <Link to="/sign-in" className="page-links">LOGIN</Link>
                    <Link to="/sign-up" className="page-links">SIGN UP</Link>
                </div>
            </div>
        </div>
    )
}

export default Navigation;
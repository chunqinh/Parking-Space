import React from 'react'
import {Link} from "react-router-dom";
import {useState} from 'react';

import mobileMenu from '../icons/menu_black_24dp.svg'
import closeMenu from '../icons/close_black_24dp.svg'



function Navigation(){

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar)

    return(
        <div className="menu-main-div">
            <div className="logo">
                <h3 className="heading">PARKAPP</h3>
            </div>
            <div className="menu">
                <Link to="/" className="menu-links">Home</Link>
                <Link to="/sign-in" className="menu-links">LOGIN</Link>
                <Link to="/sign-up" className="menu-links">SIGN UP</Link>
            </div>
            <div className="mobile">
                <img className="mobile-icon" src={sidebar ? closeMenu : mobileMenu} onClick={showSidebar} />
                <div className={sidebar ?  "mobile-menu active" : "mobile-menu"} onClick={showSidebar}>
                    <Link to="/" className="mobile-links">Home</Link>
                    <Link to="/sign-in" className="mobile-links">LOGIN</Link>
                    <Link to="/sign-up" className="mobile-links">SIGN UP</Link>
                </div>
            </div>
        </div>
    )
}

export default Navigation;
import React from 'react'
import {Link, useHistory} from "react-router-dom";
import {useState} from 'react';
import {useAuth} from "../../context/AuthContext";

import mobileMenu from '../icons/menu_black_24dp.svg'
import closeMenu from '../icons/close_black_24dp.svg'
import homeIcon from '../icons/home_black_24dp.svg'
import userIcon from '../icons/user_icon.svg'
import logoutIcon from '../icons/logout.svg'


function Navigation(){
    const [error, setError] = useState("");
    const {currentUser, logout} = useAuth();
    const history = useHistory();

    async function handleLogout(){
        await logout();
        history.push('/')
    }

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar)

    return(
        <div className="menu-main-div">
            <div className="logo">
                <h3 className="heading">PARKAPP</h3>
                {currentUser !== null && <a href={"/dashboard"} style={{marginLeft:'24px', color:'black'}}>DASHBOARD</a>}
            </div>
            <div className="menu">
                {currentUser === null && <Link to="/" style={{display:'flex', alignItems:'center', marginRight:'16px'}}><img src={homeIcon} width={"30px"}/></Link>}
                {currentUser !== null && <h4 style={{paddingRight:'8px'}}>{currentUser.email}</h4>}
                {currentUser === null && <Link to="/sign-in" className="menu-links">LOGIN</Link>}
                {currentUser !== null && <Link to="/user-profile"><div className="profile-button"><img src={userIcon}/></div></Link>}
                {currentUser !== null && <button style={{outline:'none', marginLeft:'8px', border:'none', cursor:'pointer', background:'#EEF5FF'}} onClick={handleLogout} className="profile-button"><img src={logoutIcon} alt={"Logout"}/></button> }
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
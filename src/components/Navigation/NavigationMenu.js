import React, { useState } from 'react';

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavLinks from './NavLinks';
import Drawer from '../Drawer/Drawer';
import './NavigationMenu.css';
import Logo from '../../img/logo.png';

const NavigationMenu = props => {
    const [showDrawer, setShowDrawer] = useState(false);

    // Opens and closes the nav menu (on small screens only)
    const toggleDrawerHandler = () => {
        setShowDrawer(!showDrawer);
    };

    return (
        <React.Fragment>
            <nav className="navigation-menu">
                <div className="logo">
                    <img className="logo-img" src={Logo} alt="Logo" />
                    <h1 className="logo-text">Penny's Animal Sanctuary</h1>
                </div>
                <NavLinks menu="large-screen" links="larger" btn="hideable" />
                <FontAwesomeIcon
                    icon={faBars}
                    className="drawer-toggle"
                    size="4x"
                    onClick={toggleDrawerHandler} />
            </nav>
            {showDrawer && <Drawer click={toggleDrawerHandler} />}
        </React.Fragment>

    );
};

export default NavigationMenu;
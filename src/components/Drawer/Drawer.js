import React from 'react';

import NavLinks from '../Navigation/NavLinks';
import './Drawer.css';

const Drawer = props => {
    return (
        <div className="drawer" >
            <NavLinks menu="small-screen" links="smaller" clicked={props.click} btn="showable" />
        </div>
    );
};

export default Drawer;
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';


import { AuthContext } from '../../shared/context/authContext';
import Button from '../../components/Forms/Button';

import './NavLinks.css';

const NavLinks = props => {
    const auth = useContext(AuthContext);
    const history = useHistory();

    // Function for logout button which appears in the navbar only when user is authenticated
    const logoutHandler = () => {
        auth.logout();
        history.push('/auth');
    };

    return (
        <div className={props.menu}>
            {auth.isAdmin && <Link to="/new-animal" onClick={props.clicked ? props.clicked : null} className={`nav-link ${props.links}`}>Create New</Link>}
            <Link to="/" className={`nav-link ${props.links}`} onClick={props.clicked ? props.clicked : null}>Our Animals</Link>
            {auth.isLoggedIn && <Link
                to={`user/${auth.userId}`}
                className={`nav-link ${props.links}`} onClick={props.clicked ? props.clicked : null}>My Account</Link>}
            {auth.isLoggedIn ?
                <Button
                    className={`logout-btn ${props.btn}`}
                    type="button"
                    isValid={true}
                    text="Log out"
                    clicked={logoutHandler} /> :
                <Link
                    to="/auth"
                    className={`nav-link ${props.links}`} onClick={props.clicked ? props.clicked : null}>Login / Register</Link>}
        </div>

    );
};

export default NavLinks;
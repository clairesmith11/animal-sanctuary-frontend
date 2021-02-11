import React from 'react';

import 'font-awesome/css/font-awesome.min.css';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__about-us">
                <h3>About Us</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div>
                <h3>Contact Us</h3>
                <p>(123) 456-7890 (phone)</p>
                <p>(123) 987-6543 (fax)</p>
                <p>contact@pennysanimals.com</p>
            </div>
            <div className="footer__icons">
                <i className="fa fa-facebook-square fa-3x"></i>
                <i className="fa fa-twitter-square fa-3x"></i>
                <i className="fa fa-youtube-square fa-3x"></i>
            </div>
        </div>
    );
};

export default Footer;
import React from 'react';

import './Button.css';

const Button = props => {
    return (
        <button
            className={`btn ${props.className}`}
            type={props.type}
            disabled={!props.isValid}
            onClick={props.clicked}>{props.text}
        </button>
    );
};

export default Button;
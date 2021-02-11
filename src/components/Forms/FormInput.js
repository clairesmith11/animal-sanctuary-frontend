import React, { useState } from 'react';


const FormInput = (props) => {

    const [isTouched, setIsTouched] = useState(false);
    let element;

    // Checks whether an input field has been clicked on yet. If so, that input field is eligible to be checked
    // for validity if rules are provided. Unclicked input fields will be considered valid until clicked.
    const touchHandler = () => {
        setIsTouched(true);
    };

    element = props.type === 'textarea' ?
        <textarea
            className={!props.valid && isTouched ? "invalid" : ''}
            type={props.type}
            id={props.id}
            cols={props.cols}
            rows={props.rows}
            name={props.name}
            onBlur={touchHandler}
            placeholder={props.placeholder}
            onChange={props.changed}></textarea>
        :
        <input
            className={`form-input-normal ${!props.valid && isTouched ? 'invalid' : ''}`}
            type={props.type}
            id={props.id}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            onBlur={touchHandler}
            onChange={props.changed} />;


    return (
        <div className="form-template">
            <label htmlFor={props.id}>{props.label}</label>
            {element}
        </div>

    );
};

export default FormInput;
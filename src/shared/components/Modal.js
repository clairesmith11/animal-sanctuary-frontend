import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Backdrop from './Backdrop';


import './Modal.css';

const Modal = (props) => {

    return (
        <Backdrop>
            <CSSTransition
                mountOnEnter
                unmountOnExit
                in={props.show}
                appear={props.show}
                timeout={200}
                classNames="anim">
                {state => {
                    return (<div className="modal" key="modal">
                        <div className="modal__heading">
                            <h2>{props.heading}</h2>
                        </div>
                        <div className="modal__message">
                            <p>{props.message}</p>
                            {props.children}
                        </div>
                    </div>);
                }}
            </CSSTransition>

        </Backdrop>

    );
};

export default Modal;


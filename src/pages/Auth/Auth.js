import React, { useContext, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import SimpleReactValidator from 'simple-react-validator';

import './Auth.modules.css';
import { AuthContext } from '../../shared/context/authContext';
import { useHttp } from '../../shared/hooks/useHttp';
import { useForm } from '../../shared/hooks/useForm';
import FormInput from '../../components/Forms/FormInput';
import Button from '../../components/Forms/Button';
import Modal from '../../shared/components/Modal';
import Loading from '../../shared/components/Loading';

const Auth = props => {
    const simpleValidator = useRef(new SimpleReactValidator());
    const [isSignUpMode, setIsSignUpMode] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);
    const auth = useContext(AuthContext);
    const { formState, inputHandler } = useForm();
    const { isLoading, error, sendRequest, clearError } = useHttp();
    const history = useHistory();

    // Check overall form validity when input values change
    const inputChangedHandler = (e) => {
        inputHandler(e);

        setFormIsValid(simpleValidator.current.allValid());
    };

    // Toggle whether user is signing up or logging in
    const switchModeHandler = () => {
        setIsSignUpMode(!isSignUpMode);
    };

    // Sign up new user. If successful, redirect to homepage.
    const signUpHandler = async (e) => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(process.env.REACT_APP_URL + '/user/signup',
                'POST',
                JSON.stringify({
                    name: formState.name,
                    email: formState.email,
                    password: formState.password
                }),
                {
                    'Content-Type': 'application/json'
                });

            if (!error) {
                const isAdmin = responseData.data.user.role === 'admin' ? true : false;
                auth.login(responseData.data.user._id, isAdmin, responseData.data.token);
                history.push('/');
            }

        } catch (error) { }
    };

    // Login existing user. If successful, redirect to homepage.
    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(process.env.REACT_APP_URL + '/user/login',
                'POST',
                JSON.stringify({
                    email: formState.email,
                    password: formState.password
                }),
                {
                    'Content-Type': 'application/json',
                });

            if (!error) {
                const isAdmin = responseData.data.user.role === 'admin' ? true : false;
                auth.login(responseData.data.user._id, isAdmin, responseData.data.token);
                history.push('/');
            }

        } catch (error) { }
    };

    return (
        <React.Fragment>
            {isLoading && <Loading />}
            {error &&
                <Modal
                    show={error !== null}
                    message={error}
                    heading='Oops, something went wrong!'
                    onClose={clearError}>
                    <Button type="button" isValid={true} clicked={clearError} text="Close" />
                </Modal>}
            <form className="auth-form" onSubmit={isSignUpMode ? signUpHandler : loginHandler}>
                <i className="fa fa-user fa-5x"></i>
                {isSignUpMode && <FormInput
                    type="text"
                    id="username"
                    name="name"
                    label="Name"
                    valid={isSignUpMode ? simpleValidator.current.fieldValid('name') : true}
                    changed={inputChangedHandler} />}
                {simpleValidator.current.message("name", formState.name, 'required')}
                <FormInput
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    valid={isSignUpMode ? simpleValidator.current.fieldValid('email') : true}
                    changed={inputChangedHandler} />
                {simpleValidator.current.message("email", formState.email, 'required|email')}
                <FormInput
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    valid={isSignUpMode ? simpleValidator.current.fieldValid('password') : true}
                    changed={inputChangedHandler} />
                {simpleValidator.current.message("password", formState.password, 'required|min:7')}
                <Button
                    type="submit"
                    isValid={isSignUpMode ? formIsValid : true}
                    text={isSignUpMode ? "Sign up" : "Log in"} />
                <Button
                    type="button"
                    isValid={true}
                    text={isSignUpMode ? "Switch to Log in" : "Switch to Sign up"}
                    clicked={switchModeHandler} />
            </form>
        </React.Fragment>

    );
};

export default Auth;
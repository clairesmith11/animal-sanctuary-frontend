import React, { useState, useRef, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';

import { AuthContext } from '../../shared/context/authContext';
import { useHttp } from '../../shared/hooks/useHttp';
import { useForm } from '../../shared/hooks/useForm';
import Loading from '../../shared/components/Loading';
import Modal from '../../shared/components/Modal';
import FormInput from './FormInput';
import Button from './Button';

import './FormInput.css';

const NewApplication = props => {
    const animalId = useParams().animalId;
    const simpleValidator = useRef(new SimpleReactValidator());
    const [formIsValid, setFormIsValid] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttp();
    const { inputHandler, formState, setFormState } = useForm();
    const auth = useContext(AuthContext);
    const history = useHistory();

    // Using form hook to update form's state when any input value is changed.
    // Also checks validity of all fields in the form when input is changed, which then determines whether submit
    // button is clickable or disabled.
    const inputChangedHandler = (e) => {
        inputHandler(e);

        setFormIsValid(simpleValidator.current.allValid());
    };

    // Modal shows after successful submission of application to inform user that their app is being reviewed.
    const clearConfirmationModal = () => {
        setShowConfirmationModal(false);
        history.push('/');
    };

    // Submit app to backend. This is saved under the user's profile.
    const submitApplicationHandler = async (e) => {
        e.preventDefault();
        try {
            await sendRequest(process.env.REACT_APP_URL + '/applications',
                'POST',
                JSON.stringify({
                    creator: auth.userId,
                    animal: animalId,
                    name: formState.name,
                    age: formState.age,
                    address: formState.address,
                    phone: formState.phone,
                    email: formState.email,
                    children: formState.children
                }),

                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                });

            setShowConfirmationModal(true);
            setFormState({});

        } catch (error) { };

    };

    return (
        <React.Fragment>
            {isLoading && <Loading className="application-lds" />}
            {showConfirmationModal &&
                <Modal
                    show={showConfirmationModal}
                    message="Thank you for your application! We will contact you after the review period."
                    heading='Application Submitted!'>
                    <Button type="button" isValid={true} clicked={clearConfirmationModal} text="Close" />
                </Modal>}
            {error &&
                <Modal
                    show={error !== null}
                    message={error}
                    heading='Oops, something went wrong!'>
                    <Button type="button" isValid={true} clicked={clearError} text="Close" />
                </Modal>}
            <form className="form application-form" onSubmit={submitApplicationHandler}>
                <h2>Apply to adopt {props.name}</h2>
                <FormInput
                    type="text"
                    id="name"
                    label="Name"
                    name="name"
                    valid={simpleValidator.current.fieldValid('name')}
                    changed={inputChangedHandler} />
                {simpleValidator.current.message("name", formState.name, 'required')}
                <FormInput
                    type="number"
                    id="age"
                    label="Age"
                    name="age"
                    valid={simpleValidator.current.fieldValid('age')}
                    changed={inputChangedHandler} />
                {simpleValidator.current.message("age", formState.age, 'required|numeric')}
                <FormInput
                    type="text"
                    id="address"
                    label="Address"
                    name="address"
                    valid={simpleValidator.current.fieldValid('address')}
                    changed={inputChangedHandler} />
                {simpleValidator.current.message("address", formState.address, 'required')}
                <FormInput
                    type="email"
                    id="email"
                    label="Email"
                    name="email"
                    valid={simpleValidator.current.fieldValid('email')}
                    changed={inputChangedHandler} />
                {simpleValidator.current.message("email", formState.email, 'required|email')}
                <FormInput
                    type="text"
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    valid={simpleValidator.current.fieldValid('phone')}
                    changed={inputChangedHandler} />
                {simpleValidator.current.message("phone", formState.phone, 'required|phone')}
                <div>
                    <p>Are there children in your home?</p>
                    <div className="form__radio-btns">
                        <FormInput
                            type="radio"
                            id="yes"
                            name="children"
                            value="yes"
                            label="Yes"
                            rules="required"
                            changed={inputChangedHandler} />
                        <FormInput
                            type="radio"
                            id="no"
                            name="children"
                            value="no"
                            label="No"
                            rules="required"
                            changed={inputChangedHandler} />
                    </div>

                </div>
                <Button type="submit" text="Submit" isValid={formIsValid} />
            </form>
        </React.Fragment>


    );
};

export default NewApplication;
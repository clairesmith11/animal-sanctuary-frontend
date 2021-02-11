import React, { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';

import { AuthContext } from '../../shared/context/authContext';
import { useHttp } from '../../shared/hooks/useHttp';
import { useForm } from '../../shared/hooks/useForm';
import FormInput from '../../components/Forms/FormInput';
import Button from '../../components/Forms/Button';
import Modal from '../../shared/components/Modal';
import Loading from '../../shared/components/Loading';

import './NewAnimal.css';

const NewAnimal = props => {
    const simpleValidator = useRef(new SimpleReactValidator());
    const { inputHandler, formState } = useForm();
    const [formIsValid, setFormIsValid] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttp();
    const history = useHistory();
    const auth = useContext(AuthContext);

    // Check overall form validity when input value is changed
    const inputChangedHandler = (e) => {
        inputHandler(e);
        setFormIsValid(simpleValidator.current.allValid());
    };

    // Send post request to backend to create new animal if all fields are correctly filled out.
    const sendRequestHandler = async (e) => {
        e.preventDefault();
        try {
            await sendRequest(process.env.REACT_APP_URL + '/animals',
                'POST',
                JSON.stringify({
                    name: formState.animalName,
                    age: formState.age,
                    breed: formState.breed,
                    gender: formState.gender,
                    adoptionStatus: formState.adoptionStatus,
                    goodWithChildren: formState.children,
                    image: formState.image ? formState.image : 'https://tacm.com/wp-content/uploads/2018/01/no-image-available-768x510.jpeg',
                    summary: formState.summary ? formState.summary : '',
                    likes: formState.likes ? formState.likes.split(',') : '',
                    dislikes: formState.dislikes ? formState.dislikes.split(',') : '',
                    healthIssues: formState.healthIssues ? formState.healthIssues.split(',') : '',
                    user: {
                        role: auth.isAdmin
                    }
                }),
                {
                    'Content-type': 'application/json'
                }
            );

            if (!error) {
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
            <h2 className="new-animal__heading">Create A New Animal</h2>
            <form className="form" onSubmit={sendRequestHandler}>
                <FormInput
                    type="text"
                    id="animalName"
                    name="animalName"
                    label="Animal Name"
                    valid={simpleValidator.current.fieldValid('animalName')}
                    changed={inputChangedHandler} />
                {simpleValidator.current.message("animalName", formState.animalName, 'required')}
                <FormInput
                    type="text"
                    id="gender"
                    name="gender"
                    label="Gender"
                    valid={simpleValidator.current.fieldValid('gender')}
                    changed={inputChangedHandler} />
                {simpleValidator.current.message("gender", formState.gender, 'required')}
                <FormInput
                    type="number"
                    id="age"
                    name="age"
                    label="Age"
                    valid={simpleValidator.current.fieldValid('age')}
                    changed={inputChangedHandler} />
                {simpleValidator.current.message("age", formState.age, 'required|numeric')}
                <FormInput
                    type="text"
                    id="breed"
                    name="breed"
                    label="Breed"
                    valid={simpleValidator.current.fieldValid('breed')}
                    changed={inputChangedHandler} />
                {simpleValidator.current.message("breed", formState.breed, 'required')}
                <FormInput
                    type="textarea"
                    cols="25"
                    rows="10"
                    id="summary"
                    name="summary"
                    label="Summary"
                    valid={true}
                    changed={inputChangedHandler} />
                <FormInput
                    type="textarea"
                    cols="25"
                    rows="10"
                    id="likes"
                    name="likes"
                    label="Likes"
                    valid={true}
                    placeholder="Please enter values separated by a comma"
                    changed={inputChangedHandler} />
                <FormInput
                    type="textarea"
                    cols="25"
                    rows="10"
                    id="dislikes"
                    name="dislikes"
                    label="Disikes"
                    valid={true}
                    placeholder="Please enter values separated by a comma"
                    changed={inputChangedHandler} />
                <FormInput
                    type="textarea"
                    cols="25"
                    rows="10"
                    id="health"
                    name="healthIssues"
                    label="Health Issues"
                    valid={true}
                    placeholder="Please enter values separated by a comma"
                    changed={inputChangedHandler} />
                <div>
                    <p>What is the animal's adoption status?</p>
                    <div className="form__radio-btns">
                        <FormInput
                            type="radio"
                            id="available"
                            name="adoptionStatus"
                            value="available"
                            label="available"
                            changed={inputChangedHandler} />
                        <FormInput
                            type="radio"
                            id="pending"
                            name="adoptionStatus"
                            value="pending"
                            label="pending"
                            changed={(e) => inputChangedHandler(e, 'adoptionStatus')} />
                        <FormInput
                            type="radio"
                            id="adopted"
                            name="adoptionStatus"
                            value="adopted"
                            label="adopted"
                            changed={(e) => inputChangedHandler(e, 'adoptionStatus')} />
                    </div>
                </div>
                <div>
                    <p>Is this animal good with children?</p>
                    <div className="form__radio-btns">
                        <FormInput
                            type="radio"
                            id="yes"
                            name="children"
                            value="yes"
                            label="Yes"
                            changed={inputChangedHandler} />
                        <FormInput
                            type="radio"
                            id="no"
                            name="children"
                            value="no"
                            label="No"
                            changed={inputChangedHandler} />
                    </div>
                </div>
                <FormInput type="text" id="image" name="image" changed={inputChangedHandler} label="Image URL" valid={true} />

                <Button type="submit" text="Create" isValid={formIsValid} />

            </form>
        </React.Fragment>

    );
};

export default NewAnimal;

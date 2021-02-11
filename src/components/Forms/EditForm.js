import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../shared/context/authContext';
import { useHttp } from '../../shared/hooks/useHttp';
import { useForm } from '../../shared/hooks/useForm';
import FormInput from '../../components/Forms/FormInput';
import Button from '../../components/Forms/Button';
import Modal from '../../shared/components/Modal';
import Loading from '../../shared/components/Loading';

const EditForm = (props) => {
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const { inputHandler, formState } = useForm();
    const { isLoading, error, sendRequest, clearError } = useHttp();
    const history = useHistory();
    const auth = useContext(AuthContext);

    // Toggle handlers for the modal which will pop up when user clicks to delete an animal. This modal offers 
    // an extra layer of warning so an animal is not deleted accidentally.
    const showDeleteWarningHandler = () => {
        setShowDeleteWarning(true);
    };

    const hideDeleteWarningHandler = () => {
        setShowDeleteWarning(false);
    };

    // Send patch request to backend. Handles for scenario when admin does not want to 
    // update all of the provided fields. In that case, the current value of the fields will be submitted.
    // Redirects user to the selected animal's details page on successful update
    const updateAnimalHandler = async (e) => {
        e.preventDefault();
        try {

            await sendRequest(`${process.env.REACT_APP_URL}/animals/${props.animalId}`,
                'PATCH',
                JSON.stringify({
                    age: formState.age ? formState.age : props.animal.age,
                    likes: formState.likes ? formState.likes.split(',') : props.animal.likes,
                    healthIssues: formState.healthIssues ? formState.healthIssues.split(',') : props.animal.healthIssues,
                    adoptionStatus: formState.adoptionStatus ? formState.adoptionStatus : props.animal.adoptionStatus,
                    user: {
                        role: auth.isAdmin
                    }
                }),
                {
                    'Content-Type': 'application/json'
                });

            if (!error) {
                history.push(`/animal/${props.animalId}`);
            }

        } catch (error) { }
    };

    // Remove animal from database and redirect user to home page
    const deleteAnimalHandler = async () => {
        try {
            await sendRequest(`${process.env.REACT_APP_URL}/animals/${props.animalId}`,
                'DELETE', {
                user: {
                    role: auth.isAdmin
                }
            });
            history.push('/');

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
            {showDeleteWarning && <Modal show={showDeleteWarning} heading="Are you sure?" message="Click Delete to continue or Cancel to go back">
                <Button type="button" clicked={deleteAnimalHandler} className="danger" isValid={true} text="Delete" />
                <Button type="button" clicked={hideDeleteWarningHandler} isValid={true} text="Cancel" />
            </Modal>}
            <form onSubmit={updateAnimalHandler}>
                <FormInput
                    type="number"
                    id="age"
                    name="age"
                    placeholder={props.animal.age}
                    value={formState.age}
                    changed={inputHandler}
                    valid={true}
                    label="Age" />
                <FormInput
                    type="text"
                    id="likes"
                    name="likes"
                    placeholder={props.animal.likes.join(',')}
                    changed={inputHandler}
                    value={formState.likes}
                    valid={true}
                    label="Likes" />
                <FormInput
                    type="text"
                    id="dislikes"
                    name="dislikes"
                    placeholder={props.animal.dislikes}
                    value={formState.dislikes}
                    changed={inputHandler}
                    valid={true}
                    label="Dislikes" />
                <FormInput
                    type="text"
                    id="healthIssues"
                    name="healthIssues"
                    placeholder={props.animal.healthIssues.join(',')}
                    value={formState.healthIssues}
                    changed={inputHandler}
                    valid={true}
                    label="Health Issues" />
                <div className="form__radio-btns">
                    <FormInput
                        type="radio"
                        id="available"
                        name="adoptionStatus"
                        changed={inputHandler}
                        value="available"
                        label="available" />
                    <FormInput
                        type="radio"
                        id="pending"
                        name="adoptionStatus"
                        changed={inputHandler}
                        value="pending"
                        label="pending" />
                    <FormInput
                        type="radio"
                        id="adopted"
                        name="adoptionStatus"
                        changed={inputHandler}
                        value="adopted"
                        label="adopted" />
                </div>
                <Button type="button" isValid={true} text={`Update ${props.animal.name}`} clicked={updateAnimalHandler} />
                <Button
                    type="button"
                    className="danger"
                    isValid={true}
                    text={`Delete ${props.animal.name}`}
                    clicked={showDeleteWarningHandler} />

            </form>
        </React.Fragment>

    );
};

export default EditForm;
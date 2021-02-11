import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useHttp } from '../../shared/hooks/useHttp';
import DetailsCard from '../../components/DetailsCard/DetailsCard';
import DetailsText from '../../components/DetailsText/DetailsText';
import NewApplication from '../../components/Forms/newApplication';
import Loading from '../../shared/components/Loading';
import Modal from '../../shared/components/Modal';
import Button from '../../components/Forms/Button';

import './AnimalDetails.css';

const AnimalDetails = props => {
    const { isLoading, error, sendRequest, clearError } = useHttp();
    const [loadedAnimal, setLoadedAnimal] = useState();
    const animalId = useParams().animalId;

    // Fetch selected animal on page load and save in state
    useEffect(() => {
        const fetchAnimal = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_URL}/animals/${animalId}`);
                setLoadedAnimal(responseData.data.animal);
            } catch (error) { }

        };
        fetchAnimal();
    }, [sendRequest, animalId]);


    return (
        <React.Fragment>
            {error &&
                <Modal
                    show={error !== null}
                    message={error}
                    heading='Oops, something went wrong!'
                    onClose={clearError}>
                    <Button type="button" isValid={true} clicked={clearError} text="Close" />
                </Modal>}
            {isLoading && <Loading />}
            <div className="animal-details">
                {!isLoading && loadedAnimal && <DetailsText animal={loadedAnimal} />}
                {!isLoading && loadedAnimal && <DetailsCard className="animal-details__card" details={loadedAnimal} />}
                {!isLoading && loadedAnimal && <NewApplication className="animal-details__form" name={loadedAnimal.name} />}
            </div>
        </React.Fragment>

    );
};

export default AnimalDetails;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useHttp } from '../../shared/hooks/useHttp';
import EditForm from '../../components/Forms/EditForm';
import Loading from '../../shared/components/Loading';

const EditAnimal = props => {
    const animalId = useParams().animalId;
    const { isLoading, sendRequest } = useHttp();
    const [loadedAnimal, setLoadedAnimal] = useState();

    // Access selected animal to populate inputs with current values as placeholders
    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_URL}/animals/${animalId}`);
                setLoadedAnimal(responseData.data.animal);
            } catch (error) { }

        };
        fetchAnimals();
    }, [sendRequest, animalId]);

    return (
        <div>
            {isLoading && <Loading />}
            {loadedAnimal && <EditForm animalId={animalId} animal={loadedAnimal} />}
        </div>
    );

};

export default EditAnimal;
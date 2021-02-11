import { useState } from 'react';

export const useForm = () => {
    const [formState, setFormState] = useState({});

    // Updates values of each input in a given form in state on the change event
    const inputHandler = (e) => {
        const { value, name } = e.target;

        setFormState(prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });

    };


    return { inputHandler, formState, setFormState };
};


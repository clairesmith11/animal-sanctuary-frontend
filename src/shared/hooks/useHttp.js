import { useState, useCallback } from 'react';

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    // Sends configurable requests to the backend and handles errors and loading state
    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        try {
            const response = await fetch(url, {
                method,
                headers,
                body
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message);
            }
            setIsLoading(false);
            return responseData;

        } catch (error) {
            setError(error.message);
            setIsLoading(false);
            throw error;
        }

    }, []);

    const clearError = () => {
        setError(null);
    };

    return { isLoading, error, sendRequest, clearError };
};

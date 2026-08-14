import { useState, useCallback } from 'react';
import { parseApiError } from '../utils/apiUtils';

/**
 * A custom hook to handle API requests with loading, error, and data states.
 * @param {Function} apiFunc - The API service function to be executed.
 * @returns {object} An object containing data, error, loading state, and a request function.
 */
const useApi = (apiFunc) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const request = useCallback(
        async (...args) => {
            setLoading(true);
            setError(null);
            try {
                const response = await apiFunc(...args);
                setData(response.data);
                return response.data; // Return data on success
            } catch (err) {
                const parsedError = parseApiError(err);
                setError(parsedError);
                // Propagate the error for further handling in the component if needed
                throw parsedError;
            } finally {
                setLoading(false);
            }
        },
        [apiFunc]
    );

    return { data, error, loading, request };
};

export default useApi;
/**
 * Parses an error from an API call into a user-friendly string.
 * @param {object} error - The error object, typically from Axios.
 * @returns {string} A user-friendly error message.
 */
export const parseApiError = (error) => {
    if (error?.response?.data?.message) {
        return error.response.data.message;
    }
    if (error?.code === 'ERR_NETWORK' || error?.message === 'Network Error' || !error?.response) {
        return 'Server to connect error: Backend server (http://localhost:8000) is unreachable. Please ensure the backend is running (run: npm run dev).';
    }
    if (error?.message) {
        return error.message;
    }
    return 'An unexpected error occurred.';
};

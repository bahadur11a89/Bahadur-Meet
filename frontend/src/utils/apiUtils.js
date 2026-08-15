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
        return 'Unable to connect to the server. Please check your internet connection or try again later.';
    }
    if (error?.message) {
        return error.message;
    }
    return 'An unexpected error occurred.';
};

/**
 * Implements an exponential backoff strategy for socket reconnections.
 * This adds a randomized jitter to prevent clients from reconnecting all at once.
 * @param {number} attemptNumber - The current reconnection attempt number provided by Socket.IO.
 * @returns {number} The delay in milliseconds before the next attempt.
 */
export const exponentialBackoff = (attemptNumber) => {
    const baseDelay = 1000; // 1 second
    const maxDelay = 10000; // 10 seconds
    const jitter = Math.random() * 500;
    const delay = Math.min(baseDelay * Math.pow(2, attemptNumber), maxDelay);
    return delay + jitter;
};
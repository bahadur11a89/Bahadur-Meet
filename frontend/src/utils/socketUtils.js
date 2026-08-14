/**
 * Safely emits a socket event, only if the socket is connected.
 * @param {import('socket.io-client').Socket | null} socket The socket instance.
 * @param {string} eventName The name of the event to emit.
 * @param  {...any} args The data to send with the event.
 */
export const emitSafe = (socket, eventName, ...args) => {
    if (socket && socket.connected) {
        socket.emit(eventName, ...args);
    } else {
        console.error(`[Socket.IO] Emit failed. Socket not connected. Event: "${eventName}"`);
    }
};

/**
 * Returns a promise that resolves when the socket successfully connects.
 * @param {import('socket.io-client').Socket} socket The socket instance.
 * @returns {Promise<void>}
 */
export const waitForConnection = (socket) => {
    return new Promise((resolve, reject) => {
        if (socket.connected) {
            return resolve();
        }
        socket.once('connect', resolve);
        socket.once('connect_error', reject);
    });
};
/**
 * Manages event listeners for a Socket.IO instance to prevent duplicates
 * and provide a clean subscription API.
 */
export class ListenerManager {
    /**
     * @param {import('socket.io-client').Socket} socket The socket instance.
     */
    constructor(socket) {
        this.socket = socket;
        this.listeners = new Map();
    }

    /**
     * Subscribes a handler to a socket event. Returns an unsubscribe function.
     * @param {string} eventName The name of the event to listen to.
     * @param {Function} handler The callback function.
     * @returns {Function} A function to call to unsubscribe the listener.
     */
    subscribe(eventName, handler) {
        if (!this.listeners.has(eventName)) {
            this.listeners.set(eventName, new Set());
        }
        const handlers = this.listeners.get(eventName);

        if (handlers.has(handler)) {
            if (process.env.NODE_ENV === 'development') {
                console.warn(`[Socket.IO] Duplicate listener for event "${eventName}" was ignored.`);
            }
            // Return a no-op function if listener is a duplicate
            return () => {};
        }

        handlers.add(handler);
        this.socket.on(eventName, handler);

        // Return a cleanup function
        return () => this.unsubscribe(eventName, handler);
    }

    /**
     * Unsubscribes a specific handler from an event.
     * @param {string} eventName The name of the event.
     * @param {Function} handler The handler function to remove.
     */
    unsubscribe(eventName, handler) {
        const handlers = this.listeners.get(eventName);
        if (handlers && handlers.has(handler)) {
            handlers.delete(handler);
            this.socket.off(eventName, handler);
        }
    }

    /**
     * Removes all listeners and clears the internal registry.
     */
    cleanup() {
        this.socket.removeAllListeners();
        this.listeners.clear();
    }
}
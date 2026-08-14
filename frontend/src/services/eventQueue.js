/**
 * A simple queue for holding socket events to be sent upon reconnection.
 */
export class EventQueue {
    constructor(socket) {
        this.socket = socket;
        this.queue = [];
    }

    /**
     * Adds an event to the queue.
     * @param {string} eventName The name of the event.
     * @param {any} data The data payload for the event.
     */
    enqueue(eventName, data) {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Socket.IO Queue] Enqueued event: "${eventName}"`, data);
        }
        this.queue.push({ eventName, data });
    }

    /**
     * Flushes the queue, sending all stored events.
     */
    flush() {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Socket.IO Queue] Flushing ${this.queue.length} events.`);
        }
        while (this.queue.length > 0) {
            const { eventName, data } = this.queue.shift();
            this.socket.emit(eventName, data);
        }
    }

    /**
     * Clears all events from the queue.
     */
    clear() {
        this.queue = [];
    }
}
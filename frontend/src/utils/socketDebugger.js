/**
 * A development-only utility for logging detailed Socket.IO diagnostics.
 */
export class SocketDebugger {
    /**
     * @param {import('socket.io-client').Socket} socket The socket instance.
     */
    constructor(socket) {
        if (process.env.NODE_ENV !== 'development') {
            // This class does nothing in production.
            this.start = () => {};
            this.stop = () => {};
            return;
        }
        this.socket = socket;
        this._logEvent = this._logEvent.bind(this);
    }

    /**
     * Attaches the `onAny` listener to log all incoming and outgoing events.
     */
    start() {
        console.log('[Socket.IO Debugger] Initialized.');
        this.socket.onAny(this._logEvent);
    }

    /**
     * Detaches the `onAny` listener.
     */
    stop() {
        this.socket.offAny(this._logEvent);
    }

    /**
     * The actual logging function for events.
     */
    _logEvent(event, ...args) {
        const isOutgoing = this.socket.io.engine.sentPackets.some(p => p.type === 'message' && p.data.includes(event));
        console.log(`[Socket.IO] ${isOutgoing ? '->' : '<-'} Event: "${event}"`, 'Data:', args);
    }
}
/**
 * Manages the user's session details related to the socket connection.
 */
export class SessionManager {
    constructor(socket, onSessionUpdate) {
        this.socket = socket;
        this.onSessionUpdate = onSessionUpdate;
        this.reconnectCount = 0;

        this._handleConnect = this._handleConnect.bind(this);
        this._handleReconnectAttempt = this._handleReconnectAttempt.bind(this);
    }

    start() {
        this.socket.on('connect', this._handleConnect);
        this.socket.io.on('reconnect_attempt', this._handleReconnectAttempt);
    }

    stop() {
        this.socket.off('connect', this._handleConnect);
        this.socket.io.off('reconnect_attempt', this._handleReconnectAttempt);
    }

    _handleConnect() {
        this.onSessionUpdate(session => ({
            ...session,
            socketId: this.socket.id,
            sessionId: this.socket.id, // Use socket.id as a simple session ID for now
            connectionTimestamp: Date.now(),
            lastActivityTimestamp: Date.now(),
        }));
        // Reset reconnect count on successful connection
        this.reconnectCount = 0;
        this.onSessionUpdate(session => ({ ...session, reconnectCount: 0 }));
    }

    _handleReconnectAttempt() {
        this.reconnectCount++;
        this.onSessionUpdate(session => ({ ...session, reconnectCount: this.reconnectCount }));
    }

    updateLastActivity() {
        this.onSessionUpdate(session => ({ ...session, lastActivityTimestamp: Date.now() }));
    }
}
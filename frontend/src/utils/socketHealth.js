/**
 * Monitors the health of a Socket.IO connection.
 * It listens to the underlying engine's events to provide metrics.
 */
export class SocketHealthMonitor {
    constructor(socket, onHealthUpdate) {
        this.socket = socket;
        this.onHealthUpdate = onHealthUpdate;
        this.connectionStartTime = null;
        this.healthCheckInterval = null;

        // Bind methods to ensure 'this' context is correct
        this._handleConnect = this._handleConnect.bind(this);
        this._handleDisconnect = this._handleDisconnect.bind(this);
    }

    start() {
        this.socket.on('connect', this._handleConnect);
        this.socket.on('disconnect', this._handleDisconnect);
    }

    stop() {
        this.socket.off('connect', this._handleConnect);
        this.socket.off('disconnect', this._handleDisconnect);
        if (this.healthCheckInterval) {
            clearInterval(this.healthCheckInterval);
        }
        // Remove the specific pong listener to prevent memory leaks
        this.socket.io.engine.off('pong');
    }

    _handleConnect() {
        this.connectionStartTime = Date.now();
        if (this.healthCheckInterval) clearInterval(this.healthCheckInterval);

        // Listen to the underlying engine's pong event for latency
        this.socket.io.engine.on('pong', (latency) => {
            this.onHealthUpdate(health => ({ ...health, latency, lastHeartbeat: Date.now() }));
        });

        this.healthCheckInterval = setInterval(() => {
            if (this.socket.connected && this.connectionStartTime) {
                this.onHealthUpdate(health => ({
                    ...health,
                    connectionDuration: Date.now() - this.connectionStartTime,
                    transport: this.socket.io.engine.transport.name,
                    socketId: this.socket.id,
                }));
            }
        }, 3000); // Update duration and transport every 3 seconds
    }

    _handleDisconnect() {
        if (this.healthCheckInterval) {
            clearInterval(this.healthCheckInterval);
        }
        this.connectionStartTime = null;
        // Reset health metrics on disconnect
        this.onHealthUpdate({
            latency: -1, lastHeartbeat: null, connectionDuration: 0,
            transport: 'N/A', socketId: null,
        });
    }
}
import logger from "../../utils/logger.js";

/**
 * Wraps an async socket event handler with try/catch.
 * Emits a structured "socket:error" event back to the originating socket
 * instead of crashing the process.
 *
 * Usage:
 *   socket.on("some-event", socketErrorHandler(socket, async (data) => { ... }));
 */
export const socketErrorHandler = (socket, handler) => async (...args) => {
    try {
        await handler(...args);
    } catch (err) {
        logger.error("Socket event error", {
            socketId: socket.id,
            userId: socket.user?.id,
            error: err.message,
        });

        socket.emit("socket:error", {
            message: err.message || "An unexpected error occurred",
        });
    }
};

/**
 * Logs and handles connection-level errors (e.g. auth failures).
 * Attach once per io instance.
 */
export const registerSocketErrorLogging = (io) => {
    io.engine.on("connection_error", (err) => {
        logger.error("Socket connection error", {
            code: err.code,
            message: err.message,
        });
    });
};

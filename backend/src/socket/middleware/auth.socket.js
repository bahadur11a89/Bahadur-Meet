import { verifyAccessToken } from "../../utils/jwt.js";
import logger from "../../utils/logger.js";

/**
 * Socket.IO authentication middleware.
 * Client must send token via:
 *   - socket.auth = { token: "Bearer <jwt>" }  (recommended)
 *   - socket.handshake.query.token              (fallback)
 */
const socketAuthMiddleware = (socket, next) => {
    try {
        const raw =
            socket.handshake.auth?.token ||
            socket.handshake.query?.token;

        if (!raw) {
            return next(new Error("SOCKET_AUTH: token missing"));
        }

        const token = raw.startsWith("Bearer ") ? raw.slice(7) : raw;
        const decoded = verifyAccessToken(token);

        // Attach verified user to socket for all downstream handlers
        socket.user = decoded;

        logger.debug("Socket authenticated", {
            socketId: socket.id,
            userId: decoded.id,
        });

        next();
    } catch (err) {
        logger.warn("Socket auth failed", { error: err.message });
        next(new Error("SOCKET_AUTH: invalid or expired token"));
    }
};

export default socketAuthMiddleware;

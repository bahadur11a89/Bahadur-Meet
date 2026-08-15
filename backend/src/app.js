import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

import { corsOptions } from "./config/cors.js";

import onConnection from "./socket/index.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import meetingRoutes from "./routes/meeting.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

// --- Basic App and Server Setup ---
const app = express();

// --- Express CORS ---
app.use(cors(corsOptions));

app.use(express.json());

// --- HTTP Server ---
const server = http.createServer(app);

// --- Socket.IO ---
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

// --- Health Check ---
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "Backend is running",
  });
});

// --- API Routes ---
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/meetings", meetingRoutes);

// Global Error Handler
app.use(errorHandler);

console.log("[SOCKET] Socket.IO server initialized");

// --- Socket.IO Authentication Middleware ---
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;

  console.log("[SOCKET AUTH] Token present:", !!token);

  if (!token) {
    return next(
      new Error("Authentication error: Token not provided.")
    );
  }

  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    console.error(
      "FATAL ERROR: JWT_SECRET is not defined in the .env file."
    );

    return next(
      new Error("Authentication error: Server configuration issue.")
    );
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(
        "[SOCKET AUTH] Token verification failed:",
        err.message
      );

      return next(
        new Error("Authentication error: Invalid token.")
      );
    }

    socket.user = decoded;
    next();
  });
});

// --- Main Socket.IO Connection Handler ---
io.on("connection", (socket) => {
  console.log("[SOCKET] CONNECTED", {
    socketId: socket.id,
    userId:
      socket.user?.id ||
      socket.user?.username ||
      null,
  });

  onConnection(io, socket);

  socket.on("disconnect", (reason) => {
    console.log(
      "[SOCKET] DISCONNECTED",
      socket.id,
      reason
    );
  });
});

// --- Server Port ---
const PORT = process.env.PORT || 8000;

// --- Server Error Handler ---
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Please stop the existing process running on port ${PORT} or restart.`
    );

    process.exit(1);
  } else {
    console.error("Server error:", err);
  }
});

// --- Start Application ---
const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await connectDB();

    console.log("MongoDB connection successful.");

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Failed to start server:",
      error.message
    );

    process.exit(1);
  }
};

startServer();
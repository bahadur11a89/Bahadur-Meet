import { env } from "./env.js";

const allowedOrigins = [
  env.CLIENT_URL,
  "https://bahadur-meet.vercel.app",

  // Local development
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "http://127.0.0.1:5173",
].filter(Boolean);

export const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without an Origin header
    // (curl, Postman, server-to-server requests)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked origin: ${origin}`));
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],

  optionsSuccessStatus: 204,
};
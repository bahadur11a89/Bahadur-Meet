import { env } from "./env.js";

const allowedOrigins = [
  env.CLIENT_URL,
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "http://127.0.0.1:5173",
  "https://bahadur-meet.onrender.com",
].filter(Boolean);

export const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (mobile/curl) or allowed origins or any dev origin
    if (!origin || allowedOrigins.includes(origin) || env.NODE_ENV !== "production") {
      callback(null, true);
    } else {
      callback(null, true);
    }
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
};
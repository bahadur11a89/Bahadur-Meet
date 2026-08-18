const isLocalhost = Boolean(
  typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '[::1]' ||
      window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/))
);

const defaultHost = isLocalhost ? "http://localhost:8000" : "https://bahadur-meet.onrender.com";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || process.env.REACT_APP_API_URL || defaultHost;

// Ensure API_URL always points to the v1 api, regardless of what the env var provides
const rawApiUrl = process.env.REACT_APP_API_URL || SOCKET_URL;
const API_URL = rawApiUrl.endsWith('/api/v1') ? rawApiUrl : `${rawApiUrl.replace(/\/+$/, '')}/api/v1`;

export { API_URL, SOCKET_URL };

export default SOCKET_URL;
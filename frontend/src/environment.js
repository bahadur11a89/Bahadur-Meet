const isLocalhost = Boolean(
  typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '[::1]' ||
      window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/))
);

const defaultHost = isLocalhost ? "http://localhost:8000" : "https://bahadur-meet.onrender.com";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || defaultHost;
const API_URL =
  process.env.REACT_APP_API_URL ||
  (SOCKET_URL.endsWith('/api/v1') ? SOCKET_URL : `${SOCKET_URL.replace(/\/+$/, '')}/api/v1`);

export { API_URL, SOCKET_URL };

export default SOCKET_URL;
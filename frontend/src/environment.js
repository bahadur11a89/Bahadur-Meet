let IS_PROD = false;

const API_URL = IS_PROD
  ? "https://apnacollegebackend.onrender.com/api/v1"
  : (process.env.REACT_APP_API_URL || "http://localhost:8000/api/v1");

const SOCKET_URL = IS_PROD
  ? "https://apnacollegebackend.onrender.com"
  : (process.env.REACT_APP_SOCKET_URL || "http://localhost:8000");

export { API_URL, SOCKET_URL };

export default SOCKET_URL;
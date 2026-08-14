import { io } from "socket.io-client";
import server from "../environment";

let socket = null;

export const initSocket = (token) => {
  if (!socket) {
    const tokenToUse = token || localStorage.getItem('token') || localStorage.getItem('authToken');
    socket = io(server, {
      autoConnect: false,
      auth: { token: tokenToUse },
    });
  }
  return socket;
};

export const createSocketConnection = (token) => {
  const tokenToUse = token || localStorage.getItem('token') || localStorage.getItem('authToken');
  socket = io(server, {
    autoConnect: true,
    auth: { token: tokenToUse },
  });
  return socket;
};

export const getSocket = () => socket;

export default initSocket;

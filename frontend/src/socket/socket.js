import { io } from "socket.io-client";
import server from "../environment";

let socket = null;

export const initSocket = (token) => {
  if (!socket) {
    socket = io(server, {
      autoConnect: false,
      forceNew: true,
      auth: (cb) => {
        const tokenToUse = token || localStorage.getItem('token') || localStorage.getItem('authToken');
        cb({ token: tokenToUse });
      },
    });
  }
  return socket;
};

export const createSocketConnection = (token) => {
  socket = io(server, {
    autoConnect: true,
    forceNew: true,
    auth: (cb) => {
      const tokenToUse = token || localStorage.getItem('token') || localStorage.getItem('authToken');
      cb({ token: tokenToUse });
    },
  });
  return socket;
};

export const getSocket = () => socket;

export default initSocket;

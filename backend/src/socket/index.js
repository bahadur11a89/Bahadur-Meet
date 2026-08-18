import chatSocketHandler from './chat.socket.js';
import roomSocketHandler from './room.socket.js';
import signalingSocketHandler from './signaling.socket.js';
import presenceSocketHandler from './presence.socket.js';
import meetingSocketHandler from './meeting.socket.js';

let ioInstance = null;

export const setIo = (io) => {
  ioInstance = io;
};

export const getIo = () => {
  return ioInstance;
};

let ioRegistered = false;

const onConnection = (io, socket) => {
  setIo(io);
  console.log(`Socket connected: ${socket.id} | User: ${socket.user?.id}`);

  if (!ioRegistered) {
    roomSocketHandler(io);
    signalingSocketHandler(io);
    meetingSocketHandler(io);
    ioRegistered = true;
  }

  // Register socket-specific handlers
  chatSocketHandler(io, socket);



  socket.on('disconnect', (reason) => {
    console.log(`[SOCKET DISCONNECTED] socketId: ${socket.id} | reason: ${reason}`);
    const rooms = Array.from(socket.rooms).filter(r => r !== socket.id);
    rooms.forEach(room => {
      io.to(room).emit('user-left', socket.id);
    });
  });
};

export default onConnection;
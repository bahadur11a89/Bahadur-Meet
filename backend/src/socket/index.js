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

  // Handlers for join-call, signal, chat-message
  socket.on('join-call', (path) => {
    socket.join(path);
    const roomMembers = Array.from(io.sockets.adapter.rooms.get(path) || []);
    console.log(`[MEETING JOIN BACKEND] socketId: ${socket.id} | userId: ${socket.user?.id || socket.user?.username || 'anonymous'} | room: ${path}`);
    console.log(`[ROOM JOIN] socketId: ${socket.id} | room: ${path}`);
    console.log(`[ROOM MEMBERS] room ${path}:`, roomMembers);

    io.to(path).emit('user-joined', socket.id, roomMembers);
  });

  socket.on('signal', (toId, message) => {
    try {
      const parsed = JSON.parse(message);
      if (parsed.sdp) {
        console.log(`[WEBRTC SIGNAL] ${socket.id} -> ${toId} | SDP: ${parsed.sdp.type.toUpperCase()}`);
      } else if (parsed.ice) {
        console.log(`[WEBRTC SIGNAL] ${socket.id} -> ${toId} | ICE CANDIDATE`);
      }
    } catch (e) {
      console.log(`[WEBRTC SIGNAL] ${socket.id} -> ${toId} | Raw signal`);
    }
    io.to(toId).emit('signal', socket.id, message);
  });

  socket.on('chat-message', (data, sender) => {
    const rooms = Array.from(socket.rooms).filter(r => r !== socket.id);
    console.log(`[CHAT MESSAGE] from ${socket.id} (${sender}) in rooms:`, rooms, `data: ${data}`);
    rooms.forEach(room => {
      io.to(room).emit('chat-message', data, sender, socket.id);
    });
  });

  socket.on('disconnect', (reason) => {
    console.log(`[SOCKET DISCONNECTED] socketId: ${socket.id} | reason: ${reason}`);
    const rooms = Array.from(socket.rooms).filter(r => r !== socket.id);
    rooms.forEach(room => {
      io.to(room).emit('user-left', socket.id);
    });
  });
};

export default onConnection;
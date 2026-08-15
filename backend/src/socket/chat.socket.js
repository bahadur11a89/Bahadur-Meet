import { ChatService, presenceService } from '../services/chat.service.js';

const wrap = (socket, handler) => async (payload, callback) => {
  try {
    await handler(payload, callback);
  } catch (err) {
    console.error(`Socket Error: ${err.message}`, { event: handler.name, payload });
    socket.emit('chat:error', { success: false, message: err.message || 'An unknown error occurred.' });
  }
};

export default (io, socket) => {
  // Assumes auth middleware has populated socket.user
  const senderId = socket.user?.id || socket.user?._id;

  const sendMessage = async (payload) => {
    const sId = socket.user?.id || socket.user?._id;
    const message = await ChatService.sendMessage({ senderId: sId, payload, isPrivate: false });
    const response = {
      messageId: message._id,
      meetingId: message.meetingId,
      senderId: message.sender._id || message.sender,
      content: message.content,
      createdAt: message.createdAt,
    };
    if (message.meetingId) {
      socket.join(message.meetingId.toString());
      io.to(message.meetingId.toString()).emit('chat:new-message', response);
    } else {
      socket.emit('chat:new-message', response);
    }
  };

  const sendPrivateMessage = async (payload) => {
    const message = await ChatService.sendMessage({ senderId, payload, isPrivate: true });
    const receiverSocketId = presenceService.getSocketId(message.receiver.toString());

    const response = {
      messageId: message._id,
      senderId: message.sender._id,
      receiverId: message.receiver,
      content: message.content,
      createdAt: message.createdAt,
    };

    // Send to receiver if they are online
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('chat:new-message', response);
    }
    // Send back to sender for their own UI
    socket.emit('chat:new-message', response);
  };

  const getHistory = async (payload, callback) => {
    const historyData = await ChatService.getHistory(senderId, payload);
    // Use ack callback for direct response
    if (callback) {
      callback({
        messages: historyData.messages,
        currentPage: historyData.currentPage,
        totalPages: historyData.totalPages,
      });
    }
  };

  const markRead = async (payload) => {
    const result = await ChatService.markAsRead(senderId, payload);
    const senderSocketId = presenceService.getSocketId(result.senderId.toString());

    const response = {
      messageId: result.messageId,
      readerId: senderId,
    };

    // If it was a private message, notify only the sender
    if (result.receiverId && senderSocketId) {
      io.to(senderSocketId).emit('chat:message-read', response);
    } else if (!result.receiverId) {
      // For group chat, we could notify the whole room, but notifying sender is often enough
      if (senderSocketId) {
        io.to(senderSocketId).emit('chat:message-read', response);
      }
    }
  };

  const deleteMessage = async (payload) => {
    const result = await ChatService.deleteMessage(senderId, payload);
    const response = { messageId: result.messageId };

    if (result.receiverId) {
      // Private message deletion: notify both parties
      const receiverSocketId = presenceService.getSocketId(result.receiverId.toString());
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('chat:message-deleted', response);
      }
      // Notify sender
      socket.emit('chat:message-deleted', response);
    } else {
      // Meeting-wide message deletion: notify everyone
      io.to(result.meetingId.toString()).emit('chat:message-deleted', response);
    }
  };

  // Registering events with the error-handling wrapper
  socket.on('chat:send-message', wrap(socket, sendMessage));
  socket.on('chat:private-message', wrap(socket, sendPrivateMessage));
  socket.on('chat:get-history', wrap(socket, getHistory));
  socket.on('chat:mark-read', wrap(socket, markRead));
  socket.on('chat:delete-message', wrap(socket, deleteMessage));
};
import ChatRepository from '../repositories/chat.repository.js';
import roomRegistry from '../socket/room.registry.js'; // Using the registry for room state
// The following imports are assumed to exist based on the architecture
import * as presenceService from './presence.service.js';
import * as UserRepository from '../repositories/user.repository.js';
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';

import { validate, sendMessageSchema, privateMessageSchema, getHistorySchema, markReadSchema, deleteMessageSchema } from '../validators/chat.validator.js';
import xss from 'xss-filters';

// A simple service wrapper around the room registry for clear responsibilities
const roomService = {
    getRoom: (meetingId) => roomRegistry.getRoom(meetingId),
    isUserInMeeting: (userId, meetingId) => roomRegistry.isInRoom(meetingId, userId),
    isUserHost: (userId, meetingId) => {
        const room = roomRegistry.getRoom(meetingId);
        return room && room.hostId.toString() === userId.toString();
    },
};

class ChatService {

  static async sendMessage({ senderId, payload, isPrivate = false }) {
    // 1. Validate payload
    const schema = isPrivate ? privateMessageSchema : sendMessageSchema;
    const { error, value } = validate(schema, payload);
    if (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Validation failed: ${error.details.map(d => d.message).join(', ')}`);
    }

    const { meetingId, content, receiverId } = value;

    // 2. Authorize user and validate meeting
    let room = roomService.getRoom(meetingId);
    if (!room) {
        const { Meeting } = await import('../models/meeting.model.js');
        const meetingDoc = await Meeting.findById(meetingId);
        if (meetingDoc) {
            room = roomRegistry.createRoom(meetingId.toString(), meetingDoc.host.toString());
            roomRegistry.addParticipant(meetingId.toString(), senderId.toString(), null);
        } else {
            room = roomRegistry.createRoom(meetingId.toString(), senderId.toString());
            roomRegistry.addParticipant(meetingId.toString(), senderId.toString(), null);
        }
    }
    const isAuthorized = roomService.isUserInMeeting(senderId, meetingId);
    if (!isAuthorized) {
        roomRegistry.addParticipant(meetingId.toString(), senderId.toString(), null);
    }

    // 3. Additional validation for private messages
    if (isPrivate) {
        if (senderId.toString() === receiverId.toString()) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'You cannot send a private message to yourself.');
        }
        // Check if receiver exists in the database
        const receiverUser = await UserRepository.findById(receiverId);
        if (!receiverUser) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Receiver not found.');
        }
        // Check if receiver is in the same meeting
        if (!roomService.isUserInMeeting(receiverId, meetingId)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Receiver is not in this meeting.');
        }
    }

    // 4. Sanitize content
    const sanitizedContent = xss.inHTMLData(content);

    // 5. Prepare message for persistence
    const messageData = {
      meetingId,
      sender: senderId,
      receiver: receiverId || null,
      content: sanitizedContent,
      type: 'TEXT',
    };

    // 6. Persist message
    const message = await ChatRepository.createMessage(messageData);

    // 7. Format response for broadcasting
    return {
      _id: message._id,
      meetingId: message.meetingId,
      sender: { _id: message.sender },
      receiver: message.receiver,
      content: message.content,
      createdAt: message.createdAt,
    };
  }

  static async getHistory(userId, payload) {
    const { error, value } = validate(getHistorySchema, payload);
    if (error) throw new ApiError(httpStatus.BAD_REQUEST, `Validation failed: ${error.message}`);

    const isAuthorized = roomService.isUserInMeeting(userId, value.meetingId);
    if (!isAuthorized) throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized to view this chat history.');

    return ChatRepository.findMessagesByMeeting(value);
  }

  static async getPrivateHistory(userId, { otherUserId, meetingId, page, limit }) {
    // Basic validation
    if (!otherUserId || !meetingId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required parameters for private history.');
    }

    const isAuthorized = roomService.isUserInMeeting(userId, meetingId);
    if (!isAuthorized) throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized to view this chat history.');

    return ChatRepository.findPrivateMessages({ 
        user1Id: userId, 
        user2Id: otherUserId, 
        meetingId, 
        page, 
        limit 
    });
  }

  static async markAsRead(userId, payload) {
    const { error, value } = validate(markReadSchema, payload);
    if (error) throw new ApiError(httpStatus.BAD_REQUEST, `Validation failed: ${error.message}`);

    const message = await ChatRepository.findMessageById(value.messageId);
    if (!message) throw new ApiError(httpStatus.NOT_FOUND, 'Message not found.');

    const isAuthorized = roomService.isUserInMeeting(userId, message.meetingId);
    if (!isAuthorized) throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized to perform this action.');

    const updatedMessage = await ChatRepository.markMessageRead(value.messageId, userId);

    return {
      messageId: updatedMessage._id,
      readBy: updatedMessage.readBy,
      senderId: updatedMessage.sender._id, // To notify the original sender
      meetingId: updatedMessage.meetingId,
      receiverId: updatedMessage.receiver,
    };
  }

  static async deleteMessage(userId, payload) {
    const { error, value } = validate(deleteMessageSchema, payload);
    if (error) throw new ApiError(httpStatus.BAD_REQUEST, `Validation failed: ${error.message}`);

    const message = await ChatRepository.findMessageById(value.messageId);
    if (!message) throw new ApiError(httpStatus.NOT_FOUND, 'Message not found.');

    const isHost = roomService.isUserHost(userId, message.meetingId);
    const isSender = message.sender._id.toString() === userId.toString();

    if (!isSender && !isHost) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized: You can only delete your own messages.');
    }

    await ChatRepository.deleteMessageById(value.messageId);

    return {
      messageId: value.messageId,
      meetingId: message.meetingId,
      receiverId: message.receiver,
    };
  }
}

export { ChatService, presenceService, roomService };
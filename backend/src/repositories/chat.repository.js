import Message from '../models/message.model.js';

class ChatRepository {
  static async createMessage(messageData) {
    const message = new Message(messageData);
    return message.save();
  }

  static async findMessageById(messageId) {
    return Message.findById(messageId).populate('sender', 'name');
  }

  static async findMessagesByMeeting({ meetingId, page, limit }) {
    const skip = (page - 1) * limit;
    const messages = await Message.find({ meetingId, receiver: null })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('sender', 'name avatar')
      .lean();
    
    const totalMessages = await Message.countDocuments({ meetingId, receiver: null });

    return {
      messages: messages.reverse(), // Show oldest first for the current page
      totalPages: Math.ceil(totalMessages / limit),
      currentPage: page,
    };
  }

  static async findPrivateMessages({ user1Id, user2Id, meetingId, page = 1, limit = 50 }) {
    const skip = (page - 1) * limit;
    const query = {
      meetingId,
      $or: [
        { sender: user1Id, receiver: user2Id },
        { sender: user2Id, receiver: user1Id },
      ],
    };

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('sender', 'name avatar')
      .lean();

    const totalMessages = await Message.countDocuments(query);

    return {
      messages: messages.reverse(), // Show oldest first for the current page
      totalPages: Math.ceil(totalMessages / limit),
      currentPage: page,
    };
  }

  static async markMessageRead(messageId, userId) {
    return Message.findByIdAndUpdate(
      messageId,
      { $addToSet: { readBy: userId } },
      { new: true }
    )
    .populate('sender', 'name')
    .lean();
  }

  static async deleteMessageById(messageId) {
    return Message.findByIdAndDelete(messageId);
  }
}

export default ChatRepository;
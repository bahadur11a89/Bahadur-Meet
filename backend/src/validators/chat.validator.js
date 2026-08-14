import Joi from 'joi';

const objectId = () => Joi.string().hex().length(24);

const sendMessageSchema = Joi.object({
  meetingId: objectId().required(),
  content: Joi.string().min(1).max(5000).required(),
});

const privateMessageSchema = Joi.object({
  meetingId: objectId().required(), // Private chats are still scoped to a meeting
  receiverId: objectId().required(),
  content: Joi.string().min(1).max(5000).required(),
});

const getHistorySchema = Joi.object({
  meetingId: objectId().required(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(50),
});

const markReadSchema = Joi.object({
  messageId: objectId().required(),
});

const deleteMessageSchema = Joi.object({
  messageId: objectId().required(),
});

const validate = (schema, payload) => {
  return schema.validate(payload, { abortEarly: false });
};

export {
  validate,
  sendMessageSchema,
  privateMessageSchema,
  getHistorySchema,
  markReadSchema,
  deleteMessageSchema,
};
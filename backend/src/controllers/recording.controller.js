import httpStatus from 'http-status';
import asyncHandler from '../utils/asyncHandler.js';
import { Recording } from '../models/recording.model.js';

export const getUserRecordings = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?._id;
  if (!userId) {
    res.status(httpStatus.UNAUTHORIZED);
    throw new Error('Unauthorized access');
  }

  const recordings = await Recording.find({ owner: userId }).sort({ createdAt: -1 });

  return res.status(httpStatus.OK).json({
    success: true,
    data: recordings,
    recordings,
  });
});

export const getRecordingById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || req.user?._id;

  const recording = await Recording.findById(id);

  if (!recording) {
    res.status(httpStatus.NOT_FOUND);
    throw new Error('Recording not found');
  }

  if (recording.owner.toString() !== userId.toString()) {
    res.status(httpStatus.FORBIDDEN);
    throw new Error('Forbidden: You do not own this recording');
  }

  return res.status(httpStatus.OK).json({
    success: true,
    data: recording,
  });
});

export const createRecording = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?._id;
  const { title, storageUrl, duration, size, type, meetingId } = req.body;

  if (!title || !storageUrl) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Title and storageUrl are required');
  }

  const recording = await Recording.create({
    title: title.trim(),
    storageUrl: storageUrl.trim(),
    duration: duration || '30 mins',
    size: size || '150 MB',
    type: type || 'Cloud',
    owner: userId,
    meeting: meetingId || null,
  });

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Recording saved successfully',
    data: recording,
  });
});

export const deleteRecording = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || req.user?._id;

  const recording = await Recording.findById(id);

  if (!recording) {
    res.status(httpStatus.NOT_FOUND);
    throw new Error('Recording not found');
  }

  if (recording.owner.toString() !== userId.toString()) {
    res.status(httpStatus.FORBIDDEN);
    throw new Error('Forbidden: You do not own this recording');
  }

  await Recording.findByIdAndDelete(id);

  return res.status(httpStatus.OK).json({
    success: true,
    message: 'Recording deleted successfully',
  });
});

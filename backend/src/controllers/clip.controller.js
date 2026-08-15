import httpStatus from 'http-status';
import mongoose from 'mongoose';
import asyncHandler from '../utils/asyncHandler.js';
import { Clip } from '../models/clip.model.js';

export const getClips = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?._id;
  const clips = await Clip.find({ owner: userId }).sort({ createdAt: -1 });

  return res.status(httpStatus.OK).json({
    success: true,
    data: clips,
    clips,
  });
});

export const createClip = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?._id;
  const { title, description, url, duration } = req.body;

  if (!title || !url) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Title and url are required');
  }

  const clip = await Clip.create({
    title: title.trim(),
    description: description || '',
    url: url.trim(),
    duration: duration || '1 min',
    owner: userId,
  });

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Clip created successfully',
    data: clip,
  });
});

export const deleteClip = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || req.user?._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Invalid ObjectId format');
  }

  const clip = await Clip.findById(id);

  if (!clip) {
    res.status(httpStatus.NOT_FOUND);
    throw new Error('Clip not found');
  }

  if (clip.owner.toString() !== userId.toString()) {
    res.status(httpStatus.FORBIDDEN);
    throw new Error('Forbidden: You do not own this clip');
  }

  await Clip.findByIdAndDelete(id);

  return res.status(httpStatus.OK).json({
    success: true,
    message: 'Clip deleted successfully',
  });
});

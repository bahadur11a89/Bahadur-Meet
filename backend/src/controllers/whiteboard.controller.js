import httpStatus from 'http-status';
import mongoose from 'mongoose';
import asyncHandler from '../utils/asyncHandler.js';
import { Whiteboard } from '../models/whiteboard.model.js';

export const getWhiteboards = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?._id;
  const whiteboards = await Whiteboard.find({ owner: userId }).sort({ updatedAt: -1 });

  return res.status(httpStatus.OK).json({
    success: true,
    data: whiteboards,
    whiteboards,
  });
});

export const createWhiteboard = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?._id;
  const { title, canvasData } = req.body;

  if (!title || !title.trim()) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Title is required');
  }

  const whiteboard = await Whiteboard.create({
    title: title.trim(),
    canvasData: canvasData || [],
    owner: userId,
  });

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Whiteboard created successfully',
    data: whiteboard,
  });
});

export const updateWhiteboard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || req.user?._id;
  const { title, canvasData } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Invalid ObjectId format');
  }

  const whiteboard = await Whiteboard.findById(id);

  if (!whiteboard) {
    res.status(httpStatus.NOT_FOUND);
    throw new Error('Whiteboard not found');
  }

  if (whiteboard.owner.toString() !== userId.toString()) {
    res.status(httpStatus.FORBIDDEN);
    throw new Error('Forbidden: You do not own this whiteboard');
  }

  if (title !== undefined) whiteboard.title = title.trim();
  if (canvasData !== undefined) whiteboard.canvasData = canvasData;

  await whiteboard.save();

  return res.status(httpStatus.OK).json({
    success: true,
    message: 'Whiteboard updated successfully',
    data: whiteboard,
  });
});

export const deleteWhiteboard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || req.user?._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Invalid ObjectId format');
  }

  const whiteboard = await Whiteboard.findById(id);

  if (!whiteboard) {
    res.status(httpStatus.NOT_FOUND);
    throw new Error('Whiteboard not found');
  }

  if (whiteboard.owner.toString() !== userId.toString()) {
    res.status(httpStatus.FORBIDDEN);
    throw new Error('Forbidden: You do not own this whiteboard');
  }

  await Whiteboard.findByIdAndDelete(id);

  return res.status(httpStatus.OK).json({
    success: true,
    message: 'Whiteboard deleted successfully',
  });
});

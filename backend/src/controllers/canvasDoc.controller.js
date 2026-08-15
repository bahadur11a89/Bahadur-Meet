import httpStatus from 'http-status';
import mongoose from 'mongoose';
import asyncHandler from '../utils/asyncHandler.js';
import { CanvasDoc } from '../models/canvasDoc.model.js';

export const getCanvasDocs = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?._id;
  const docs = await CanvasDoc.find({ owner: userId }).sort({ updatedAt: -1 });

  return res.status(httpStatus.OK).json({
    success: true,
    data: docs,
    canvasDocs: docs,
  });
});

export const createCanvasDoc = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?._id;
  const { title, canvasData } = req.body;

  if (!title || !title.trim()) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Title is required');
  }

  const doc = await CanvasDoc.create({
    title: title.trim(),
    canvasData: canvasData || {},
    owner: userId,
  });

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Canvas document created successfully',
    data: doc,
  });
});

export const updateCanvasDoc = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || req.user?._id;
  const { title, canvasData } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Invalid ObjectId format');
  }

  const doc = await CanvasDoc.findById(id);

  if (!doc) {
    res.status(httpStatus.NOT_FOUND);
    throw new Error('Canvas document not found');
  }

  if (doc.owner.toString() !== userId.toString()) {
    res.status(httpStatus.FORBIDDEN);
    throw new Error('Forbidden: You do not own this canvas document');
  }

  if (title !== undefined) doc.title = title.trim();
  if (canvasData !== undefined) doc.canvasData = canvasData;

  await doc.save();

  return res.status(httpStatus.OK).json({
    success: true,
    message: 'Canvas document updated successfully',
    data: doc,
  });
});

export const deleteCanvasDoc = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || req.user?._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Invalid ObjectId format');
  }

  const doc = await CanvasDoc.findById(id);

  if (!doc) {
    res.status(httpStatus.NOT_FOUND);
    throw new Error('Canvas document not found');
  }

  if (doc.owner.toString() !== userId.toString()) {
    res.status(httpStatus.FORBIDDEN);
    throw new Error('Forbidden: You do not own this canvas document');
  }

  await CanvasDoc.findByIdAndDelete(id);

  return res.status(httpStatus.OK).json({
    success: true,
    message: 'Canvas document deleted successfully',
  });
});

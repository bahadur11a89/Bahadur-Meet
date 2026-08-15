import httpStatus from 'http-status';
import mongoose from 'mongoose';
import asyncHandler from '../utils/asyncHandler.js';
import { PaperDoc } from '../models/paperDoc.model.js';

export const getPaperDocs = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?._id;
  const docs = await PaperDoc.find({ owner: userId }).sort({ updatedAt: -1 });

  return res.status(httpStatus.OK).json({
    success: true,
    data: docs,
    paperDocs: docs,
  });
});

export const createPaperDoc = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?._id;
  const { title, content } = req.body;

  if (!title || !title.trim()) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Title is required');
  }

  const doc = await PaperDoc.create({
    title: title.trim(),
    content: content || '',
    owner: userId,
  });

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Paper document created successfully',
    data: doc,
  });
});

export const updatePaperDoc = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || req.user?._id;
  const { title, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Invalid ObjectId format');
  }

  const doc = await PaperDoc.findById(id);

  if (!doc) {
    res.status(httpStatus.NOT_FOUND);
    throw new Error('Paper document not found');
  }

  if (doc.owner.toString() !== userId.toString()) {
    res.status(httpStatus.FORBIDDEN);
    throw new Error('Forbidden: You do not own this paper document');
  }

  if (title !== undefined) doc.title = title.trim();
  if (content !== undefined) doc.content = content;

  await doc.save();

  return res.status(httpStatus.OK).json({
    success: true,
    message: 'Paper document updated successfully',
    data: doc,
  });
});

export const deletePaperDoc = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || req.user?._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Invalid ObjectId format');
  }

  const doc = await PaperDoc.findById(id);

  if (!doc) {
    res.status(httpStatus.NOT_FOUND);
    throw new Error('Paper document not found');
  }

  if (doc.owner.toString() !== userId.toString()) {
    res.status(httpStatus.FORBIDDEN);
    throw new Error('Forbidden: You do not own this paper document');
  }

  await PaperDoc.findByIdAndDelete(id);

  return res.status(httpStatus.OK).json({
    success: true,
    message: 'Paper document deleted successfully',
  });
});

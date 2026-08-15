import httpStatus from 'http-status';
import mongoose from 'mongoose';
import asyncHandler from '../utils/asyncHandler.js';
import { SheetDoc } from '../models/sheetDoc.model.js';

export const getSheetDocs = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?._id;
  const docs = await SheetDoc.find({ owner: userId }).sort({ updatedAt: -1 });

  return res.status(httpStatus.OK).json({
    success: true,
    data: docs,
    sheetDocs: docs,
  });
});

export const createSheetDoc = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?._id;
  const { title, gridData } = req.body;

  if (!title || !title.trim()) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Title is required');
  }

  const doc = await SheetDoc.create({
    title: title.trim(),
    gridData: gridData || [],
    owner: userId,
  });

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Sheet document created successfully',
    data: doc,
  });
});

export const updateSheetDoc = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || req.user?._id;
  const { title, gridData } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Invalid ObjectId format');
  }

  const doc = await SheetDoc.findById(id);

  if (!doc) {
    res.status(httpStatus.NOT_FOUND);
    throw new Error('Sheet document not found');
  }

  if (doc.owner.toString() !== userId.toString()) {
    res.status(httpStatus.FORBIDDEN);
    throw new Error('Forbidden: You do not own this sheet document');
  }

  if (title !== undefined) doc.title = title.trim();
  if (gridData !== undefined) doc.gridData = gridData;

  await doc.save();

  return res.status(httpStatus.OK).json({
    success: true,
    message: 'Sheet document updated successfully',
    data: doc,
  });
});

export const deleteSheetDoc = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || req.user?._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Invalid ObjectId format');
  }

  const doc = await SheetDoc.findById(id);

  if (!doc) {
    res.status(httpStatus.NOT_FOUND);
    throw new Error('Sheet document not found');
  }

  if (doc.owner.toString() !== userId.toString()) {
    res.status(httpStatus.FORBIDDEN);
    throw new Error('Forbidden: You do not own this sheet document');
  }

  await SheetDoc.findByIdAndDelete(id);

  return res.status(httpStatus.OK).json({
    success: true,
    message: 'Sheet document deleted successfully',
  });
});

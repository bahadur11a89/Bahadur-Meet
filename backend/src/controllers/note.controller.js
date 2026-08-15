import httpStatus from 'http-status';
import mongoose from 'mongoose';
import asyncHandler from '../utils/asyncHandler.js';
import { Note } from '../models/note.model.js';

export const getNotes = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?._id;
  const { search } = req.query;

  const query = { owner: userId };
  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [{ title: searchRegex }, { content: searchRegex }, { category: searchRegex }];
  }

  const notes = await Note.find(query).sort({ updatedAt: -1 });

  return res.status(httpStatus.OK).json({
    success: true,
    data: notes,
    notes,
  });
});

export const createNote = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?._id;
  const { title, content, category, meetingId } = req.body;

  if (!title || !title.trim()) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Title is required');
  }

  const note = await Note.create({
    title: title.trim(),
    content: content || '',
    category: category || 'General',
    owner: userId,
    meeting: meetingId || null,
  });

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Note created successfully',
    data: note,
  });
});

export const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || req.user?._id;
  const { title, content, category } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Invalid ObjectId format');
  }

  const note = await Note.findById(id);

  if (!note) {
    res.status(httpStatus.NOT_FOUND);
    throw new Error('Note not found');
  }

  if (note.owner.toString() !== userId.toString()) {
    res.status(httpStatus.FORBIDDEN);
    throw new Error('Forbidden: You do not own this note');
  }

  if (title !== undefined) note.title = title.trim();
  if (content !== undefined) note.content = content;
  if (category !== undefined) note.category = category;

  await note.save();

  return res.status(httpStatus.OK).json({
    success: true,
    message: 'Note updated successfully',
    data: note,
  });
});

export const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || req.user?._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Invalid ObjectId format');
  }

  const note = await Note.findById(id);

  if (!note) {
    res.status(httpStatus.NOT_FOUND);
    throw new Error('Note not found');
  }

  if (note.owner.toString() !== userId.toString()) {
    res.status(httpStatus.FORBIDDEN);
    throw new Error('Forbidden: You do not own this note');
  }

  await Note.findByIdAndDelete(id);

  return res.status(httpStatus.OK).json({
    success: true,
    message: 'Note deleted successfully',
  });
});

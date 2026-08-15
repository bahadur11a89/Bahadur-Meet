import httpStatus from 'http-status';
import mongoose from 'mongoose';
import asyncHandler from '../utils/asyncHandler.js';
import { Task } from '../models/task.model.js';

export const getTasks = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?._id;
  const { search, status } = req.query;

  const query = { owner: userId };
  if (status) query.status = status;
  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [{ title: searchRegex }, { description: searchRegex }];
  }

  const tasks = await Task.find(query).sort({ createdAt: -1 });

  return res.status(httpStatus.OK).json({
    success: true,
    data: tasks,
    tasks,
  });
});

export const createTask = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?._id;
  const { title, description, priority, dueDate, status } = req.body;

  if (!title || !title.trim()) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Title is required');
  }

  const task = await Task.create({
    title: title.trim(),
    description: description || '',
    priority: priority || 'medium',
    status: status || 'todo',
    dueDate: dueDate ? new Date(dueDate) : null,
    owner: userId,
  });

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Task created successfully',
    data: task,
  });
});

export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || req.user?._id;
  const { title, description, status, priority, dueDate } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Invalid ObjectId format');
  }

  const task = await Task.findById(id);

  if (!task) {
    res.status(httpStatus.NOT_FOUND);
    throw new Error('Task not found');
  }

  if (task.owner.toString() !== userId.toString()) {
    res.status(httpStatus.FORBIDDEN);
    throw new Error('Forbidden: You do not own this task');
  }

  if (title !== undefined) task.title = title.trim();
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;
  if (dueDate !== undefined) task.dueDate = dueDate ? new Date(dueDate) : null;

  await task.save();

  return res.status(httpStatus.OK).json({
    success: true,
    message: 'Task updated successfully',
    data: task,
  });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || req.user?._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Invalid ObjectId format');
  }

  const task = await Task.findById(id);

  if (!task) {
    res.status(httpStatus.NOT_FOUND);
    throw new Error('Task not found');
  }

  if (task.owner.toString() !== userId.toString()) {
    res.status(httpStatus.FORBIDDEN);
    throw new Error('Forbidden: You do not own this task');
  }

  await Task.findByIdAndDelete(id);

  return res.status(httpStatus.OK).json({
    success: true,
    message: 'Task deleted successfully',
  });
});

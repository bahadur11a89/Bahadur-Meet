import httpStatus from 'http-status';
import mongoose from 'mongoose';
import asyncHandler from '../utils/asyncHandler.js';
import { SlideDeck } from '../models/slideDeck.model.js';

export const getSlideDecks = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?._id;
  const decks = await SlideDeck.find({ owner: userId }).sort({ updatedAt: -1 });

  return res.status(httpStatus.OK).json({
    success: true,
    data: decks,
    slideDecks: decks,
  });
});

export const createSlideDeck = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?._id;
  const { title, slides } = req.body;

  if (!title || !title.trim()) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Title is required');
  }

  const deck = await SlideDeck.create({
    title: title.trim(),
    slides: slides || [{ title: 'Welcome Slide', content: 'Presentation content' }],
    owner: userId,
  });

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Slide deck created successfully',
    data: deck,
  });
});

export const updateSlideDeck = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || req.user?._id;
  const { title, slides } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Invalid ObjectId format');
  }

  const deck = await SlideDeck.findById(id);

  if (!deck) {
    res.status(httpStatus.NOT_FOUND);
    throw new Error('Slide deck not found');
  }

  if (deck.owner.toString() !== userId.toString()) {
    res.status(httpStatus.FORBIDDEN);
    throw new Error('Forbidden: You do not own this slide deck');
  }

  if (title !== undefined) deck.title = title.trim();
  if (slides !== undefined) deck.slides = slides;

  await deck.save();

  return res.status(httpStatus.OK).json({
    success: true,
    message: 'Slide deck updated successfully',
    data: deck,
  });
});

export const deleteSlideDeck = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || req.user?._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error('Invalid ObjectId format');
  }

  const deck = await SlideDeck.findById(id);

  if (!deck) {
    res.status(httpStatus.NOT_FOUND);
    throw new Error('Slide deck not found');
  }

  if (deck.owner.toString() !== userId.toString()) {
    res.status(httpStatus.FORBIDDEN);
    throw new Error('Forbidden: You do not own this slide deck');
  }

  await SlideDeck.findByIdAndDelete(id);

  return res.status(httpStatus.OK).json({
    success: true,
    message: 'Slide deck deleted successfully',
  });
});

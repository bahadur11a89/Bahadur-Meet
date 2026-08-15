import { Router } from 'express';
import { getSlideDecks, createSlideDeck, updateSlideDeck, deleteSlideDeck } from '../controllers/slideDeck.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.route('/')
  .get(getSlideDecks)
  .post(createSlideDeck);

router.route('/:id')
  .put(updateSlideDeck)
  .delete(deleteSlideDeck);

export default router;

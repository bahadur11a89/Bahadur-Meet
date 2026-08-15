import { Router } from 'express';
import { getWhiteboards, createWhiteboard, updateWhiteboard, deleteWhiteboard } from '../controllers/whiteboard.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.route('/')
  .get(getWhiteboards)
  .post(createWhiteboard);

router.route('/:id')
  .put(updateWhiteboard)
  .delete(deleteWhiteboard);

export default router;

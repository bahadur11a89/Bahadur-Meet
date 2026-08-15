import { Router } from 'express';
import { getClips, createClip, deleteClip } from '../controllers/clip.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.route('/')
  .get(getClips)
  .post(createClip);

router.route('/:id')
  .delete(deleteClip);

export default router;

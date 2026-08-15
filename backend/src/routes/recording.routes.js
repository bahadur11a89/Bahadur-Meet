import { Router } from 'express';
import { getUserRecordings, getRecordingById, createRecording, deleteRecording } from '../controllers/recording.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/')
  .get(authMiddleware, getUserRecordings)
  .post(authMiddleware, createRecording);

router.route('/:id')
  .get(authMiddleware, getRecordingById)
  .delete(authMiddleware, deleteRecording);

export default router;

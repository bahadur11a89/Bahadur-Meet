import { Router } from 'express';
import { getCanvasDocs, createCanvasDoc, updateCanvasDoc, deleteCanvasDoc } from '../controllers/canvasDoc.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.route('/')
  .get(getCanvasDocs)
  .post(createCanvasDoc);

router.route('/:id')
  .put(updateCanvasDoc)
  .delete(deleteCanvasDoc);

export default router;

import { Router } from 'express';
import { getPaperDocs, createPaperDoc, updatePaperDoc, deletePaperDoc } from '../controllers/paperDoc.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.route('/')
  .get(getPaperDocs)
  .post(createPaperDoc);

router.route('/:id')
  .put(updatePaperDoc)
  .delete(deletePaperDoc);

export default router;

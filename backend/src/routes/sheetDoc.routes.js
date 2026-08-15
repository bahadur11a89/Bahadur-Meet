import { Router } from 'express';
import { getSheetDocs, createSheetDoc, updateSheetDoc, deleteSheetDoc } from '../controllers/sheetDoc.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.route('/')
  .get(getSheetDocs)
  .post(createSheetDoc);

router.route('/:id')
  .put(updateSheetDoc)
  .delete(deleteSheetDoc);

export default router;

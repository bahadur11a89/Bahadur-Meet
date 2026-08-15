import { Router } from 'express';
import { getAdminUsers, getAdminStats } from '../controllers/admin.controller.js';
import authMiddleware, { requireAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);
router.use(requireAdmin);

router.route('/users').get(getAdminUsers);
router.route('/stats').get(getAdminStats);

export default router;

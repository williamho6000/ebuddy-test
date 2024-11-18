import { Router } from 'express';
import { updateUserController, fetchUserController } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.put('/update-user-data', authMiddleware, updateUserController);
router.get('/fetch-user-data/:userId', authMiddleware, fetchUserController);

export default router;
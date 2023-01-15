import { Router } from 'express';
const router = Router();
import statisticsController from '../controllers/statistics.controller.js';

router.get('/category', statisticsController.getCategoryStats);
router.get('/playCount/', statisticsController.getPlayCounts);
router.post('/playCount/', statisticsController.incrementPlayCount);

export default router;

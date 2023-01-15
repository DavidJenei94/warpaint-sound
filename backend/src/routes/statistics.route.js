import { Router } from 'express';
const router = Router();
import statisticsController from '../controllers/statistics.controller.js';

router.get('/category', statisticsController.getCategoryStats);
router.get('/playNumber/', statisticsController.getPlayNumbers);
router.post('/playNumber/', statisticsController.incrementPlayNumber);

export default router;

import { Router } from 'express';
const router = Router();
import statisticsController from '../controllers/statistics.controller.js';

router.get('/category', statisticsController.getCategoryStats);

export default router;

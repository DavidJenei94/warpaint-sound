import { Router } from 'express';
const router = Router();
import mediaController from '../controllers/media.controller.js';

router.get('/:filePath', mediaController.get);

export default router;
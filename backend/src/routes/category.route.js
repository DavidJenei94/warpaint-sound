import { Router } from 'express';
const router = Router();
import categoryController from '../controllers/category.controller.js';

router.get('/', categoryController.getAll);

export default router;

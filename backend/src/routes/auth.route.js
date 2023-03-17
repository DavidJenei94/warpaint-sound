import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import verifyToken from '../middlewares/auth.js';
import verifyReCaptcha from '../middlewares/reCaptcha.js';

const router = Router();

router.post('/login', verifyReCaptcha, authController.login);
router.post('/refresh', verifyToken, authController.refresh);

export default router;

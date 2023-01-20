import { Router } from 'express';
const router = Router();
import soundRecordController from '../controllers/soundRecord.controller.js';
import verifyToken from '../middlewares/auth.js';
import verifyReCaptcha from '../middlewares/reCaptcha.js';

router.get('/', soundRecordController.getAll);
router.post('/', verifyReCaptcha, soundRecordController.create);
router.get('/:soundRecordId', soundRecordController.get);
router.put('/:soundRecordId', verifyToken, soundRecordController.update);
router.delete('/:soundRecordId', verifyToken, soundRecordController.remove);

router.post('/:soundRecordId/report', verifyReCaptcha, soundRecordController.report);

export default router;

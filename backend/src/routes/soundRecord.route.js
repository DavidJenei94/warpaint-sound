import { Router } from 'express';
const router = Router();
import soundRecordController from '../controllers/soundRecord.controller.js';
import verifyToken from '../middlewares/auth.js';

router.get('/', soundRecordController.getAll);
router.post('/', soundRecordController.create);
router.get('/:soundRecordId', soundRecordController.get);
router.put('/:soundRecordId', verifyToken, soundRecordController.update);
router.delete('/:soundRecordId', verifyToken, soundRecordController.remove);

export default router;

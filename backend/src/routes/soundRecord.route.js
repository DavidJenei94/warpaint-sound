import { Router } from 'express';
const router = Router();
import soundRecordController from '../controllers/soundRecord.controller.js';

router.get('/', soundRecordController.getAll);
router.post('/', soundRecordController.create);
router.get('/:soundRecordId', soundRecordController.get);
router.put('/:soundRecordId', soundRecordController.update);
router.delete('/:soundRecordId', soundRecordController.remove);

export default router;

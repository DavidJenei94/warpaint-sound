import { Router } from 'express';
const router = Router();
import importController from '../controllers/import.controller.js';
import verifyToken from '../middlewares/auth.js';

router.post('/soundrecords', verifyToken, importController.importSoundRecords);
router.post(
  '/soundrecordplaylogs',
  verifyToken,
  importController.importSoundRecordPlayLogs
);

export default router;

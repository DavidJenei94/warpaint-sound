import { Router } from 'express';
const router = Router();
import exportController from '../controllers/export.controller.js';
import verifyToken from '../middlewares/auth.js';

router.get('/soundrecords', verifyToken, exportController.exportSoundRecords);
router.get(
  '/soundrecordplaylogs',
  verifyToken,
  exportController.exportSoundRecordPlayLogs
);

export default router;

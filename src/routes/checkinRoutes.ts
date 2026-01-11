import { Router } from 'express';
import CheckinController from '../controllers/CheckinController';

const router = Router();

// Endpoint: POST /api/checkin/self
router.post('/self', CheckinController.selfCheckin);

// Endpoint: POST /api/checkin/scan
router.post('/scan', CheckinController.scanCheckin);

export default router;

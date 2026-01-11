import { Router } from 'express';
import GuestController from '../controllers/GuestController';

const router = Router();

router.get('/', GuestController.getAll);
router.post('/', GuestController.create);
router.post('/:id/reset', GuestController.resetCheckin);

export default router;

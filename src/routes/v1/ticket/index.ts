import { Router } from 'express';
import { addTicket } from '../../../controllers/ticket/ticketController';

const router: Router = Router();

router.post('/tickets', addTicket)

export default router;

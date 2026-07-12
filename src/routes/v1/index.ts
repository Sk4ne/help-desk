import { Router } from 'express';
import ticketRouter from './ticket/index';

const router: Router = Router();

router.use(ticketRouter);

export default router;

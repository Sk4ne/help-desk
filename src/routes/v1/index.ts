import { Router } from 'express';
import categoryRouter from './category/index';
import ticketRouter from './ticket/index';

const router: Router = Router();

router.use(categoryRouter);
router.use(ticketRouter);

export default router;

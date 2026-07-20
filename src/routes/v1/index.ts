import { Router } from 'express';
import categoryRouter from './category/index';
import ticketRouter from './ticket/index';
import priorityRouter from './priority/index'

const router: Router = Router();

router.use(categoryRouter);
router.use(ticketRouter);
router.use(priorityRouter)

export default router;

import { Router } from "express";
import { createPriority, getPriorities } from "../../../controllers/priority/priorityController";
import { createPriorityValidator } from "../../../validators/priority/priorityValidator";
import { validateFields } from "../../../middlewares/validateFields";

const router: Router = Router();

router.post('/priorities', createPriorityValidator, validateFields,createPriority)
router.get('/priorities', getPriorities)

export default router; 
import { Router } from 'express';

import { createCategory, deleteAllCategories, getCategories } from '../../../controllers/category/categoryController';
import { createCategoryValidator } from '../../../validators/category/categoryValidator';
import { validateFields } from '../../../middlewares/validateFields';

const router: Router = Router();

router.post('/categories', createCategoryValidator, validateFields, createCategory);
router.get('/categories', getCategories);
/* Endpoint temporal para eliminar todas las categorias  */
router.delete('/categories', deleteAllCategories); 

export default router;

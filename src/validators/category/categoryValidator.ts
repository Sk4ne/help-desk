import { body, checkExact } from 'express-validator';

import { CATEGORY_NAME_VALUES } from '../../enums/category/categoryName';
import { type ICategory } from '../../interfaces/category/ICategory';
import { Category } from '../../models/Category';
import { type CategoryName } from '../../typeAlias/category/CategoryName';

const CATEGORY_NAME_SET: ReadonlySet<string> = new Set(CATEGORY_NAME_VALUES);
const DUPLICATE_CATEGORY_MESSAGE = 'Ya existe una categoria con ese nombre';

const isCategoryName = (value: unknown): value is CategoryName => (
  typeof value === 'string' && CATEGORY_NAME_SET.has(value)
);

export const createCategoryValidator = [
  checkExact([
    body('name')
      .exists({ values: 'falsy' })
      .withMessage('El nombre de la categoria es requerido')
      .bail()
      .custom((value: unknown): boolean => {
        if (!isCategoryName(value)) {
          throw new Error('El nombre de la categoria no es valido');
        }

        return true;
      })
      .bail()
      .custom(async (value: unknown): Promise<boolean> => {
        if (!isCategoryName(value)) {
          throw new Error('El nombre de la categoria no es valido');
        }

        const category: ICategory | null = await Category.findOne({ name: value });

        if (category) {
          throw new Error(DUPLICATE_CATEGORY_MESSAGE);
        }

        return true;
      }),
  ], {
    message: 'Solo se permite el campo name',
  }),
];

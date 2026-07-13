import { validCategoryName } from '../../enums/category/categoryName';

export type CategoryName = typeof validCategoryName.values[number];

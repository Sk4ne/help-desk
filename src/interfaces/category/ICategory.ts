import { type CategoryName } from '../../typeAlias/category/CategoryName';

export interface ICategory {
  name: CategoryName;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

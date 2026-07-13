import { model, Schema, type Model } from 'mongoose';

import { validCategoryName } from '../enums/category/categoryName';
import { type ICategory } from '../interfaces/category/ICategory';

const categorySchema = new Schema<ICategory>({
  name: { type: String, enum: validCategoryName},
  isActive: { type: Boolean, default: true}
},{ versionKey:false, timestamps: true });

export const Category: Model<ICategory> = model<ICategory>('Category', categorySchema);

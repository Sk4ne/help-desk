import { Request, Response } from 'express';

import { type ICategory } from '../../interfaces/category/ICategory';
import { Category } from '../../models/Category';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const body: ICategory = req.body;
    const category: ICategory = await Category.create(body)
    return res.status(201).json({
      msg: category
    })
  } catch (err: unknown) {
    const errorMessage:string = err instanceof Error ? err.message : 'Error interno del servidor';
    return res.status(500).json({
      msg: errorMessage
    });
  }
};


export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories: ICategory[] = await Category.find();
    return res.status(200).json({
      categories
    })
  } catch (err: unknown) {
    const errorMessage:string = err instanceof Error ? err.message : 'Error interno del servidor';
    return res.status(500).json({
      msg: errorMessage
    });
  }
};

export const deleteAllCategories = async (_req: Request, res: Response) => {
  try {
    await Category.deleteMany();
    return res.status(200).json({
      msg: 'Todas las categorias han sido eliminadas'
    })
  }
  catch (err: unknown) {
    const errorMessage:string = err instanceof Error ? err.message : 'Error interno del servidor';
    return res.status(500).json({
      msg: errorMessage
    });
  }
};
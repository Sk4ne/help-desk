
import { Request, Response } from 'express'
import { IPriority } from "../../interfaces/priority/IPriority";
import { Priority } from "../../models/Priority";


export const createPriority = async (req: Request, res: Response) => {
  try {
    const body: IPriority = req.body;
    const priority: IPriority = await Priority.create(body)
    return res.status(201).json({
      msg: priority
    })
  } catch (err: unknown) {
    const errorMessage:string = err instanceof Error ? err.message : 'Error interno del servidor';
    return res.status(500).json({
      msg: errorMessage
    });
  }
};


export const getPriorities = async (_req: Request, res: Response) => {
  try {
    const priorities: IPriority[] = await Priority.find();
    return res.status(200).json({
      priorities
    })
  } catch (err: unknown) {
    const errorMessage:string = err instanceof Error ? err.message : 'Error interno del servidor';
    return res.status(500).json({
      msg: errorMessage
    });
  }
};
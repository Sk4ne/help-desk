import { Request,Response, NextFunction } from "express";

export const addTicket = (req:Request, res:Response, next: NextFunction) => {
  try {
    console.log('ENTRE AL CONTROLLER ADD_TICKET')
    console.log({
      req,res,next
    })
  } catch (err) {
    
  }
}
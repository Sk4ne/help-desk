
import { check } from "express-validator";
import { PRIORITY_LEVEL_VALUES } from "../../enums/priority/priorityLevel";

export const createPriorityValidator = [
  check('level')
    .notEmpty()
    .withMessage('El nivel es requerido')
    /* .custom((value: PriorityLevel ) => {
      if(PRIORITY_LEVEL_VALUES.includes(value)){
        return true
      }
      throw new Error(`${value} no es una categoria valida`)
    }) */
    .isIn(PRIORITY_LEVEL_VALUES)
    .withMessage((value: unknown) : string => `${value} no es un nivel valido`)
  
]
import { validPriorityLevel } from '../../enums/priority/priorityLevel';

export type PriorityLevel = typeof validPriorityLevel.values[number];

import { type PriorityLevel } from '../../typeAlias/priority/PriorityLevel';

export interface IPriority {
  level: PriorityLevel;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

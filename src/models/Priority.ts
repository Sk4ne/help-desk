import { model, Schema } from 'mongoose';

import { validPriorityLevel } from '../enums/priority/priorityLevel';
import { type IPriority } from '../interfaces/priority/IPriority';

const prioritySchema = new Schema<IPriority>({
  level: { type: String, enum: validPriorityLevel },
  isActive: { type: Boolean, default: true },
}, { timestamps: true, versionKey: false });

export const Priority = model<IPriority>('Priority', prioritySchema);

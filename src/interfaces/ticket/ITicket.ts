import { type Types } from 'mongoose';

import { type TicketStatus } from '../../typeAlias/ticket/TicketStatus';

export interface ITicket {
  ticketNumber: string;
  title: string;
  categoryId: Types.ObjectId;
  priorityId: Types.ObjectId;
  description: string;
  status: TicketStatus;
  createdBy: Types.ObjectId;
  clientId: Types.ObjectId;
  assignedTo: Types.ObjectId | null;
  assignedAt: Date | null;
  closedAt: Date | null;
  closedBy: Types.ObjectId | null;
  solution: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

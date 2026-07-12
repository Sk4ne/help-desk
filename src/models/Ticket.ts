import { model, Schema, type Model } from 'mongoose';

import { type ITicket } from '../interfaces/ticket/ITicket';
import { validTicketStatus } from '../enums/ticket/ticketStatus';

const ticketSchema = new Schema<ITicket>(
  {
    ticketNumber: { // numero de ticket
      type: String,
    },
    title: { // titulo
      type: String,
    },
    categoryId: { // categoria
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    priorityId: { // prioridad
      type: Schema.Types.ObjectId,
      ref: 'Priority',
    },
    description: { // descripcion
      type: String,
    },
    status: { // estado
      type: String,
      enum: validTicketStatus,
      default: 'open',
    },
    createdBy: { // creado por
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    clientId: { // cliente
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    assignedTo: { // asignado a
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    assignedAt: { // fecha de asignacion
      type: Date,
      default: null,
    },
    closedAt: { // fecha de cierre
      type: Date,
      default: null,
    },
    closedBy: { // cerrado por
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    solution: { // solucion
      type: String,
      default: null,
    },
    isActive: { // activo
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Ticket: Model<ITicket> = model<ITicket>('Ticket', ticketSchema);

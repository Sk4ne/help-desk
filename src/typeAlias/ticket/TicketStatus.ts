import { validTicketStatus } from '../../enums/ticket/ticketStatus';

export type TicketStatus = typeof validTicketStatus.values[number];

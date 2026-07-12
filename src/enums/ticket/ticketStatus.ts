export const TICKET_STATUS_VALUES = ['open', 'inProgress', 'closed'] as const;

export const validTicketStatus = {
  values: TICKET_STATUS_VALUES,
  message: '{VALUE} no es un estado de ticket valido',
};

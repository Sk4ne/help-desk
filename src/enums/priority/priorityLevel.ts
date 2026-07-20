export const PRIORITY_LEVEL_VALUES = ['low', 'medium', 'high', 'urgent'] as const;

export const validPriorityLevel = {
  values: PRIORITY_LEVEL_VALUES,
  message: '{VALUE} no es un nivel de prioridad valido',
};

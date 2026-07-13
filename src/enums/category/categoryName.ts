export const CATEGORY_NAME_VALUES = ['serviceRequest', 'incident'] as const;

export const validCategoryName = {
  values: CATEGORY_NAME_VALUES,
  message: '{VALUE} no es un nombre de categoria valido',
};

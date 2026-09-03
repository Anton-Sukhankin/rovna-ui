const filters = [
  'input',
  'input-number',
  'range-input',

  'checkbox',
  'checkbox-group',
  'checkbox-group-search',
  'async-checkbox',

  'radio',
  'radio-group',
  'radio-group-search',
  'async-radio',

  'select',
  'async-select',

  'date-picker',
  'range-picker',

  'toggle',
] as const;

export type BaseFilter<T> = T & {
  component: (typeof filters)[number];
};

import { FormValidator } from '../types';

// FIXME: Импортировать из @rovna-ui/primitives/RangeInput
type RangeInputValue = number | null;

export const rangeInputValidator: FormValidator = (
  _,
  value: [RangeInputValue, RangeInputValue],
) => {
  const isError = value.some(v => v === null);

  if (isError) return Promise.reject();

  return Promise.resolve();
};

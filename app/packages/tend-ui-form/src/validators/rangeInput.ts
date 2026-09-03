import { Validator } from '@rovna-internal/form/core';

// FIXME: Импортировать из @rovna-ui/primitives/RangeInput
type RangeInputValue = number | null;

export const rangeInput: Validator = (value: [RangeInputValue, RangeInputValue]) => {
  if (value.some(v => v === null)) return Promise.reject();

  return Promise.resolve();
};

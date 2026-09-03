import { ChipsLabeledOption, ChipsOption, ChipsRawOption } from './types';

export const isLabeledChipsOption = (value: ChipsOption): value is ChipsLabeledOption => {
  return typeof value === 'object';
};

export const isRawChipsOption = (value: ChipsOption): value is ChipsRawOption => {
  return typeof value !== 'object';
};

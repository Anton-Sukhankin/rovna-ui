import { ChipsOption } from '../types';

export type ChipProps = {
  checked: boolean;
  option: ChipsOption;
  onClick: (value: ChipsOption) => void;
};

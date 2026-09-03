import { ReactNode } from 'react';

import { ChipsOption } from '../types';

export type ChipProps = {
  checked: boolean;
  value: ChipsOption;
  label?: ReactNode;
  onClick: (value: ChipsOption) => void;
};

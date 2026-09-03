import { TooltipProps } from '@rovna-internal/components/primitives/Tooltip/types';

import { Size } from './Size';

export type BaseInputProps = {
  allowClear?: boolean;
  clearIconTooltip?: Omit<TooltipProps, 'children'>;
  /**
   *
   * Component size. Use "medium" instead of "middle". "Middle" will be deprecated in order to code consistency
   * @param size - ['large', 'medium', 'small']
   */
  size?: Size;
};

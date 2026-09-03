import { FormItemProps as AntItemProps } from 'antd-core/es/form';

import { TooltipProps } from '@rovna-internal/components/primitives/Tooltip';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ItemProps<T = any> = Omit<AntItemProps<T>, 'tooltip'> & {
  tooltip?: TooltipProps;
  width?: number | string;
};

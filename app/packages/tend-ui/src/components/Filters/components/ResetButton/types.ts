import { ButtonProps } from '@rovna-internal/components/primitives/Button';
import { FilterConfig } from '@rovna-internal/components/components/Filters/core/types';

export type ResetButtonProps = Pick<ButtonProps, 'onClick'> & {
  filter: FilterConfig;
};

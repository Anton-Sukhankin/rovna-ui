import { ButtonProps } from '@rovna-ui/components/primitives';

import { FilterConfig } from '@rovna-internal/filters/core/types';

export type ResetButtonProps = Pick<ButtonProps, 'onClick'> & {
  filter: FilterConfig;
  INTERNAL_scope?: string;
};

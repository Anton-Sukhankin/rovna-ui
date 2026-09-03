import { ToggleProps } from '@rovna-ui/components/primitives';

import { FilterConfig } from '../..';

export type ToggleFilterProps = ToggleProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};

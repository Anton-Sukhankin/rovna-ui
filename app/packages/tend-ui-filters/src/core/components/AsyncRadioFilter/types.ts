import { AsyncRadioProps } from '@rovna-ui/components/components';

import { FilterConfig } from '../..';

export type AsyncRadioFilterProps = AsyncRadioProps & {
  INTERNAL_scope?: string;
  config: FilterConfig;
};

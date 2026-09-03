import React from 'react';
import { GenericObject } from '@rovna-ui/components/types';

import { CoreFiltersProps } from '@rovna-internal/filters/types';

export type RootProps<T extends GenericObject = GenericObject> = CoreFiltersProps<T> & {
  children?: React.ReactNode;
};

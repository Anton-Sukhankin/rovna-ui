import React from 'react';

import { GenericObject } from '@rovna-internal/components/types/GenericObject';
import { CoreFiltersProps } from '@rovna-internal/components/components/Filters/types';

export type RootProps<T extends GenericObject = GenericObject> = CoreFiltersProps<T> & {
  children?: React.ReactNode;
};

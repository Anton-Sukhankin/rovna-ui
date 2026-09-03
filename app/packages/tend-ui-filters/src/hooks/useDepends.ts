import React from 'react';
import pick from 'lodash/pick';
import { GenericObject } from '@rovna-ui/components/types';

import { FilterConfig } from '..';

export const useDepends = <P extends { config: FilterConfig }, V = GenericObject>(
  props: P,
  values: V,
) => {
  return React.useMemo(
    () => JSON.stringify(pick(values, props.config.depends || [])),
    [props.config.depends, values],
  );
};

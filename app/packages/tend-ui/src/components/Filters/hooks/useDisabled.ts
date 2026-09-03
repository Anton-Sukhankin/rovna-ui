import React from 'react';
import { isBoolean } from '@rovna-ui/utils/isBoolean';

import { GenericObject } from '@rovna-internal/components/types/GenericObject';

import { FilterConfig } from '..';

export const useDisabled = <
  P extends { config: FilterConfig; disabled?: boolean | [boolean, boolean] },
  V = GenericObject,
>(
  props: P,
  values: V,
) => {
  const disabled = React.useMemo(() => {
    if (isBoolean(props.disabled)) return props.disabled;
    if (!Array.isArray(props.config.requires)) return;
    if (!values) return;

    // Updating disabled state
    const disabled = props.config.requires.some(filterName => {
      const key = filterName as keyof V;
      const hasValue = values[key];

      return !hasValue;
    });

    return disabled;
  }, [props.config.requires, props.disabled, values]);

  return disabled;
};

import { extract as _extract } from '@rovna-ui/utils/extract';
import React from 'react';

import { FilterConfig } from './core';

export const pack = <T extends object>(payload: T, scope?: string): T => {
  if (scope) return { [scope]: payload } as T;

  return payload;
};

export const extract = <T extends object>(payload: T, scope?: string): T => {
  if (scope) return _extract(payload, [scope]) || {};

  return payload;
};

export const createReactKey = <T extends { key?: React.Key; id: string }>(config: T) => {
  return config.key ?? `rovna-ui-filters-list-filter-${config.id}`;
};

export const valuePropNameFactory = (config: FilterConfig) => {
  const isCheckable = ['toggle', 'checkbox', 'radio'].includes(
    config.component.component,
  );

  if (!isCheckable) return;

  return 'checked';
};

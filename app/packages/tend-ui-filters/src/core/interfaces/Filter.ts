import React from 'react';

import { FilterComponent, FilterConfig } from '../types';

export interface FilterCore {
  /**
   * `React.key`
   */
  key?: React.Key;
  /**
   * @internal Не для публичного использования
   */
  __filter: FilterConfig;
  /**
   * Уникальный `id` фильтра
   */
  id: string;
  getName: () => string | string[];
  getValuePropName: () => string | undefined;
  INTERNAL_getComponentProps: () => FilterComponent & {
    config: FilterConfig;
    INTERNAL_scope?: string;
  };
}
export interface FilterDisabling {
  getIsDisabled: () => boolean;
}
export interface Filter extends FilterCore, FilterDisabling {}
export interface Filters {
  getFilters: () => Filter[];
}

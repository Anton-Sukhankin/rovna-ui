import React from 'react';
import { SortOrder } from 'antd-core/es/table/interface';
import { FilterAlt } from '@rovna-ui/icons/FilterAlt';

import { useTheme } from '@rovna-internal/components/theme/Theme';

import { FilterListIcon } from './styled';
import { ColumnType } from '../types';

export const useColumns = <T,>(columns?: ColumnType<T>[]): ColumnType<T>[] => {
  const theme = useTheme();
  const filterIcon = React.useCallback(
    () => (
      <span aria-label='Фильтр'>
        <FilterAlt aria-hidden />
      </span>
    ),
    [],
  );
  const sortIcon = React.useCallback(
    (props: { sortOrder: SortOrder }) => {
      return <FilterListIcon $theme={theme} $sortOrder={props.sortOrder} />;
    },
    [theme],
  );

  if (!columns) return [];

  return columns.map(column => {
    return {
      ...column,
      filterIcon,
      sortIcon,
    };
  });
};

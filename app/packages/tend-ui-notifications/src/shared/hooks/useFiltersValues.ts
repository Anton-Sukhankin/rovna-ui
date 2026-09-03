import { useCallback, useMemo } from 'react';

import { useModulesInfoQuery } from '@notifications/api/hooks';
import { filtersLabels } from '@notifications/shared/consts/filters';
import { useFilters } from '@notifications/app/store/hooks';
import type { StoreFilter } from '@notifications/app/store/types';

export const useFiltersValues = () => {
  const filters = useFilters();
  const { modules } = useModulesInfoQuery();

  const parseFilterValue = useCallback(
    <K extends keyof StoreFilter>(
      filterKey: K,
      value: StoreFilter[K],
    ): string | undefined => {
      if (filterKey === 'preset') return;

      switch (filterKey) {
        case 'date': {
          const dateValues = (value as NonNullable<StoreFilter['date']>).map(v =>
            v.format('DD.MM.YYYY'),
          );

          return `${dateValues[0]} - ${dateValues[1]}`;
        }
        case 'contract':
        case 'module': {
          const arrValue = value as NonNullable<
            StoreFilter['module'] | StoreFilter['contract']
          >;

          const head = arrValue
            .slice(0, 2)
            .map(val =>
              filterKey === 'module'
                ? modules?.find(m => m.value === val)?.label || val
                : val,
            );
          const tail = arrValue.length > 2 ? ` + ${arrValue.length - 2}` : '';

          return head.join(', ') + tail;
        }
        default:
          break;
      }
    },
    [modules],
  );

  const filtersValues = useMemo(
    () =>
      Object.keys(filters)
        .map(_key => {
          const key = _key as keyof StoreFilter;

          const label = filtersLabels[key];
          const value = filters[key] ? parseFilterValue(key, filters[key]) : undefined;

          return { key, label, value };
        })
        .filter(v => !!v.value),
    [filters, parseFilterValue],
  );

  return filtersValues;
};

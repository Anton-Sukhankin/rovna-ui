import React from 'react';

import { Filters as _Filters } from '@rovna-internal/components/components/Filters';
import { useScopedFilters } from '@rovna-internal/components/features/Table/hooks/useScopedFilters';
import { useTableFilters } from '@rovna-internal/components/features/Table/hooks/useTableFilters';
import { useTableForm } from '@rovna-internal/components/features/Table/hooks/useTableForm';
import { FormName } from '@rovna-internal/components/features/Table/consts/FormName';

import { FiltersProps } from './types';
import { Scope } from '../../consts';

const Filters = (props: FiltersProps) => {
  const { form } = useTableForm();
  const { reset, filters, clear } = useTableFilters();
  const scopedFilters = useScopedFilters(filters);

  return (
    <_Filters
      debounce={false}
      {...props}
      form={form}
      name={FormName.Filters}
      filters={scopedFilters}
      onFiltersReset={reset}
      onFilterReset={clear}
      resetAllButtonProps={React.useMemo(
        () => ({
          onClick: () => {
            form.resetFields([Scope.Filters]);
            reset();
          },
        }),
        [form, reset],
      )}
    />
  );
};

Filters.displayName = 'Table.Filters';

export { Filters };

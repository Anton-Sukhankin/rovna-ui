import React from 'react';
import { HotFilters as _HotFilters } from '@rovna-ui/filters';

import { useTableFilters } from '@rovna-internal/table/Table/hooks/useTableFilters';
import { useTableForm } from '@rovna-internal/table/Table/hooks/useTableForm';
import { FormName } from '@rovna-internal/table/Table/consts/FormName';

import { Scope } from '../../consts';

const HotFilters = () => {
  const { form } = useTableForm();
  const { hotFilters } = useTableFilters();

  return (
    <_HotFilters
      INTERNAL_scope={Scope.Filters}
      debounce={false}
      form={form}
      name={FormName.Filters}
      filters={hotFilters}
    />
  );
};

HotFilters.displayName = 'Table.HotFilters';

export { HotFilters };

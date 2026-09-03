import React from 'react';
import { FilterPreset, Filters as _Filters } from '@rovna-ui/filters';
import { useCallbackRef } from '@rovna-ui/hooks';
import { GenericObject } from '@rovna-ui/types';

import { useTableFilters } from '@rovna-internal/table/Table/hooks/useTableFilters';
import { useTableForm } from '@rovna-internal/table/Table/hooks/useTableForm';
import { FormName } from '@rovna-internal/table/Table/consts/FormName';

import { FiltersProps } from './types';
import { Scope } from '../../consts';

const Filters = ({
  showPresets,
  presets,
  defaultPresets,
  loading,
  onClose,
  open,
  title,
  ...props
}: FiltersProps) => {
  const { form } = useTableForm();
  const { reset, filters, clear, onFilterValuesChange, onFilterValuesFinish } =
    useTableFilters();

  const handlePresetApply = useCallbackRef((preset: FilterPreset) => {
    onFilterValuesChange?.(preset.value, form.getFieldValue([Scope.Filters]));
  });
  const handleFilterValuesFinish = useCallbackRef((values: GenericObject) => {
    const state = values[Scope.Filters];
    onFilterValuesFinish(state);
  });

  return (
    <_Filters
      {...props}
      showPresets={showPresets}
      presets={presets}
      defaultPresets={defaultPresets}
      INTERNAL_scope={Scope.Filters}
      open={open}
      loading={loading}
      title={title}
      onClose={onClose}
      debounce={false}
      form={form}
      name={FormName.Filters}
      filters={filters}
      onFiltersReset={reset}
      onFilterValuesFinish={handleFilterValuesFinish}
      onFilterReset={clear}
      onPresetApply={handlePresetApply}
    />
  );
};

Filters.displayName = 'Table.Filters';

export { Filters };

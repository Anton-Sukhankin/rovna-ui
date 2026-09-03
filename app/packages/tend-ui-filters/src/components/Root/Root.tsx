import React from 'react';
import { GenericObject } from '@rovna-ui/components/types';

import { FiltersContext } from '@rovna-internal/filters/contexts/FiltersContext';
import { FiltersFormProvider } from '@rovna-internal/filters/core/FiltersFormProvider';

import { RootProps } from './types';
import { FiltersPresetsProvider } from '../../contexts/FiltersPresetsContext';
import { EXPERIMENTAL_useFilters as useFilters } from '../../core/useFilters';

const Root = <T extends GenericObject = GenericObject>(props: RootProps<T>) => {
  const {
    getApplyHandler,
    model,
    _presets,
    _onFilterValuesChange,
    handlePresetSave,
    handlePresetEdit,
    handlePresetRemove,
    handlePresetApply,
    handleReset,
    handleClear,
  } = useFilters(props);
  const { name, children, onFilterReset } = props;

  return (
    <FiltersFormProvider
      getScopedState={model.getScopeState}
      form={model.form}
      onReset={handleReset}
      onClear={handleClear}
    >
      <FiltersPresetsProvider
        presets={_presets}
        onEdit={handlePresetEdit}
        onRemove={handlePresetRemove}
        onSave={handlePresetSave}
        onApply={handlePresetApply}
      >
        <FiltersContext
          apply={getApplyHandler()}
          name={name}
          form={model.form}
          onFilterValuesChange={_onFilterValuesChange}
          onFilterReset={onFilterReset}
        >
          {children}
        </FiltersContext>
      </FiltersPresetsProvider>
    </FiltersFormProvider>
  );
};

Root.displayName = 'Filters.Root';

export { Root };

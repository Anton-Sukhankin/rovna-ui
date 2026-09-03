import React from 'react';
import mapValues from 'lodash/mapValues';
import { isUndefined } from '@rovna-ui/utils/isUndefined';
import { useControllableState, useDebouncedCallback } from '@rovna-ui/hooks';

import { useCallbackRef } from '@rovna-internal/components/hooks/useCallbackRef';
import { GenericObject } from '@rovna-internal/components/types/GenericObject';
import { useDependsGraph } from '@rovna-internal/components/components/Filters/hooks/useDependsGraph';
import { FiltersContext } from '@rovna-internal/components/components/Filters/contexts/FiltersContext';
import { useFiltersForm } from '@rovna-internal/components/components/Filters/core/useFiltersForm';
import { FiltersFormProvider } from '@rovna-internal/components/components/Filters/core/FiltersFormProvider';

import { RootProps } from './types';
import { FilterPreset } from '../../core/types';
import { FiltersPresetsProvider } from '../../contexts/FiltersPresetsContext';
import { extract, pack } from '../../utils';

const Root = <T extends GenericObject = GenericObject>({
  value,
  debounce,
  name,
  form,
  filters,
  children,
  onFilterValuesChange,
  onFilterReset,
  onFiltersReset,
  INTERNAL_scope,

  defaultPresets,
  presets,
  onPresetsChange,
  onPresetSave,
  onPresetEdit,
  onPresetRemove,
}: RootProps<T>) => {
  const model = useFiltersForm<T>(form, INTERNAL_scope);
  const dependencies = useDependsGraph(filters);
  const onValuesChange = useCallbackRef<
    NonNullable<RootProps<T>['onFilterValuesChange']>
  >((changed, values) => {
    const patched = mapValues(extract(values, INTERNAL_scope), (v, k) => {
      if (!dependencies[k]) return v;
      const [touched] = Object.keys(extract(changed, INTERNAL_scope));
      if (dependencies[k].includes(touched)) {
        model.set(k, undefined);

        return undefined;
      }

      return v;
    }) as T;

    onFilterValuesChange?.(changed, pack(patched, INTERNAL_scope));
  });

  const _onFilterValuesChange = useDebouncedCallback(onValuesChange, debounce);

  const [_presets = [], _setPresets] = useControllableState({
    defaultValue: defaultPresets,
    value: presets,
    onChange: onPresetsChange,
  });
  const save = useCallbackRef<(payload: FilterPreset) => void>(payload => {
    _setPresets((previousPresets = []) => [...previousPresets, payload]);
  });
  const edit = useCallbackRef<(payload: FilterPreset) => void>(payload => {
    _setPresets((previousPresets = []) =>
      previousPresets.map(previousPreset =>
        previousPreset.id === payload.id ? payload : previousPreset,
      ),
    );
  });
  const remove = useCallbackRef<(id: string) => void>(id => {
    _setPresets((previousPresets = []) =>
      previousPresets.filter(previousPreset => previousPreset.id !== id),
    );
  });
  const handlePresetSave = useCallbackRef<(preset: FilterPreset) => void>(preset => {
    save(preset);
    onPresetSave?.(preset);
  });
  const handlePresetEdit = useCallbackRef<(preset: FilterPreset) => void>(preset => {
    edit(preset);
    onPresetEdit?.(preset);
  });
  const handlePresetRemove = useCallbackRef<(preset: FilterPreset) => void>(preset => {
    remove(preset.id);
    onPresetRemove?.(preset);
  });
  const handlePresetApply = useCallbackRef<(preset: FilterPreset) => void>(preset => {
    model.fill(preset.value);
    const values = model.getState();
    const changed = INTERNAL_scope ? { [INTERNAL_scope]: preset.value } : preset.value;
    _onFilterValuesChange?.(changed, values);
  });

  React.useEffect(() => {
    if (isUndefined(value)) return;
    model.form.setFieldsValue(value);
  }, [model.form, value]);

  const handleReset = useCallbackRef(() => {
    const values = model.reset();
    _onFilterValuesChange?.(values, values);
    onFiltersReset?.();
  });
  const handleClear = useCallbackRef<(name: string) => void>(name => {
    const [touched, values] = model.clear(name);
    _onFilterValuesChange?.(touched, values);
    onFilterReset?.(name);
  });

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
          value={React.useMemo(
            () => ({
              name,
              form: model.form,
              onFilterValuesChange: _onFilterValuesChange,
              onFilterReset,
            }),
            [_onFilterValuesChange, model.form, name, onFilterReset],
          )}
        >
          {children}
        </FiltersContext>
      </FiltersPresetsProvider>
    </FiltersFormProvider>
  );
};

Root.displayName = 'Filters.Root';

export { Root };

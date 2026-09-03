import React from 'react';
import { GenericObject } from '@rovna-ui/types';
import {
  useCallbackRef,
  useControllableState,
  useDebouncedCallback,
} from '@rovna-ui/hooks';
import mapValues from 'lodash/mapValues';
import { LocalStorage, isBoolean, isUndefined } from '@rovna-ui/utils';

import { CoreFiltersProps } from '@rovna-internal/filters/types';
import { useDependsGraph } from '@rovna-internal/filters/hooks/useDependsGraph';

import { extract, pack, valuePropNameFactory } from '../utils';
import { useFiltersForm } from './useFiltersForm';
import { FilterPreset } from './types';
import { Filter } from './interfaces/Filter';
import { mapSavedPresetsToPresets, patch } from './utils';

type UseFiltersParameters<T extends GenericObject = GenericObject> = CoreFiltersProps<T>;

/**
 * TODO:
 * Headless вариант фильтров
 * Дописать:
 * - логику работы с пресетами
 */
export const EXPERIMENTAL_useFilters = <T extends GenericObject = GenericObject>({
  defaultValue,
  value,
  debounce,
  form,
  filters,
  onFilterValuesChange,
  onFilterValuesFinish,
  onFilterReset,
  onFiltersReset,
  INTERNAL_scope,

  localStorage,
  defaultPresets,
  presets,
  onPresetsChange,
  onPresetSave,
  onPresetEdit,
  onPresetRemove,
  onPresetApply,
}: UseFiltersParameters<T>) => {
  const isControlled = typeof value !== 'undefined';

  const model = useFiltersForm<T>(form, INTERNAL_scope);
  const dependencies = useDependsGraph(filters);
  const onValuesChange = useCallbackRef<
    NonNullable<CoreFiltersProps<T>['onFilterValuesChange']>
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

  const [_presets = [], __setPresets] = useControllableState({
    defaultValue: (() => {
      if (localStorage) {
        const saved = LocalStorage.get<FilterPreset[]>(
          `[rovna-ui-filters][presets][${localStorage}]`,
        );
        if (saved) return mapSavedPresetsToPresets(saved);
      }
      if (defaultPresets) mapSavedPresetsToPresets(defaultPresets);

      return defaultPresets;
    })(),
    value: presets,
    onChange: presets => {
      onPresetsChange?.(presets);
      if (!localStorage) return;
      LocalStorage.set(`[rovna-ui-filters][presets][${localStorage}]`, presets);
    },
  });
  /**
   * Метод сохранения пресета
   */
  const save = useCallbackRef<(payload: FilterPreset) => void>(payload => {
    __setPresets((previousPresets = []) => [...previousPresets, payload]);
  });
  /**
   * Метод редактирования пресета
   */
  const edit = useCallbackRef<(payload: FilterPreset) => void>(payload => {
    __setPresets((previousPresets = []) =>
      previousPresets.map(previousPreset =>
        previousPreset.id === payload.id ? payload : previousPreset,
      ),
    );
  });
  /**
   * Метод удаления пресета
   */
  const remove = useCallbackRef<(id: string) => void>(id => {
    __setPresets((previousPresets = []) =>
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
    _onFilterValuesChange?.(pack(preset.value, INTERNAL_scope), values);
    onPresetApply?.(preset);
  });
  /**
   * Метод применения фильтров по кнопке
   */
  const apply = React.useCallback(() => {
    const values = model.getState();
    onFilterValuesFinish?.(values);
  }, [model, onFilterValuesFinish]);

  React.useEffect(() => {
    if (!isUndefined(value) || isUndefined(defaultValue)) return;
    model.form.setFieldsValue(pack(defaultValue, INTERNAL_scope));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (isUndefined(value)) return;
    const state = model.getScopeState();
    const next = patch(state, value);
    model.form.setFieldsValue(pack(next, INTERNAL_scope));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, value]);

  const handleReset = useCallbackRef(() => {
    const values = model.getScopeState();

    if (!isControlled) {
      model.reset();
    }

    const state = Object.entries(values).map(([key]) => [key, undefined]);
    const next = Object.fromEntries(state);
    const packed = pack(next, INTERNAL_scope);
    _onFilterValuesChange?.(packed, packed);
    onFiltersReset?.();
  });
  const handleClear = useCallbackRef<(name: string) => void>(name => {
    const [touched, values] = model.clear(name);
    _onFilterValuesChange?.(touched, values);
    onFilterReset?.(name);
  });

  const __filters = React.useMemo<Filter[]>(
    () =>
      filters.map(filter => ({
        /**
         * @internal Не для публичного использования
         */
        __filter: filter,
        key: filter.key,
        id: filter.id,
        getName: () => (INTERNAL_scope ? [INTERNAL_scope, filter.name] : filter.name),
        getValuePropName: () => valuePropNameFactory(filter),
        INTERNAL_getComponentProps: () => ({
          ...filter.component,
          config: filter,
          INTERNAL_scope,
        }),
        getIsDisabled: () => {
          if (isBoolean(filter.component.disabled)) return filter.component.disabled;
          if (!Array.isArray(filter.requires)) return false;
          if (!model.getState()) return false;

          const disabled = filter.requires.some(filterName => {
            const key = filterName;
            const hasValue = model.get(key);

            return !hasValue;
          });

          return disabled;
        },
        /**
         * Возвращает функцию для сброса фильтра
         */
        getResetHandler: () => handleClear(filter.name),
      })),
    [INTERNAL_scope, filters, handleClear, model],
  );

  return {
    /**
     * Возвращает сущность `form` для компонента `Form` из `antd
     */
    getAntdFormInstance: () => model.form,
    /**
     * Возвращает обработчик для компонента `Form` из `antd
     */
    getAntdFormValuesChangeHandler: () => _onFilterValuesChange,
    /**
     * Возвращает функцию для сброса всех фильтров
     */
    getResetAllHandler: () => handleReset,
    /**
     * Возвращает функцию для применения выбранных фильтров
     */
    getApplyHandler: () => apply,
    getFilters: () => __filters,

    /**
     * @internal  Не для публичного использования
     */
    model,
    /**
     * @internal  Не для публичного использования
     */
    _presets,
    /**
     * @internal  Не для публичного использования
     */
    handlePresetSave,
    /**
     * @internal  Не для публичного использования
     */
    handlePresetEdit,
    /**
     * @internal  Не для публичного использования
     */
    handlePresetRemove,
    /**
     * @internal  Не для публичного использования
     */
    handlePresetApply,
    /**
     * @internal  Не для публичного использования
     */
    handleReset,
    /**
     * @internal  Не для публичного использования
     */
    handleClear,
    /**
     * @internal  Не для публичного использования
     */
    _onFilterValuesChange,
  };
};

import React from 'react';
import { INTERNAL_RovnaUILogger as RovnaUILogger, isUndefined } from '@rovna-ui/utils';
import { useCallbackRef, useDebouncedCallback } from '@rovna-ui/hooks';
import { Form } from '@rovna-ui/components/components/Form';
import { GenericObject } from '@rovna-ui/types';
import {
  ColumnConfig,
  ColumnPosition,
} from '@rovna-ui/components/components/ColumnsSettings/types';
import isEmpty from 'lodash/isEmpty';

import {
  ColumnsContext,
  ColumnsContextType,
  DefaultValueContext,
  FiltersContext,
  FiltersContextType,
  FormContext,
  FormContextType,
  SortersContext,
  SortersContextType,
  ValueContext,
} from '@rovna-internal/table/Table/contexts';
import { Scope } from '@rovna-internal/table/Table/consts/Scope';
import { SortingOrder } from '@rovna-internal/table/Table/types';

import { RootProps } from './types';
import { useFormChangeCallback } from './hooks';
import { patch } from './utils';

const Root = <
  TFilter extends GenericObject = GenericObject,
  TColumn extends ColumnConfig = ColumnConfig,
>({
  debounce,

  form,
  value,
  defaultValue,

  settings,

  columns,
  filters = [],
  hotFilters = [],
  sorters = [],

  children,

  onFilterValuesChange,
  onSorterValuesChange,
  onSearchValueChange,

  onColumnVisibilityChange,
  onColumnPinningChange,
  onFilterValuesFinish,

  onFilterReset,
  onFiltersReset,
}: RootProps<TFilter, TColumn>) => {
  if (process.env.NODE_ENV === 'development') {
    if ((onColumnPinningChange || onColumnVisibilityChange) && settings) {
      RovnaUILogger.warning([
        'Свойства "onColumnPinningChange", "onColumnVisibilityChange" и "settings" не могут использоваться одновременно',
        '',
        'Возможно, вы пытаетесь использовать старую реализацию "<ColumnsSettings />" вместе с новой "<DrawerColumnsSettings />"',
        '',
        'Используйте только что-то одно',
      ]);
    }

    if (columns && settings) {
      RovnaUILogger.warning([
        'При использовании свойства "settings" и пакета "@rovna-ui/columns-settings" передавать "columns" явно больше необязательно',
      ]);
    }
  }

  const [_form] = Form.useForm(form);
  const __columns = React.useMemo(() => {
    if (columns) return columns;
    if (settings) return settings.__getTableRootColumns();

    return [];
  }, [columns, settings]);

  const debouncedOnFilterValuesChange = useDebouncedCallback<
    NonNullable<RootProps<TFilter, TColumn>['onFilterValuesChange']>
  >((...params) => {
    onFilterValuesChange?.(...params);
  }, debounce);

  const debouncedOnSorterValuesChange = useDebouncedCallback<
    NonNullable<RootProps<TFilter, TColumn>['onSorterValuesChange']>
  >((...params) => {
    onSorterValuesChange?.(...params);
  }, debounce);

  const debouncedOnSearchValueChange = useDebouncedCallback<
    NonNullable<RootProps<TFilter, TColumn>['onSearchValueChange']>
  >((...params) => {
    onSearchValueChange?.(...params);
  }, debounce);

  const handleFormChange = useFormChangeCallback({
    filters,
    onFilterValuesChange: debouncedOnFilterValuesChange,
    onSorterValuesChange: debouncedOnSorterValuesChange,
    onSearchValueChange: debouncedOnSearchValueChange,
  });

  const clear = React.useCallback(
    (name: string) => {
      _form.setFieldValue([Scope.Filters, name], undefined);
      const values = _form.getFieldValue(Scope.Filters) as TFilter;
      const changed = { [name]: undefined } as Partial<TFilter>;
      debouncedOnFilterValuesChange?.(changed, values);
      onFilterReset?.();
    },
    [_form, debouncedOnFilterValuesChange, onFilterReset],
  );

  const reset = React.useCallback(() => {
    const values = _form.getFieldsValue()[Scope.Filters];
    debouncedOnFilterValuesChange?.(values, values);
    onFiltersReset?.();
  }, [_form, debouncedOnFilterValuesChange, onFiltersReset]);

  const pin = React.useCallback(
    (position: ColumnPosition, column: TColumn) => {
      onColumnPinningChange?.(position, column);
      settings?.getColumnPinningChangeHandler()(column, position);
      setTimeout(() => {
        settings?.getApplyHandler()();
      }, 0);
    },
    [onColumnPinningChange, settings],
  );

  const display = React.useCallback(
    (visible: boolean, column: TColumn) => {
      onColumnVisibilityChange?.(visible, column);
      settings?.getColumnVisibilityChangeHandler()?.(column, visible);
      setTimeout(() => {
        settings?.getApplyHandler()();
      }, 0);
    },
    [onColumnVisibilityChange, settings],
  );

  /**
   * Заполняем форму сортировок дефолтными значениями
   */
  React.useEffect(() => {
    /**
     * Если компонент в контролируемом режиме,
     * то игнорируем дефолтные значения
     */
    if (!isUndefined(value?.sorters)) return;
    /**
     * Создаем дефолтный стейт сортировок
     */
    const state = sorters.reduce<Record<string, SortingOrder>>((result, sorter) => {
      if (Array.isArray(sorter.name)) return result;

      result[sorter.name] = 'default';

      return result;
    }, {});

    /**
     * Если дефолтное состояние не передано,
     * то заполняем дефолтным стейтом
     */
    if (isUndefined(defaultValue?.sorters)) {
      _form.setFieldValue(Scope.Sorters, state);

      return;
    }

    /**
     * Проходим по дефолтному стейте
     */
    const entries = Object.entries(state).map(([key, value]) => {
      /**
       * Если нашли совпадения по переданному деофолтному стейту,
       * то затираем этим значением
       */
      if (defaultValue.sorters?.[key]) return [key, defaultValue?.sorters?.[key]];

      return [key, value];
    });
    const next: Record<keyof TFilter, SortingOrder> = Object.fromEntries(entries);
    /**
     * Сеттим стейт
     */
    _form.setFieldValue(Scope.Sorters, next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Заполняем форму фильтров дефолтными значениями
   */
  React.useEffect(() => {
    /**
     * Если компонент в контролируемом режиме,
     * то игнорируем дефолтные значения
     */
    if (!isUndefined(value?.filters)) return;
    /**
     * Создаем дефолтный стейт сортировок
     */
    const state = filters.reduce<GenericObject>((result, filter) => {
      if (Array.isArray(filter.name)) return result;

      result[filter.name] = undefined;

      return result;
    }, {});

    /**
     * Если дефолтное состояние не передано,
     * то заполняем дефолтным стейтом
     */
    if (isUndefined(defaultValue?.filters)) {
      _form.setFieldValue(Scope.Filters, state);

      return;
    }

    /**
     * Проходим по дефолтному стейте
     */
    const entries = Object.entries(state).map(([key, value]) => {
      /**
       * Если нашли совпадения по переданному деофолтному стейту,
       * то затираем этим значением
       */
      if (defaultValue.filters?.[key]) return [key, defaultValue?.filters?.[key]];

      return [key, value];
    });
    const next: GenericObject = Object.fromEntries(entries);
    /**
     * Сеттим стейт
     */
    _form.setFieldValue(Scope.Filters, next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Контролируемый режим таблицы для сортировок
   */
  React.useEffect(() => {
    if (isUndefined(value?.sorters)) return;
    const prev: Record<keyof TFilter, SortingOrder> = _form.getFieldValue(Scope.Sorters);
    const next = patch(prev, value.sorters, 'default');
    _form.setFieldValue(Scope.Sorters, next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.sorters]);

  /**
   * Контролируемый режим таблицы для фильтров
   */
  React.useEffect(() => {
    if (isUndefined(value?.filters)) return;
    const previous = _form.getFieldValue(Scope.Filters);
    const next = patch(previous, value.filters);
    _form.setFieldValue(Scope.Filters, next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.filters]);

  /**
   * Контролируемый режим таблицы для поиска
   * @deprecated
   */
  React.useEffect(() => {
    if (isEmpty(value?.search)) {
      _form.setFieldValue(Scope.Search, '');

      return;
    }

    _form.setFieldValue(Scope.Search, value?.search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.search]);

  const handleFilterValuesFinish = useCallbackRef((values: TFilter) => {
    onFilterValuesFinish?.(values);
  });

  return (
    <FormContext value={React.useMemo<FormContextType>(() => ({ form: _form }), [_form])}>
      <DefaultValueContext.Provider
        value={React.useMemo(() => defaultValue, [defaultValue])}
      >
        <ValueContext.Provider value={React.useMemo(() => value, [value])}>
          <SortersContext
            value={React.useMemo<SortersContextType>(() => ({ sorters }), [sorters])}
          >
            <FiltersContext
              value={React.useMemo<FiltersContextType>(
                () => ({
                  form,
                  filters,
                  hotFilters,
                  clear,
                  reset,
                  onFilterValuesChange: debouncedOnFilterValuesChange,
                  onFilterValuesFinish: handleFilterValuesFinish,
                }),
                [
                  form,
                  filters,
                  hotFilters,
                  clear,
                  reset,
                  debouncedOnFilterValuesChange,
                  handleFilterValuesFinish,
                ],
              )}
            >
              <ColumnsContext
                value={React.useMemo(
                  () =>
                    ({ columns: __columns, display, pin } as ColumnsContextType<TColumn>),
                  [__columns, display, pin],
                )}
              >
                <Form.Provider onFormChange={handleFormChange}>{children}</Form.Provider>
              </ColumnsContext>
            </FiltersContext>
          </SortersContext>
        </ValueContext.Provider>
      </DefaultValueContext.Provider>
    </FormContext>
  );
};

Root.displayName = 'Root';

export { Root };

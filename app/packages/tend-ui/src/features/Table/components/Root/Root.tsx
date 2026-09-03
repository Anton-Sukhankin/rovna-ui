import React from 'react';
import { isUndefined } from '@rovna-ui/utils/isUndefined';
import { useDebouncedCallback } from '@rovna-ui/hooks';

import { Form } from '@rovna-internal/components/components/Form';
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
} from '@rovna-internal/components/features/Table/contexts';
import { GenericObject } from '@rovna-internal/components/types/GenericObject';
import { ColumnConfig, ColumnPosition } from '@rovna-internal/components/components/ColumnsSettings/types';
import { Scope } from '@rovna-internal/components/features/Table/consts/Scope';

import { RootProps } from './types';
import { useFormChangeCallback } from './hooks';

const Root = <
  TFilter extends GenericObject = GenericObject,
  TColumn extends ColumnConfig = ColumnConfig,
>({
  debounce,

  form,
  value,
  defaultValue,

  columns = [],
  filters = [],
  sorters = [],

  children,

  onFilterValuesChange,
  onSorterValuesChange,
  onSearchValueChange,

  onColumnVisibilityChange,
  onColumnPinningChange,

  onFilterReset,
  onFiltersReset,
}: RootProps<TFilter, TColumn>) => {
  const [_form] = Form.useForm(form);

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
    // FIXME: Исправить типизацию
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (name: any) => {
      _form.resetFields([name]);
      const values = _form.getFieldValue(Scope.Filters) as TFilter;
      const _name = name[1];
      const changed = { [_name]: undefined } as Partial<TFilter>;
      onFilterValuesChange?.(changed, values);
      onFilterReset?.();
    },
    [_form, onFilterReset, onFilterValuesChange],
  );

  const reset = React.useCallback(() => {
    const values = _form.getFieldsValue()[Scope.Filters];
    onFilterValuesChange?.(values, values);
    onFiltersReset?.();
  }, [_form, onFilterValuesChange, onFiltersReset]);

  const pin = React.useCallback(
    (position: ColumnPosition, column: TColumn) => {
      onColumnPinningChange?.(position, column);
    },
    [onColumnPinningChange],
  );

  const display = React.useCallback(
    (visible: boolean, column: TColumn) => {
      onColumnVisibilityChange?.(visible, column);
    },
    [onColumnVisibilityChange],
  );

  /**
   * Дефолтные значения инициализируем только единожды
   */
  React.useEffect(() => {
    if (isUndefined(defaultValue)) return;
    // FIXME: Fix types collisions
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    _form.setFieldsValue(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (isUndefined(value)) return;
    // FIXME: Fix types collisions
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    _form.setFieldsValue(value);
  }, [_form, value]);

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
                () => ({ form, filters, clear, reset }),
                [filters, form, clear, reset],
              )}
            >
              <ColumnsContext
                value={React.useMemo(
                  () => ({ columns, display, pin } as ColumnsContextType<TColumn>),
                  [columns, display, pin],
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

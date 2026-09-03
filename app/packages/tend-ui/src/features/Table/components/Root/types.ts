import React from 'react';
import { DebounceOptions } from '@rovna-ui/hooks';

import {
  ColumnConfig,
  FilterConfig,
  SorterConfig,
  SortingOrder,
  TableForm,
} from '@rovna-internal/components/features/Table/types';
import { FormInstance } from '@rovna-internal/components/components/Form';
import { ColumnPosition } from '@rovna-internal/components/components/ColumnsSettings/types';
import { GenericObject } from '@rovna-internal/components/types/GenericObject';

export type RootProps<
  TFilter extends GenericObject = GenericObject,
  TColumn extends ColumnConfig = ColumnConfig,
> = {
  debounce?: boolean | DebounceOptions;
  /**
   * @deprecated Устарело. Низкоуровневое API, не использовать в продакшене
   */
  form?: FormInstance<TableForm<TFilter>>;
  defaultValue?: Partial<TableForm<TFilter>>;
  value?: Partial<TableForm<TFilter>>;

  /**
   * @description Фильтры
   */
  filters?: FilterConfig[];
  /**
   * @description Колонки
   */
  columns?: TColumn[];
  /**
   * @description Сортировки
   */
  sorters?: SorterConfig[];

  children?: React.ReactNode;
  /**
   *
   * @description Вызывается при изменении фильтров
   * @param changed Измененные фильтры
   * @param values Все фильтры
   */
  onFilterValuesChange?: (changed: Partial<TFilter>, values: TFilter) => void;
  onFilterReset?: () => void;
  onFiltersReset?: () => void;

  /**
   * @description Вызывается при изменении сортировки
   * @param changed Измененные сортировки
   * @param values Все сортировки
   */
  onSorterValuesChange?: (
    changed: Partial<Record<keyof TFilter, SortingOrder>>,
    values: Record<keyof TFilter, SortingOrder>,
  ) => void;

  /**
   *
   * @description Вызывается при изменении поисковой строки
   * @param changed Объект формы поиска
   * @param value Введенное значение
   */
  onSearchValueChange?: (changed: { search: string }, value: string) => void;

  /**
   * @description Вызывается при изменении видимости колонок
   * @param visible Видимость
   * @param column Колонка
   */
  onColumnVisibilityChange?: (visible: boolean, column: TColumn) => void;

  /**
   * @description Вызывается при изменении закрепления колонок
   * @param position Позиция
   * @param column Колонка
   */
  onColumnPinningChange?: (position: ColumnPosition, column: TColumn) => void;
};

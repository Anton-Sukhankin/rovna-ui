import React from 'react';
import { DebounceOptions } from '@rovna-ui/hooks';
import { FormInstance } from '@rovna-ui/components/components/Form';
import { ColumnPosition } from '@rovna-ui/components/components/ColumnsSettings/types';
import { GenericObject } from '@rovna-ui/types';
import { ColumnsSettings } from '@rovna-ui/columns-settings';

import {
  ColumnConfig,
  FilterConfig,
  SorterConfig,
  SortingOrder,
  TableForm,
} from '@rovna-internal/table/Table/types';

export type RootProps<
  TFilter extends GenericObject = GenericObject,
  TColumn extends ColumnConfig = ColumnConfig,
> = {
  /**
   * Настройка `debounce` поведения всех методов
   */
  debounce?: boolean | DebounceOptions;
  /**
   * @deprecated Устарело. Низкоуровневое API, не использовать в продакшене
   */
  form?: FormInstance<TableForm<TFilter>>;
  defaultValue?: Partial<TableForm<TFilter>>;
  value?: Partial<TableForm<TFilter>>;

  /**
   * Модель для управления настройками колонок
   */
  settings?: ColumnsSettings<TColumn>;

  /**
   * @description Фильтры
   */
  filters?: FilterConfig[];
  /**
   * @description Горячие фильтры
   */
  hotFilters?: FilterConfig[];
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
  /**
   * @description Вызывается при применении фильтров по кнопке
   * @param values Все фильтры
   */
  onFilterValuesFinish?: (values: TFilter) => void;
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
   * @deprecated Рассмотрите переход на пакет `@rovna-ui/columns-settings`
   * и использование свойства `settings`
   */
  onColumnVisibilityChange?: (visible: boolean, column: TColumn) => void;

  /**
   * @description Вызывается при изменении закрепления колонок
   * @param position Позиция
   * @param column Колонка
   * @deprecated Рассмотрите переход на пакет `@rovna-ui/columns-settings`
   * и использование свойства `settings`
   */
  onColumnPinningChange?: (position: ColumnPosition, column: TColumn) => void;
};

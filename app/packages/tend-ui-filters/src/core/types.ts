import React from 'react';
import { GenericObject } from '@rovna-ui/components/types';
import {
  CheckBoxGroupProps,
  CheckboxProps,
  DatePickerProps,
  InputProps,
  RadioGroupProps,
  RadioProps,
  RangePickerProps,
  ToggleProps,
} from '@rovna-ui/components/primitives';
import { CheckboxGroupSearchProps, RadioGroupSearchProps } from '@rovna-ui/components/components';

import {
  AsyncCheckboxFilter,
  AsyncRadioFilter,
  AsyncSelectFilter,
  InputNumberFilter,
  RangeInputFilter,
  SelectFilter,
} from './interfaces';

export type FilterValue = GenericObject;

type InputFilter = InputProps & {
  component: 'input';
};

type CheckboxFilter = CheckboxProps & {
  component: 'checkbox';
};
type CheckboxGroupFilter = CheckBoxGroupProps & {
  component: 'checkbox-group';
};
type CheckboxGroupSearchFilter = CheckboxGroupSearchProps & {
  component: 'checkbox-group-search';
};
type RadioFilter = RadioProps & {
  component: 'radio';
};
type RadioGroupFilter = RadioGroupProps & {
  component: 'radio-group';
};
type RadioGroupSearchFilter = RadioGroupSearchProps & {
  component: 'radio-group-search';
};
type DatePickerFilter = DatePickerProps & {
  component: 'date-picker';
};
type RangePickerFilter = RangePickerProps & {
  component: 'range-picker';
};
type ToggleFilter = ToggleProps & {
  component: 'toggle';
};

export type FilterComponent =
  | InputFilter
  | InputNumberFilter
  | RangeInputFilter
  | SelectFilter
  | AsyncSelectFilter
  | AsyncCheckboxFilter
  | AsyncRadioFilter
  | CheckboxFilter
  | CheckboxGroupFilter
  | CheckboxGroupSearchFilter
  | DatePickerFilter
  | ToggleFilter
  | RangePickerFilter
  | RadioFilter
  | RadioGroupFilter
  | RadioGroupSearchFilter;

export type FilterConfig = {
  /**
   * `React.key`
   */
  key?: React.Key;
  /**
   * Уникальный идентификатор фильтра
   */
  id: string;
  /**
   * Имя фильтра
   */
  name: string;
  /**
   * Лейбл в списке
   */
  label?: React.ReactNode;
  /**
   * Тип фильтра
   * `Input`, `Select`, `Search`, `Checkbox`, `Radio`
   */
  component: FilterComponent;
  /**
   * Позволяет связывать один фильтры с другим
   * Если один фильтр должен быть зависим от вводимых значений в другом,
   * то используйте это свойство
   */
  depends?: string[];
  /**
   * Массив зависимостей.
   * Если один фильтр должен быть недоступен пока не выбран другой,
   * то используйте это свойство
   */
  requires?: string[];
};

export type FilterPreset<T extends GenericObject = GenericObject> = {
  /**
   * Уникальный идентификатор
   */
  id: string;
  /**
   * Имя фильтра
   */
  label: string;
  /**
   * Сохраненные фильтры
   */
  value: T;
};

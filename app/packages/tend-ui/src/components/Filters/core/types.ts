import React from 'react';

import { GenericObject } from '@rovna-internal/components/types/GenericObject';
import { InputProps } from '@rovna-internal/components/primitives/Input';
import { CheckBoxGroupProps, CheckboxProps } from '@rovna-internal/components/primitives/Checkbox';
import { CheckboxGroupSearchProps } from '@rovna-internal/components/components/CheckboxGroupSearch';
import { DatePickerProps } from '@rovna-internal/components/primitives/DatePicker';
import { RangePickerProps } from '@rovna-internal/components/primitives/RangePicker';
import { ToggleProps } from '@rovna-internal/components/primitives/Toggle';
import { RadioGroupProps, RadioProps } from '@rovna-internal/components/primitives/Radio';
import { RadioGroupSearchProps } from '@rovna-internal/components/components/RadioGroupSearch';
import { SelectProps } from '@rovna-internal/components/primitives/Select';
import { AsyncSelectProps } from '@rovna-internal/components/components/AsyncSelect';
import { AsyncCheckboxProps } from '@rovna-internal/components/components/AsyncCheckbox';
import { AsyncRadioProps } from '@rovna-internal/components/components/AsyncRadio';
import { InputNumberProps } from '@rovna-internal/components/primitives/InputNumber';

export type FilterValue = GenericObject;

type InputFilter = InputProps & {
  component: 'input';
};
// FIXME: Исправить дженерик
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InputNumberFilter = InputNumberProps<any> & {
  component: 'input-number';
};
type SelectFilter = SelectProps & {
  component: 'select';
};
type AsyncSelectFilter = AsyncSelectProps & {
  component: 'async-select';
};
type AsyncCheckboxGroupFilter = AsyncCheckboxProps & {
  component: 'async-checkbox';
};
type AsyncRadioGroupFilter = AsyncRadioProps & {
  component: 'async-radio';
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
  | SelectFilter
  | AsyncSelectFilter
  | AsyncCheckboxGroupFilter
  | AsyncRadioGroupFilter
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
  depends?: string[];
  /**
   * Массив зависимостей.
   * Если один фильтр должен недоступен пока не выбран другой,
   * то используйте это свойство
   */
  requires?: string[];
};

export type FilterPreset = {
  id: string;
  label: string;
  value: GenericObject;
};

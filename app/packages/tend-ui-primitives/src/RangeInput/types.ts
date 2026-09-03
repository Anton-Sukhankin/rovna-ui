import React from 'react';

import { InputNumberSize, InputNumberValue } from '../InputNumber';

export type RangeInputSize = InputNumberSize;
export type RangeInputValue = InputNumberValue;
export type RangeInputProps = {
  /**
   * Размер
   */
  size?: RangeInputSize;
  /**
   * Значение
   */
  readonly value?: [RangeInputValue, RangeInputValue];
  /**
   * Значение по умолчанию
   */
  readonly defaultValue?: [RangeInputValue, RangeInputValue];
  /**
   * Плейсхолдер
   */
  readonly placeholder?: [string, string];
  /**
   * Доступные имена начального и конечного полей диапазона.
   *
   * @default ['Начало диапазона', 'Конец диапазона']
   */
  readonly ariaLabels?: [string, string];
  /**
   * Отобразить/скрыть иконку очищения
   */
  readonly allowClear?: boolean;
  /**
   * Доступность полей
   */
  readonly disabled?: boolean;
  /**
   * `className` для корневого элемента
   */
  readonly rootClassName?: string;
  /**
   * Контент перед полем ввода
   */
  readonly before?: [React.ReactNode?, React.ReactNode?];
  /**
   * Контент после поля ввода
   */
  readonly after?: [React.ReactNode?, React.ReactNode?];
  /**
   * Вызывается при вводе значений
   */
  readonly onChange?: (value: [RangeInputValue, RangeInputValue]) => void;
};

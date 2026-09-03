import React from 'react';

import { RadioGroupProps, RadioOptionType } from '@rovna-internal/components/primitives/Radio';
import { FilterOption } from '@rovna-internal/components/hooks/useFilterOption';

export type RadioGroupSearchOptionType = RadioOptionType;

type BaseRadioGroupSearch = {
  /**
   * Состояние ошибки
   */
  error?: boolean;
  /**
   * Виртуализация
   */
  virtual?: boolean;
  /**
   * Состояние загрузки
   */
  loading?: boolean;
  /**
   * Отобразить/скрыть поиск
   */
  showSearch?: boolean;
  /**
   * Отобразить/скрыть кнопку очистки
   */
  allowClear?: boolean;
  /**
   * Отобразить/скрыть скролл
   */
  scrollable?: boolean;
  /**
   * Функция-рендер для кастомизации отображаемого контента
   */
  optionRender?: (option: RadioGroupSearchOptionType) => React.ReactNode;
  /**
   * Контент перед опцией
   */
  optionAfter?:
    | React.ReactNode
    | ((option: RadioGroupSearchOptionType) => React.ReactNode);
  /**
   * Контент под опцией
   */
  optionDescription?: string | ((option: RadioGroupSearchOptionType) => string);
  /**
   * Плейсхолдер
   */
  placeholder?: string;
  /**
   * Отображать/скрыть фильтрацию
   */
  filterOption?: boolean | FilterOption;
  /**
   * Свойство по которому нужно фильтровать
   */
  filterOptionProp?: string;
  /**
   * Опции
   */
  options?: RadioGroupSearchOptionType[];
  /**
   * Вызывается при вводе значения в поисковую строку
   */
  onSearch?: (value: string) => void;
  /**
   * Вызывается при скроллинге
   */
  onScroll?: React.UIEventHandler<HTMLDivElement>;
};

export type RadioGroupSearchProps = Omit<RadioGroupProps, 'options'> &
  BaseRadioGroupSearch;

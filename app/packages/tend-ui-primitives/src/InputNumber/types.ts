import React from 'react';

export type InputNumberValue = number | null;
export type InputNumberSize = 'large' | 'medium' | 'small';
export type InputNumberProps = {
  /**
   * Доступное имя поля.
   */
  readonly ['aria-label']?: string;
  readonly ['aria-labelledby']?: string;
  /**
   * Свойство отвечает размер компонента
   *
   * @default medium
   */
  readonly size?: InputNumberSize;
  /**
   * Свойство отвечает за состояние недоступности
   */
  readonly disabled?: boolean;
  /**
   * Свойство отвечает за отображение иконку очистки
   */
  readonly allowClear?: boolean;
  readonly ['data-testid']?: string;
  readonly className?: string;
  /**
   * Свойство отвечает за контент `placeholder`
   */
  readonly placeholder?: string;
  /**
   * Значение
   */
  readonly value?: InputNumberValue;
  /**
   * Значение по умолчанию
   */
  readonly defaultValue?: InputNumberValue;
  readonly onChange?: (value: InputNumberValue) => void;
  /**
   * Кастомный контент перед основным контентом
   */
  readonly before?: React.ReactNode;
  /**
   * Кастомный контент после основного контента
   */
  readonly after?: React.ReactNode;
};

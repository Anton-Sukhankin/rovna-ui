import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export type ToggleButtonRef = HTMLButtonElement;
export type ToggleButtonProps = ButtonProps & {
  /**
   * Может ли кнопка быть нажата
   */
  selectable?: boolean;
  /**
   * Нажата ли кнопка
   */
  selected?: boolean;
  /**
   * Вызывается при изменении состояния нажатия
   */
  onSelectedChange?: (selected: boolean) => void;
};
export type ToggleButtonGroupProps<T = unknown> = {
  value?: T[];
  children?: React.ReactNode;
  onChange?: (event: React.MouseEvent<HTMLElement>, value: T) => void;
};

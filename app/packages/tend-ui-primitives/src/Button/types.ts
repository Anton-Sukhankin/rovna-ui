import React from 'react';
import { MarginProperties } from '@rovna-ui/styling';

export const variants = ['primary', 'secondary', 'ghost', 'link'] as const;
export const sizes = ['large', 'medium', 'small'] as const;
export const presets = ['default', 'danger', 'accent'] as const;

export type ButtonVariant = (typeof variants)[number];
export type ButtonSize = (typeof sizes)[number];
export type ButtonPreset = (typeof presets)[number];
export type ButtonStylingSchema = {
  buttonOnAccent: {
    primaryDefaultText?: string;
    primaryHoverText?: string;
    primaryPressedText?: string;
    primaryFocusText?: string;
    primaryDisabledText?: string;
    ghostDefaultText?: string;
    ghostHoverText?: string;
    ghostPressedText?: string;
    ghostFocusText?: string;
    ghostDisabledText?: string;
  };
};

type BaseButtonProps<ElementType extends React.ElementType = 'button'> = {
  /**
   * @deprecated Используйте свойство `preset="danger"`
   */
  danger?: boolean;
  /**
   * Состояние недоступности
   */
  disabled?: boolean;
  /**
   * Состояние загрузки
   */
  loading?: boolean;
  /**
   * Состояние загрузки "скелетон"
   */
  skeleton?: boolean;
  /**
   * Отображать ли горизонтальный `padding`
   */
  padding?: boolean;
  /**
   * Должна ли кнопка занимать всю ширину экрана
   */
  fullWidth?: boolean;
  /**
   * Вариант
   */
  variant?: ButtonVariant;
  /**
   * Размер
   */
  size?: ButtonSize;
  /**
   * Тип кнопки
   */
  preset?: ButtonPreset;
  /**
   * Контент перед `children`
   */
  before?: React.ReactNode;
  /**
   * Контент после `children`
   */
  after?: React.ReactNode;
  /**
   * Реализация полиморфизма
   * Используйте это свойство если нужно отрисовать кнопки под другим тегом
   */
  as?: ElementType;
  /**
   * @deprecated Экспериментальное API
   * Не используйте это в продакшене
   */
  UNSTABLE_styling?: ButtonStylingSchema;
};

export type ButtonProps<ElementType extends React.ElementType = 'button'> =
  BaseButtonProps<ElementType> &
    Omit<React.ComponentProps<ElementType>, keyof BaseButtonProps> &
    MarginProperties;
export type ButtonRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E>['ref'];

export type ButtonComponent = (<ElementType extends React.ElementType = 'button'>(
  props: ButtonProps<ElementType>,
) => React.JSX.Element) &
  Pick<React.FC<ButtonProps>, 'displayName'>;

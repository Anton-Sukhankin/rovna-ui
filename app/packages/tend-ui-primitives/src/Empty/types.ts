import { ButtonProps } from '../Button';

export const variants = ['empty', 'no-results', 'error', 'loading', 'success'] as const;
export const sizes = ['large', 'medium', 'small', 'xs'] as const;
export type EmptySize = (typeof sizes)[number];
export type EmptyVariant = (typeof variants)[number];
export type EmptyProps = {
  /**
   * Размер
   */
  size?: EmptySize;
  /**
   * Вариант
   */
  variant?: EmptyVariant;
  /**
   * Заголовок
   */
  title?: string;
  /**
   * Описание
   */
  description?: string;
  /**
   * Массив свойств кнопок
   */
  buttons?: Omit<ButtonProps<'button'>, 'as'>[];
};

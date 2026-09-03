import { Any } from '@rovna-ui/types';

export type Validator<V = Any> = (value: V, rule: ValidationRule<V>) => Promise<void>;

export type ValidationRule<V = Any> = {
  /**
   * Пресеты
   */
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  /**
   * Сообщение об ошибке
   */
  message?: string;
  warning?: true;
  /**
   * Кастомный валидатор
   */
  validator?: Validator<V>;
};

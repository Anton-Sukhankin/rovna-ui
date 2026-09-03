import React from 'react';
import { Any } from '@rovna-ui/types';
import { FormProps as PrimitiveFormProps, TooltipProps } from '@rovna-ui/primitives';

import { FormModel, ValidationRule } from '@rovna-internal/form/core';

export type FieldProps<V = Any, R = V> = {
  /**
   * Состояние недоступности элемента формы
   */
  disabled?: boolean;
  /**
   * Label
   */
  label?: string;
  /**
   * Уникальное имя
   */
  name?: string | string[];
  requires?: string[] | string[][];
  rules?: ValidationRule<R>[];

  tooltip?: Pick<TooltipProps, 'title'>;
  /**
   * Имя хендлера
   * @default onChange
   */
  handlerPropName?: string;
  /**
   * Имя свойства значения
   * @default value
   */
  valuePropName?: string;

  getValueFromEvent?: (payload: V) => R;
  getLabelRender?: (label: string) => React.ReactNode;
  getMessageRender?: (message: string) => React.ReactNode;

  normalize?: (payload: Any) => Any;

  children: React.ReactElement;
};

export interface FormProps<State extends object = object> extends PrimitiveFormProps {
  headless?: boolean;
  form: FormModel<State>;
  children: React.ReactNode;
}

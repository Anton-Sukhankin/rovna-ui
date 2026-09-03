import React from 'react';
import AntInputNumber, {
  InputNumberProps as AntInputNumberProps,
} from 'antd-core/es/input-number';
import { DefaultTheme } from 'styled-components';

import { Size } from '@rovna-internal/components/types';

export type InputNumberValue = NonNullable<
  Parameters<NonNullable<AntInputNumberProps['onChange']>>[0]
>;
/**
 * @deprecated Используйте `InputNumberValue`
 */
export type ValueType = InputNumberValue;
export type InputNumberRef = React.ElementRef<typeof AntInputNumber>;
export type InputNumberProps<T extends InputNumberValue> = Omit<
  AntInputNumberProps<T>,
  'size'
> & {
  fullWidth?: boolean;
  size?: Size;
};
export type AntInputNumberComponentType = <T extends InputNumberValue>(
  props: AntInputNumberProps<T> & {
    ref?: React.ForwardedRef<InputNumberRef>;
    $fullWidth?: boolean;
    $theme: DefaultTheme;
  },
) => ReturnType<typeof AntInputNumber>;
export type InputNumberComponentType = (<T extends InputNumberValue>(
  props: InputNumberProps<T> & {
    ref?: React.ForwardedRef<InputNumberRef>;
  },
) => ReturnType<typeof AntInputNumber>) & { displayName?: string };

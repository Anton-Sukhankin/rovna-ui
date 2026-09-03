import React from 'react';
import { useTheme } from '@rovna-ui/theme';

import { useSize } from '@rovna-internal/components/hooks/useSize';

import { Root } from './styled';
import {
  InputNumberComponentType,
  InputNumberProps,
  InputNumberRef,
  InputNumberValue,
} from './types';

const BaseInputNumber = <T extends InputNumberValue>(
  { fullWidth, ...props }: InputNumberProps<T>,
  ref: React.ForwardedRef<InputNumberRef>,
) => {
  const [title, setTitle] = React.useState('');
  const theme = useTheme();
  const size = useSize(props.size);

  const onChange: NonNullable<InputNumberProps<T>['onChange']> = React.useCallback(
    value => {
      if (value) {
        setTitle(value.toString());
      }
      props.onChange?.(value);
    },
    [props],
  );

  return (
    <Root<T>
      data-testid='rovna-ui-input-number'
      {...props}
      $fullWidth={fullWidth}
      $theme={theme}
      ref={ref}
      size={size}
      title={title}
      onChange={onChange}
    />
  );
};

const InputNumber = React.forwardRef(BaseInputNumber) as InputNumberComponentType;

InputNumber.displayName = 'InputNumber';

export { InputNumber };

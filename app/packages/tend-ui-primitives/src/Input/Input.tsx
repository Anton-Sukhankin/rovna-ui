import React from 'react';
import AntInputGroup from 'antd-core/es/input/Group';
import {
  extractDimensionProps,
  extractMarginProps,
  extractPaddingProps,
} from '@rovna-ui/styling';
import { useTheme } from '@rovna-ui/theme';

import { useAllowClear } from '../internal/useAllowClear';
import { useInputTitle } from '../internal//useInputTitle';
import { Root } from './styled';
import { InputProps, InputRef } from './types';

const BaseInput = React.forwardRef<InputRef, InputProps>(
  ({ allowClear, clearIconTooltip, size = 'medium', ...props }, ref) => {
    const theme = useTheme();
    const allowClearProp = useAllowClear({ allowClear, clearIconTooltip });
    const bind = useInputTitle(props);
    const _size = (
      {
        large: 'large',
        medium: 'middle',
        small: 'small',
      } as const
    )[size];
    const { rest: withoutMargins, ...margins } = extractMarginProps(props);
    const { rest: withoutDimensions, ...dimensions } = extractDimensionProps({
      height: { large: 40, medium: 32, small: 24 }[size],
      ...withoutMargins,
    });
    const { rest, ...paddings } = extractPaddingProps(withoutDimensions);

    return (
      <Root
        data-testid='rovna-ui-input'
        {...rest}
        {...dimensions}
        {...margins}
        {...paddings}
        {...bind}
        ref={ref}
        $theme={theme}
        size={_size}
        allowClear={allowClearProp}
      />
    );
  },
);

const Input = Object.assign(BaseInput, {
  displayName: 'Input',
  Group: AntInputGroup,
});

export { Input };

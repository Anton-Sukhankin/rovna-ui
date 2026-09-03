import React from 'react';
import styled from 'styled-components';
import {
  Cursor,
  Margin,
  Padding,
  cursor,
  extractMarginProps,
  extractPaddingProps,
  margin,
  padding,
} from '@rovna-ui/styling';

import { IconProps } from './types';

export type { IconProps } from './types';

const Wrapper = styled.span<
  { $size?: number; $color?: string } & Margin & Padding & Cursor
>`
  display: inline-flex;
  font-size: ${props => (props.$size ? `${props.$size}px` : 'inherit')};
  color: ${props => props.$color || 'inherit'};
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  ${margin};
  ${padding};
  ${cursor};
`;

/**
 * Не для публичного использования
 */
export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ children, size, color, className, cursor, ...props }, ref) => {
    const { rest: withoutMargins, ...margins } = extractMarginProps(props);
    const { rest, ...paddings } = extractPaddingProps(withoutMargins);
    const _cursor = (() => {
      if (cursor) return cursor;
      if (props.onClick) return 'pointer';
    })();

    return (
      <Wrapper
        {...rest}
        ref={ref}
        className={['rovna-ui-icon-root', 'anticon', className].filter(Boolean).join(' ')}
        $size={size}
        $color={color}
        $cursor={_cursor}
        {...margins}
        {...paddings}
      >
        {children}
      </Wrapper>
    );
  },
);

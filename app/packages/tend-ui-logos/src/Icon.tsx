import React from 'react';
import styled from 'styled-components';

export type IconProps = React.ComponentPropsWithoutRef<'span'> & {
  size?: number;
};

// FIXME: Replace by Icon from `@rovna-ui/components/theme`
const Wrapper = styled.span<{ $size?: number; $color?: string }>`
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
`;

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ children, size, color, className, ...rest }, ref) => (
    <Wrapper
      {...rest}
      ref={ref}
      className={['rovna-ui-icon-root', 'anticon', className].filter(Boolean).join(' ')}
      $size={size}
      $color={color}
    >
      {children}
    </Wrapper>
  ),
);

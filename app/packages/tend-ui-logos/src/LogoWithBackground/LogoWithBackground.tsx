import { useColor, useColors } from '@rovna-ui/theme';
import React from 'react';
import styled from 'styled-components';

import { IconProps } from '../Icon';

export type LogoWithBackgroundProps = IconProps & {
  backgroundColor?: string;
  borderRadius?: number;
};

const Container = styled.span<{
  $size: number;
  $backgroundColor: string;
  $borderRadius: number;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background-color: ${props => props.$backgroundColor};
  border-radius: ${props => props.$borderRadius}px;
`;

const LogoWithBackground = React.forwardRef<HTMLSpanElement, LogoWithBackgroundProps>(
  ({ backgroundColor, size = 24, borderRadius = 4, children, ...props }, ref) => {
    const colors = useColors();

    const defaultBackgroundColor =
      useColor(backgroundColor, colors.blue600) ?? colors.blue600;

    return (
      <Container
        ref={ref}
        $size={size}
        $backgroundColor={defaultBackgroundColor}
        $borderRadius={borderRadius}
        data-testid='rovna-ui-logo-with-background'
        {...props}
      >
        {children}
      </Container>
    );
  },
);

LogoWithBackground.displayName = 'LogoWithBackground';

export { LogoWithBackground };

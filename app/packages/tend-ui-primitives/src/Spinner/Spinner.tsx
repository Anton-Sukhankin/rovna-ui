import React from 'react';
import cn from 'classnames';
import { useColor } from '@rovna-ui/theme';

import { SpinnerProps, SpinnerRef } from './types';
import { Children, Circle, Root, Svg } from './styled';
import styles from './Spinner.module.css';

const DIMENSIONS = {
  xs: 16,
  small: 32,
  medium: 48,
  large: 64,
};
const STROKE_WIDTH = {
  xs: 2,
  small: 3,
  medium: 4,
  large: 5,
};

const BaseSpinner = (
  { loading = true, size = 'medium', color, children, className, ...rest }: SpinnerProps,
  ref: React.ForwardedRef<SpinnerRef>,
) => {
  const dimensions = DIMENSIONS[size];
  const strokeWidth = STROKE_WIDTH[size];
  const radius = dimensions / 2 - strokeWidth;
  const xOffset = dimensions / 2;
  const yOffset = dimensions / 2;
  const strokeDashArray = Math.ceil(2 * Math.PI * radius);
  const strokeDashOffset = (strokeDashArray / 4) * 3;
  const isXs = size === 'xs';
  const isSmall = size === 'small';
  const isMedium = size === 'medium';
  const isLarge = size === 'large';
  const __color = useColor(color);

  return (
    <Root
      data-testid='rovna-ui-spinner'
      {...rest}
      ref={ref}
      $color={__color}
      className={cn([styles['rovna-ui-spinner'], className], {
        [styles['rovna-ui-spinner-loading']]: loading,
        [styles['rovna-ui-spinner-size-xs']]: isXs,
        [styles['rovna-ui-spinner-size-small']]: isSmall,
        [styles['rovna-ui-spinner-size-medium']]: isMedium,
        [styles['rovna-ui-spinner-size-large']]: isLarge,
      })}
    >
      {children && <Children $loading={loading}>{children}</Children>}
      {loading && (
        <Svg $center={!!children} width={dimensions} height={dimensions}>
          <Circle
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDashArray}
            strokeDashoffset={strokeDashOffset}
            r={radius}
            cx={xOffset}
            cy={yOffset}
          />
        </Svg>
      )}
    </Root>
  );
};

const Spinner = React.forwardRef<SpinnerRef, SpinnerProps>(BaseSpinner);

Spinner.displayName = 'Spinner';

export { Spinner };

import React from 'react';
import { isNumber, isString } from '@rovna-ui/utils';
import { useColor, useTheme } from '@rovna-ui/theme';
import cn from 'classnames';

import { Bubble, Content, Root } from './styled';
import { CounterProps, CounterRef } from './types';

const clamp = (value: number, max: number) => (value >= max ? `${max}+` : value);

const BaseCounter = (
  {
    showZero = false,
    preset = 'red',
    before,
    after,
    children,
    inner,
    max = 99,
    offset = [0, 0],
    placement = 'rightTop',
    className,
    rootClassName,
    inline = true,
    color,
    backgroundColor,
    ...props
  }: CounterProps,
  ref: React.ForwardedRef<CounterRef>,
) => {
  const theme = useTheme();
  const _color = useColor(color);
  // FIXME: Поправить типы
  const _backgroundColor = useColor(backgroundColor as string);
  const isInnerReactElement = React.isValidElement(inner);
  const isInnerNumber = isNumber(inner);
  const isInnerString = isString(inner);
  const title = isInnerNumber ? `${inner}` : undefined;
  const isPositiveNumber = isInnerNumber && inner > 0;
  const isAllowedNumber = isInnerNumber && showZero && inner >= 0;
  const isShown =
    isInnerReactElement || isPositiveNumber || isAllowedNumber || isInnerString;
  const content = isInnerNumber ? clamp(inner, max) : inner;

  return (
    <Root ref={ref} theme={theme} className={cn(['rovna-ui-counter-root', rootClassName])}>
      {before && (
        <Content className='rovna-ui-counter-before' theme={theme}>
          {before}
        </Content>
      )}
      {children}
      {isShown && (
        <Bubble
          data-testid='rovna-ui-counter'
          {...props}
          theme={theme}
          $inline={inline}
          $color={_color}
          $backgroundColor={_backgroundColor}
          $preset={preset}
          $offset={offset}
          $placement={placement}
          $pointer={!!props.onClick}
          role={props.role ?? 'status'}
          aria-live={props['aria-live'] ?? 'polite'}
          title={title}
          className={cn(['rovna-ui-counter-counter', className])}
        >
          {content}
        </Bubble>
      )}
      {after && (
        <Content className='rovna-ui-counter-after' theme={theme}>
          {after}
        </Content>
      )}
    </Root>
  );
};

const Counter = React.forwardRef<CounterRef, CounterProps>(BaseCounter);

Counter.displayName = 'Counter';

export { Counter };

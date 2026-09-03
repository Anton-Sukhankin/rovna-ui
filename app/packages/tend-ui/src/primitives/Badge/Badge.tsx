import React from 'react';
import { INTERNAL_RovnaUILogger as RovnaUILogger, isNumber } from '@rovna-ui/utils';

import { useTheme } from '@rovna-internal/components/theme/Theme';

import { Bubble, Content, Root } from './styled';
import { BadgeProps, BadgeRef } from './types';

const BaseBadge = (
  {
    showZero = false,
    preset = 'red',
    before,
    after,
    children,
    inner,
    max = 99,
    offset = [8, -10],
    padding,
    placement,
    className,
    rootClassName,
    variant,
    ...props
  }: BadgeProps,
  ref: React.ForwardedRef<BadgeRef>,
) => {
  if (process.env.NODE_ENV === 'development') {
    RovnaUILogger.warning([
      '<Badge /> из пакета "@rovna-ui/components" устарел и больше не поддерживается.',
      '',
      'Используйте <Counter />, <Dot /> и <Tag /> соответственно из пакета "@rovna-ui/primitives"',
    ]);
  }

  const theme = useTheme();
  const hasChildren = typeof children !== 'undefined';
  const hasInner = typeof inner !== 'undefined';
  const isStatus = !hasChildren && !hasInner;
  const isDot = hasChildren && !hasInner;
  const isCounter = hasChildren && hasInner;

  const shape = (() => {
    if (variant) return variant;
    if (isStatus) return 'status';
    if (isDot) return 'dot';
    if (isCounter) return 'counter';

    return 'bubble';
  })();

  const content = (() => {
    // as a counter
    if (isNumber(inner)) {
      if (showZero) {
        if (inner >= max) return `${max}+`;

        return inner;
      }
      if (inner <= 0) return null;
      if (inner >= max) return `${max}+`;
    }

    // custom content
    return inner;
  })();

  const isCounterVariant = shape === 'counter';

  const _content = React.useMemo(
    () => (
      <Bubble
        data-testid='rovna-ui-badge'
        {...props}
        theme={theme}
        $shape={shape}
        $preset={preset}
        $offset={offset}
        $padding={padding}
        $placement={placement}
        $pointer={!!props.onClick}
        title={isNumber(inner) ? `${inner}` : undefined}
        className={['rovna-ui-badge-badge', className].filter(Boolean).join(' ')}
      >
        {content}
      </Bubble>
    ),
    [className, content, inner, offset, padding, placement, preset, props, shape, theme],
  );

  return (
    <Root
      ref={ref}
      theme={theme}
      className={['rovna-ui-badge-root', rootClassName].filter(Boolean).join(' ')}
    >
      {before && <Content theme={theme}>{before}</Content>}
      {children}
      {isCounterVariant ? (!!content || isNumber(content)) && _content : _content}
      {after && <Content theme={theme}>{after}</Content>}
    </Root>
  );
};

/**
 * @deprecated Устарело. Используйте `primitives/Counter`, `ui/Dot` и `primitives/Tag` соответственно
 */
const Badge = React.forwardRef<BadgeRef, BadgeProps>(BaseBadge);

Badge.displayName = 'Badge';

export { Badge };

import React from 'react';
import { useColor, useTheme } from '@rovna-ui/theme';
import cn from 'classnames';

import { Bubble, Content, Root } from './styled';
import { DotProps, DotRef } from './types';

const BaseDot = (
  {
    preset = 'red',
    before,
    after,
    children,
    offset = [0, 0],
    placement = 'rightTop',
    className,
    rootClassName,
    inline = true,
    color,
    ...props
  }: DotProps,
  ref: React.ForwardedRef<DotRef>,
) => {
  const theme = useTheme();
  const _color = useColor(color);

  return (
    <Root ref={ref} theme={theme} className={cn(['rovna-ui-dot-root', rootClassName])}>
      {before && (
        <Content className='rovna-ui-dot-before' theme={theme}>
          {before}
        </Content>
      )}
      {children}
      <Bubble
        data-testid='rovna-ui-dot'
        {...props}
        theme={theme}
        $inline={inline}
        $backgroundColor={_color}
        $preset={preset}
        $offset={offset}
        $placement={placement}
        $pointer={!!props.onClick}
        className={cn(['rovna-ui-dot-dot', className])}
      />
      {after && (
        <Content className='rovna-ui-dot-after' theme={theme}>
          {after}
        </Content>
      )}
    </Root>
  );
};

const Dot = React.forwardRef<DotRef, DotProps>(BaseDot);

Dot.displayName = 'Dot';

export { Dot };

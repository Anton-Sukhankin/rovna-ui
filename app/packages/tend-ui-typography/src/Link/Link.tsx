import React, { forwardRef } from 'react';
import { useTheme } from '@rovna-ui/theme';
import cn from 'classnames';

import { Root } from './styled';
import { LinkProps, LinkRef } from './types';

const BaseLink = (
  {
    underline = false,
    before,
    after,
    size = 'medium',
    textAlign,
    uppercase,
    children,
    className,
    whiteSpace,
    ...props
  }: LinkProps,
  ref: React.ForwardedRef<LinkRef>,
) => {
  const _underline = props.disabled === true ? false : underline;
  const theme = useTheme();

  return (
    <Root
      data-testid='rovna-ui-link'
      {...props}
      ref={ref}
      $theme={theme}
      $size={size}
      $disabled={props.disabled}
      $textAlign={textAlign}
      $whiteSpace={whiteSpace}
      $uppercase={uppercase}
      underline={_underline}
      className={cn(['rovna-ui-typography-link', className])}
    >
      {before}
      {children}
      {after}
    </Root>
  );
};

const Link = forwardRef<LinkRef, LinkProps>(BaseLink);

Link.displayName = 'Link';

export { Link };

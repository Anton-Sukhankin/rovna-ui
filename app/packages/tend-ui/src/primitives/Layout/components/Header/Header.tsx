import React from 'react';
import { extractMarginProps, extractPaddingProps } from '@rovna-ui/styling';

import { useTheme } from '@rovna-internal/components/theme/Theme';
import { useScroll } from '@rovna-internal/components/primitives/Layout/hooks/useScroll';
import { useSizeContext } from '@rovna-internal/components/primitives/Layout/contexts/SizeContext';

import { Root } from './styled';
import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = ({
  children,
  sticky = false,
  className,
  ...props
}) => {
  const theme = useTheme();
  const { size } = useSizeContext();
  const ref = React.useRef<HTMLHeadElement>(null);
  const { register } = useScroll();
  register('header', ref);
  const { rest: withoutMargins, ...margins } = extractMarginProps(props);
  const { rest, ...paddings } = extractPaddingProps(withoutMargins);

  return (
    <Root
      {...rest}
      {...margins}
      {...paddings}
      ref={ref}
      className={['rovna-ui-layout-header', className].filter(Boolean).join(' ')}
      theme={theme}
      $sticky={sticky}
      $size={size}
    >
      {children}
    </Root>
  );
};

Header.displayName = 'Layout.Header';

export { Header };

import React from 'react';
import classNames from 'classnames';

import { Root } from './styled';

export type HeaderProps = React.PropsWithChildren<unknown> & {
  className?: string;
  style?: React.CSSProperties;
};

const Header = ({ children, className, style }: HeaderProps) => {
  return (
    <Root className={classNames('rovna-ui-drawer-header', className)} style={style}>
      {children}
    </Root>
  );
};

Header.displayName = 'Drawer.Header';

export { Header };

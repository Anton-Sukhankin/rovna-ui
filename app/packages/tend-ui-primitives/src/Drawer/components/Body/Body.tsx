import React from 'react';
import classNames from 'classnames';

import { Root } from './styled';

export type BodyProps = React.PropsWithChildren<unknown> & {
  className?: string;
  style?: React.CSSProperties;
};

const Body = ({ children, className, style }: BodyProps) => {
  return (
    <Root className={classNames('rovna-ui-drawer-body', className)} style={style}>
      {children}
    </Root>
  );
};

Body.displayName = 'Drawer.Body';

export { Body };

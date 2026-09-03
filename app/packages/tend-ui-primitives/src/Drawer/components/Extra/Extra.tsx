import React from 'react';
import classNames from 'classnames';

import { Root } from './styled';

export type ExtraProps = React.PropsWithChildren<unknown> & {
  className?: string;
  style?: React.CSSProperties;
};

const Extra = ({ children, className, style }: ExtraProps) => {
  return (
    <Root className={classNames('rovna-ui-drawer-extra', className)} style={style}>
      {children}
    </Root>
  );
};

Extra.displayName = 'Drawer.Extra';

export { Extra };

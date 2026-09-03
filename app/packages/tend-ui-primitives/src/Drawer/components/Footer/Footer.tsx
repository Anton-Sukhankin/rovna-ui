import React from 'react';
import classNames from 'classnames';

import { Root } from './styled';

export type FooterProps = React.PropsWithChildren<unknown> & {
  justifyContent?: React.CSSProperties['justifyContent'];
  className?: string;
  style?: React.CSSProperties;
};

const Footer = ({
  children,
  className,
  style,
  justifyContent = 'flex-end',
}: FooterProps) => {
  return (
    <Root
      $justifyContent={justifyContent}
      className={classNames('rovna-ui-drawer-footer', className)}
      style={style}
    >
      {children}
    </Root>
  );
};

Footer.displayName = 'Drawer.Footer';

export { Footer };

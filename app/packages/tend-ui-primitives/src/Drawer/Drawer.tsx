import React from 'react';
import { Box } from '@rovna-ui/grid';

import {
  Body,
  CloseButton,
  Description,
  Extra,
  Footer,
  Header,
  Root,
  Title,
} from './components';
import { DrawerProps } from './types';

const Drawer = ({
  title,
  description,
  extra,
  children,
  footer,
  ...props
}: React.PropsWithChildren<DrawerProps>) => {
  return (
    <Root
      {...props}
      aria-label={
        props['aria-label'] ?? (typeof title === 'string' ? title : undefined)
      }
    >
      <Header>
        <Box $display='flex' $flexDirection='column'>
          {title && <Title>{title}</Title>}
          {description && <Description>{description}</Description>}
          {extra && <Extra>{extra}</Extra>}
        </Box>
        <CloseButton />
      </Header>
      <Body>{children}</Body>
      {footer && <Footer>{footer}</Footer>}
    </Root>
  );
};

Drawer.displayName = 'Drawer';
Drawer.Root = Root;
Drawer.Header = Header;
Drawer.Extra = Extra;
Drawer.Body = Body;
Drawer.Footer = Footer;
Drawer.CloseButton = CloseButton;
Drawer.Title = Title;
Drawer.Description = Description;

export { Drawer };

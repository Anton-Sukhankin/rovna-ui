import React from 'react';
import { List } from '@rovna-ui/components/ui';

const Layout: React.FC = ({ children }) => {
  return <List>{children}</List>;
};

Layout.displayName = 'Table.ContextMenu.Actions.Layout';

export { Layout };

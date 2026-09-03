import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Drawer as PrimitiveDrawer, Spinner } from '@rovna-ui/components/primitives';
import { useTheme } from '@rovna-ui/theme';

import { DrawerProps } from './types';

const Drawer = ({ loading = false, title, children, ...props }: DrawerProps) => {
  const theme = useTheme();
  const t = useTranslation();

  return (
    <PrimitiveDrawer
      {...props}
      title={title ? title : t(['components', 'Filters', 'title'])}
    >
      <Spinner color={theme.colors.blue600} size='small' loading={loading}>
        {children}
      </Spinner>
    </PrimitiveDrawer>
  );
};

Drawer.displayName = 'Filters.Drawer';

export { Drawer };

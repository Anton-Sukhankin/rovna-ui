import React from 'react';

import { useTheme } from '@rovna-internal/components/theme/Theme';

import { Root as _Root } from './styled';
import { RootProps } from './types';
import { SizeContext } from '../../contexts';

const Root: React.FC<RootProps> = ({ size = 'medium', className, ...props }) => {
  const theme = useTheme();

  return (
    <SizeContext value={{ size }}>
      <_Root
        {...props}
        theme={theme}
        className={['rovna-ui-layout-root', className].filter(Boolean).join(' ')}
      />
    </SizeContext>
  );
};

Root.displayName = 'Layout.Root';

export { Root };

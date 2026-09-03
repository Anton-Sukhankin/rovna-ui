import React from 'react';

import { useTheme } from '@rovna-internal/components/theme/Theme';

import { Root } from './styled';
import { MainProps } from './types';
import { useSizeContext } from '../../contexts';
import { Title } from './components';

const Main = ({ children, className, background = 'white', ...props }: MainProps) => {
  const theme = useTheme();
  const { size } = useSizeContext();

  return (
    <Root
      {...props}
      theme={theme}
      $size={size}
      $background={background}
      className={['rovna-ui-layout-main', className].filter(Boolean).join(' ')}
    >
      {children}
    </Root>
  );
};

Main.Title = Title;
Main.displayName = 'Layout.Main';

export { Main };

import React from 'react';
import { useColor, useTheme } from '@rovna-ui/theme';

import { Root } from './styled';
import { MainProps } from './types';
import { useSizeContext } from '../../contexts';

const Main = ({ children, className, background, ...props }: MainProps) => {
  const theme = useTheme();
  const { size } = useSizeContext();
  // FIXME: Поправить литеральные типы
  const _background = useColor(background as string, 'white');

  return (
    <Root
      {...props}
      theme={theme}
      $size={size}
      $background={_background}
      className={['rovna-ui-layout-main', className].filter(Boolean).join(' ')}
    >
      {children}
    </Root>
  );
};

Main.displayName = 'Layout.Main';

export { Main };

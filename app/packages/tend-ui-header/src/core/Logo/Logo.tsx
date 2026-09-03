import React from 'react';
import { Text } from '@rovna-ui/typography';
import { useColor, useTheme } from '@rovna-ui/theme';
import cn from 'classnames';

import { LogoProps } from './types';
import { Root } from './styled';

const Logo = ({ onClick, after, children, before, color = 'gray0' }: LogoProps) => {
  const theme = useTheme();
  // FIXME: Исправить литеральные типы
  const __color = useColor(color as string);

  return (
    <Root
      theme={theme}
      className={cn(['rovna-ui-logo-root'])}
      $pointer={!!onClick}
      onClick={onClick}
    >
      {before}
      <Text color={__color} style={{ display: 'block', whiteSpace: 'nowrap' }} strong>
        {children}
      </Text>
      {after}
    </Root>
  );
};

export { Logo };

import React from 'react';
import { useColor, useTheme } from '@rovna-ui/theme';
import { extractMarginProps } from '@rovna-ui/styling';

import * as styled from './styled';
import { RootProps } from './types';

const Root = ({
  sticky = true,
  top,
  children,
  className,
  background = 'blue600',
  ...props
}: RootProps) => {
  const theme = useTheme();
  // FIXME:  Исправить литеральные типы
  const _background = useColor(background as string);
  const { ...margins } = extractMarginProps(props);

  return (
    <styled.Root
      theme={theme}
      $sticky={sticky}
      $background={_background}
      $top={top}
      className={[className, 'rovna-ui-header-root'].filter(Boolean).join(' ')}
      {...margins}
    >
      {children}
    </styled.Root>
  );
};

Root.displayName = 'Header.Root';

export { Root };

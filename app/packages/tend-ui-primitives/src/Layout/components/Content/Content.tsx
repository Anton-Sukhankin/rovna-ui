import React from 'react';
import { useTheme } from '@rovna-ui/theme';

import { Root } from './styled';
import { ContentProps } from './types';

const Content: React.FC<ContentProps> = ({ className, ...props }) => {
  const theme = useTheme();

  return (
    <Root
      {...props}
      theme={theme}
      className={['rovna-ui-layout-content', className].filter(Boolean).join(' ')}
    />
  );
};

Content.displayName = 'Layout.Content';

export { Content };

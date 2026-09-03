import React from 'react';

import { useTheme } from '@rovna-internal/components/theme/Theme';
import { Box } from '@rovna-internal/components/grid/Box';

import { Root } from './styled';
import { useCollapseContext } from '../../contexts/CollapseContext';

const Content: React.FC = ({ children }) => {
  const context = useCollapseContext();
  const theme = useTheme();

  return (
    <Root
      theme={theme}
      $open={context.open}
      data-state={context.open.toString()}
      className='rovna-ui-collapse-content'
    >
      <Box $padding='8px 0 0 24px'>{children}</Box>
    </Root>
  );
};

Content.displayName = 'Collapse.Content';

export { Content };

import React from 'react';

import { TextHeaderProps } from './types';
import { Root } from './styled';

const TextHeader = ({ children, width }: TextHeaderProps) => {
  return (
    <Root
      style={{ width, margin: 0 }}
      component='div'
      ellipsis={{ rows: 1, tooltip: children }}
      className='rovna-ui-table-text-header'
    >
      {children}
    </Root>
  );
};

TextHeader.displayName = 'Table.TextHeader';

export { TextHeader };

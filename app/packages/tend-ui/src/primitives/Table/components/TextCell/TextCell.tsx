import React from 'react';

import { TextCellProps } from './types';
import { Root } from './styled';

const TextCell = ({ children, width }: TextCellProps) => {
  return (
    <Root
      style={{ width, margin: 0 }}
      component='div'
      ellipsis={{ rows: 3, tooltip: children }}
      className='rovna-ui-table-text-cell'
    >
      {children}
    </Root>
  );
};

TextCell.displayName = 'Table.TextCell';

export { TextCell };

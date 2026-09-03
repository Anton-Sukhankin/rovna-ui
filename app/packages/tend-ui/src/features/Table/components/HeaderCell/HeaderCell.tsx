import React from 'react';

import { useTheme } from '@rovna-internal/components/theme/Theme';
import { CellTitle } from '@rovna-internal/components/features/Table/components/CellTitle';

import { HeaderCellProps } from './types';
import { Root } from './styled';

const HeaderCell: React.FC<HeaderCellProps> = ({ className, id = '', ...props }) => {
  const theme = useTheme();

  return (
    <Root
      theme={theme}
      {...props}
      className={['rovna-ui-features-table-cell', className].filter(Boolean).join(' ')}
    >
      <CellTitle id={id}>{props.children}</CellTitle>
    </Root>
  );
};

HeaderCell.displayName = 'Table.HeaderCell';

export { HeaderCell };

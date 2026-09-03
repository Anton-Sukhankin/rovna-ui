import React from 'react';
import { useTheme } from '@rovna-ui/theme';

import { useTourContext } from '@rovna-internal/table/Table/contexts/TourContext';
import { useTableColumns } from '@rovna-internal/table/Table/hooks/useTableColumns';

import { ThProps } from './types';
import { Root } from './styled';

const Th: React.FC<ThProps> = ({ className, ...props }) => {
  const theme = useTheme();
  const { columns } = useTableColumns();
  const context = useTourContext();
  const id = columns[Math.floor(columns.length / 3)]?.id;

  return (
    <Root
      theme={theme}
      {...props}
      ref={id === props.id ? context?.ui?.cell : undefined}
      className={['rovna-ui-features-table-cell', className].filter(Boolean).join(' ')}
    />
  );
};

Th.displayName = 'Table.Th';

export { Th };

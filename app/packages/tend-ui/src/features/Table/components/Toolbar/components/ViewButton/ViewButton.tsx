import React from 'react';
import { CardView } from '@rovna-ui/icons/CardView';
import { ListView } from '@rovna-ui/icons/ListView';

import { ToggleButton } from '@rovna-internal/components/primitives/ToggleButton';
import { Box } from '@rovna-internal/components/grid/Box';

import { View, ViewButtonProps } from './types';

const ViewButton = ({ onClick, onViewChange }: ViewButtonProps) => {
  const [view, setView] = React.useState<View>('table');
  const isList = view === 'list';
  const isTable = view === 'table';

  const handlerFactory = React.useCallback(
    (view: View) => {
      return (e: React.MouseEvent<HTMLButtonElement>) => {
        setView(view);
        onClick?.(e);
        onViewChange?.(view);
      };
    },
    [onClick, onViewChange],
  );

  return (
    <Box>
      <ToggleButton selected={isList} onClick={handlerFactory('list')}>
        <ListView />
      </ToggleButton>
      <ToggleButton selected={isTable} onClick={handlerFactory('table')}>
        <CardView />
      </ToggleButton>
    </Box>
  );
};

export { ViewButton };

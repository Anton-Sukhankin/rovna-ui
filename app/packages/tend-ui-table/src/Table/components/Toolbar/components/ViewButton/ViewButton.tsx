import React from 'react';
import { CardView, ListView } from '@rovna-ui/icons';
import { ToggleButton } from '@rovna-ui/primitives';
import { INTERNAL_RovnaUILogger as RovnaUILogger } from '@rovna-ui/utils';
import { Box } from '@rovna-ui/grid';

import { View, ViewButtonProps } from './types';

const ViewButton = ({ onClick, onViewChange }: ViewButtonProps) => {
  if (process.env.NODE_ENV === 'development') {
    RovnaUILogger.warning([
      '<Table.Toolbar.ViewButton /> устарел и более не поддерживается.',
      '',
      'Используйте <Table.ControlPanel />.',
    ]);
  }

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

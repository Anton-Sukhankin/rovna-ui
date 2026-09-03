import React from 'react';
import { Group } from '@rovna-ui/icons';
import { ToggleButton } from '@rovna-ui/primitives';
import { INTERNAL_RovnaUILogger as RovnaUILogger } from '@rovna-ui/utils';

import { GroupButtonProps } from './types';

const GroupButton = (props: GroupButtonProps) => {
  if (process.env.NODE_ENV === 'development') {
    RovnaUILogger.warning([
      '<Table.Toolbar.GroupButton /> устарел и более не поддерживается.',
      '',
      'Используйте <Table.ControlPanel />.',
    ]);
  }

  return (
    <ToggleButton {...props}>
      <Group />
    </ToggleButton>
  );
};

export { GroupButton };

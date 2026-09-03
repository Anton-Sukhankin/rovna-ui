import React from 'react';
import { INTERNAL_RovnaUILogger as RovnaUILogger } from '@rovna-ui/utils';

const Root: React.FC = ({ children }) => {
  if (process.env.NODE_ENV === 'development') {
    RovnaUILogger.warning([
      '<Table.Toolbar.Root /> устарел и более не поддерживается.',
      '',
      'Используйте <Table.ControlPanel />.',
    ]);
  }

  return <>{children}</>;
};

Root.displayName = 'Table.Toolbar.Root';

export { Root };

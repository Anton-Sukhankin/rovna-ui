import React from 'react';
import { ButtonGroup } from '@rovna-ui/primitives';

const Root = ({ children }: { children?: React.ReactNode }) => {
  return <ButtonGroup>{children}</ButtonGroup>;
};

Root.displayName = 'Table.ControlPanel.Root';

export { Root };

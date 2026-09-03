import React from 'react';

import { Root, Trigger } from './components';
import { ActionsButtonProps } from './types';

const ActionsButton = ({ children, ...props }: ActionsButtonProps) => {
  return (
    <Root {...props}>
      <Trigger>{children}</Trigger>
    </Root>
  );
};

ActionsButton.displayName = 'ActionsButton';
ActionsButton.Root = Root;
ActionsButton.Trigger = Trigger;

export { ActionsButton };

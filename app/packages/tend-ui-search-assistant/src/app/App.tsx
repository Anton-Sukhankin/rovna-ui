import React, { ReactElement } from 'react';

import { MainButton } from '@search-assistant/features/main-button';
import { Chat } from '@search-assistant/widgets/chat';
import { DrawerComponent } from '@search-assistant/widgets/drawer';

type AppProps = {
  renderEntry?: (handleVisible: () => void) => ReactElement;
  chatOnly?: boolean;
};

export const App = ({ chatOnly, renderEntry }: AppProps) => {
  if (chatOnly) return <Chat />;

  return (
    <>
      <MainButton renderEntry={renderEntry} />
      <DrawerComponent />
    </>
  );
};

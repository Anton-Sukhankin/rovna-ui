import React, { ReactElement } from 'react';
// @ts-expect-error module
import { StoreContext } from 'storeon/react';

import { App } from '@search-assistant/app/App';
import { QueryProvider } from '@search-assistant/app/providers';
import { store } from '@search-assistant/app/store';

type SearchAssistantProps = {
  renderEntry?: (handleVisible: () => void) => ReactElement;
  chatOnly?: boolean;
};

export const SearchAssistant = (props: SearchAssistantProps) => (
  <QueryProvider>
    <StoreContext.Provider value={store}>
      <App {...props} />
    </StoreContext.Provider>
  </QueryProvider>
);

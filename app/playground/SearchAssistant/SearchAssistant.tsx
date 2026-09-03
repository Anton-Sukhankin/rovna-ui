import React from 'react';

import { SearchAssistant } from '@rovna-ui/search-assistant';

import { AuthProvider } from './providers/AuthProvider';

export const SearchAssistantApp = () => (
  <AuthProvider>
    <SearchAssistant />
  </AuthProvider>
);

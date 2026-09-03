import React from 'react';

import { Client } from './types';
import { clientFactory } from './clientFactory';
import { client } from './client';

export const ApiClientContext = React.createContext<Client | undefined>(undefined);
export const useClient = () => {
  const Context = React.useContext(ApiClientContext);
  if (typeof Context === 'undefined') return clientFactory(client);

  return Context;
};

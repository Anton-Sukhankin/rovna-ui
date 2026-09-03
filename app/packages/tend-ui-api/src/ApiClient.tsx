import React from 'react';
import { AxiosInstance } from 'axios';

import { client as _client } from './client';
import { ApiClientContext, useClient } from './context';
import { clientFactory } from './clientFactory';

const ApiClient = ({
  children,
  client = _client,
}: React.PropsWithChildren<{
  client?: AxiosInstance;
}>) => {
  return (
    <ApiClientContext.Provider
      value={React.useMemo(() => clientFactory(client), [client])}
    >
      {children}
    </ApiClientContext.Provider>
  );
};

ApiClient.displayName = 'ApiClient';

export { ApiClient, useClient };

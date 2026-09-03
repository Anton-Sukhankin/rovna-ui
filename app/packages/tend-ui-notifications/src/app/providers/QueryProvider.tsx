import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import React, { FC } from 'react';

const tendUiQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 3 * (60 * 1000),
      retryDelay: attemptIndex => Math.min(2000 * 2 ** attemptIndex, 30000),
      retry: 0,
    },
  },
});

export const QueryProvider: FC = ({ children }) => {
  try {
    useQueryClient();

    return <>{children}</>;
  } catch (error) {
    return (
      <QueryClientProvider client={tendUiQueryClient}>{children}</QueryClientProvider>
    );
  }
};

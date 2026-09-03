import React from 'react';
import axios from 'axios';
import { useCallbackRef } from '@rovna-ui/hooks';

import { useClient } from '../../context';
import { RequestConfig } from '../../types';

export const usePostApi = <D, T = unknown>(url: string) => {
  const client = useClient();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<D | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  const request = useCallbackRef((data?: T, config?: RequestConfig) => {
    setLoading(true);
    setError(null);

    return client
      .post<D, T>(url, data, config)
      .then(response => {
        setLoading(false);
        setData(response);

        return response;
      })
      .catch(e => {
        if (axios.isCancel(e)) throw e;
        setLoading(false);
        setError(e);
        throw e;
      });
  });

  return {
    data,
    loading,
    error,
    request,
  };
};

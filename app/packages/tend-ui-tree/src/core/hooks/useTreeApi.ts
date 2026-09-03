import React from 'react';
import axios from 'axios';
import { useCallbackRef } from '@rovna-ui/hooks';
import { ApiFunctionPayload, ApiOptions, useClient } from '@rovna-ui/api';
import { ApiListResponse } from '@rovna-internal/components/types';

import { TreeData, TreeNode } from '../interfaces';

export const useApi = <D extends TreeData = TreeData>(
  api: ApiOptions<ApiListResponse<TreeNode<D>>>,
) => {
  const client = useClient();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<TreeNode<D>[] | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  const request = useCallbackRef((payload?: ApiFunctionPayload) => {
    setLoading(true);

    if (typeof api === 'string') {
      return client
        .get<ApiListResponse<TreeNode<D>>>(api, { params: payload?.params })
        .then(response => {
          setLoading(false);
          setData(response.results);

          return response;
        })
        .catch(e => {
          if (axios.isCancel(e)) throw e;
          setLoading(false);
          setError(e);
          throw e;
        });
    }
    if (typeof api === 'function') {
      return api(payload)
        .then(response => {
          setData(response.results);

          return response;
        })
        .catch(e => {
          setError(e);
          throw e;
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if ('url' in api) {
      return client
        .get<ApiListResponse<TreeNode<D>>>(api.url, {
          params: payload?.params,
          cancellable: api.cancellable,
        })
        .then(response => {
          setLoading(false);
          setData(response.results);

          return response;
        })
        .catch(e => {
          if (axios.isCancel(e)) throw e;
          setLoading(false);
          setError(e);
          throw e;
        });
    }

    return api
      .fn(payload)
      .then(response => {
        setData(response.results);

        return response;
      })
      .catch(e => {
        setError(e);
        throw e;
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return {
    data,
    loading,
    error,
    request,
    INTERNAL_setData: setData,
  };
};

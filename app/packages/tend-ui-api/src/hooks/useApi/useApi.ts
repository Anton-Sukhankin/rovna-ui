import React from 'react';
import axios from 'axios';
import { useCallbackRef } from '@rovna-ui/hooks';

import { useClient } from '../../context';
import { CacheManager } from '../../CacheManager';
import { ApiFunctionPayload, ApiOptions } from '../types';

export const useApi = <D>(api: ApiOptions<D>) => {
  const client = useClient();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<D | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  const request = useCallbackRef((payload?: ApiFunctionPayload) => {
    setLoading(true);

    if (typeof api === 'string') {
      return client
        .get<D>(api, { params: payload?.params })
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
    }
    if (typeof api === 'function') {
      return api(payload)
        .then(response => {
          setData(response);

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
        .get<D>(api.url, {
          params: payload?.params,
          cancellable: api.cancellable,
        })
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
    }

    return api
      .fn(payload)
      .then(response => {
        setData(response);

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

  const cacheRequest = useCallbackRef(
    (payload?: ApiFunctionPayload, options?: { force?: boolean }) => {
      if (typeof api === 'string' || typeof api === 'function' || !api.cache) {
        return request(payload);
      }

      const force = options?.force ?? false;
      const key = api.cache.key;
      const manager = new CacheManager({
        cacheTime: api?.cache.cacheTime,
        staleTime: api?.cache?.staleTime,
      });

      if (manager.isExists(key) && !force) {
        const cached = manager.get(key) as { timestamp: number; data: D };

        if (manager.isFresh(key)) {
          // if staled, refreshing data for next request
          if (manager.isStale(key)) {
            request(payload).then(response => {
              manager.set<D>(key, response);

              return response;
            });
          }

          setLoading(false);
          setData(cached.data);

          return Promise.resolve(cached.data);
        }
      }

      return request(payload).then(response => {
        if (!force) {
          manager.set(key, response);
        }

        return response;
      });
    },
  );

  return {
    data,
    loading,
    error,
    request: cacheRequest,
  };
};

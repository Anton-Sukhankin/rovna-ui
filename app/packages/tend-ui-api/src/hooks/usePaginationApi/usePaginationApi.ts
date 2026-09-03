import React from 'react';
import axios from 'axios';
import { useCallbackRef } from '@rovna-ui/hooks';
import { ApiListResponse } from '@rovna-ui/types';

import { useClient } from '../../context';
import { CacheManager } from '../../CacheManager';
import { ApiFunctionPayload, ApiOptions } from '../types';

export const usePaginationApi = <D>(api: ApiOptions<ApiListResponse<D>>) => {
  const client = useClient();
  const [loading, setLoading] = React.useState(false);
  const [info, setInfo] = React.useState<ApiListResponse<D> | null>(null);
  const [data, setData] = React.useState<D[] | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const isMoreLoading = React.useRef(false);

  const request = useCallbackRef((payload?: ApiFunctionPayload) => {
    setLoading(true);

    if (typeof api === 'string') {
      return client
        .get<ApiListResponse<D>>(api, { params: payload?.params })
        .then(response => {
          setLoading(false);
          setInfo(response);
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
          setInfo(response);
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
        .get<ApiListResponse<D>>(api.url, {
          params: payload?.params,
          cancellable: api.cancellable,
        })
        .then(response => {
          setLoading(false);
          setInfo(response);
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
        setInfo(response);
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
        const cached = manager.get(key) as {
          timestamp: number;
          data: ApiListResponse<D>;
        };

        if (manager.isFresh(key)) {
          // if staled, refreshing data for next request
          if (manager.isStale(key)) {
            request(payload).then(response => {
              manager.set<ApiListResponse<D>>(key, response);

              return response;
            });
          }

          setLoading(false);
          setInfo(cached.data);
          setData(cached.data.results);

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

  const handleLoadMoreByNext = (response: ApiListResponse<D>) => {
    isMoreLoading.current = false;
    setInfo(response);
    setData(previous => [...(previous || []), ...response.results]);
  };

  const next = useCallbackRef(() => {
    if (!info?.next || isMoreLoading.current) return;
    isMoreLoading.current = true;
    if (typeof info?.next === 'function') {
      info.next().then(handleLoadMoreByNext);
    } else {
      client.get<ApiListResponse<D>>(info?.next).then(handleLoadMoreByNext);
    }
  });

  return {
    data,
    loading,
    error,
    request: cacheRequest,
    next,
  };
};

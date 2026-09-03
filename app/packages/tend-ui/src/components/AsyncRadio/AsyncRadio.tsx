import React from 'react';
import debounce from 'lodash/debounce';
import { ApiFunctionPayload, ApiOptions, usePaginationApi } from '@rovna-ui/api';
import { isExceed } from '@rovna-ui/utils';

import { RadioGroupSearch } from '@rovna-internal/components/components/RadioGroupSearch';
import { RadioOptionType } from '@rovna-internal/components/primitives/Radio';
import { ApiListResponse } from '@rovna-internal/components/types/ApiListResponse';
import { useCallbackRef } from '@rovna-internal/components/hooks/useCallbackRef';

import { AsyncRadioComponent, AsyncRadioProps, AsyncRadioRef } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _transform = (data: any): RadioOptionType => ({
  value: data?.id,
  label: data?.name,
  ...data,
});

const BaseAsyncRadio = <D extends object = object>(
  {
    filterOption = false,
    pagination = false,
    api,
    onLoad,
    onSearch,
    transform = _transform,
    onScroll,
    ...props
  }: AsyncRadioProps<D>,
  ref: React.ForwardedRef<AsyncRadioRef>,
) => {
  const __api = React.useMemo<ApiOptions<ApiListResponse<D>>>(() => {
    if (!api) return '';
    if (typeof api === 'string')
      return {
        // enabling request cancelling by default
        cancellable: true,
        url: api,
      };

    if (typeof api === 'object')
      return {
        // enabling request cancelling by default
        cancellable: true,
        ...api,
      };

    return api;
  }, [api]);

  const isRequestCalled = React.useRef(false);
  const isBackendSearching = filterOption === false;

  const _query = React.useMemo(() => {
    // Предполагаем, что если объект api изменился, значит изменился и объект query
    // и нужно перезапросить данные
    isRequestCalled.current = false;

    if (typeof api !== 'object') return;

    return api.query;
  }, [api]);

  const request = useCallbackRef((payload?: ApiFunctionPayload, force = false) => {
    isRequestCalled.current = true;

    // TODO: Not the best practice
    // Maybe better pass query as as payload params in every usage
    const params = _query ? { ...payload?.params, ..._query } : payload?.params;
    _request({ ...payload, params }, { force })
      .then(response => {
        onLoad?.(response.results);
      })
      .catch(() => undefined);
  });

  React.useImperativeHandle(ref, () => ({
    request,
  }));

  const { loading, data, error, request: _request, next } = usePaginationApi(__api);

  const handleSearch = React.useMemo(
    () =>
      debounce((search: string) => {
        onSearch?.(search);
        if (!isBackendSearching) return;
        request({ params: { search } }, true);
      }, 300),
    [isBackendSearching, onSearch, request],
  );

  React.useEffect(() => () => handleSearch.cancel(), [handleSearch]);

  /**
   * Request on the first mount
   */
  React.useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_query]);

  // FIXME: Fix types
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const options = React.useMemo<RadioOptionType[]>(() => {
    if (!data) return [];

    return data.map(transform);
  }, [data, transform]);

  const handleScroll = React.useCallback<NonNullable<AsyncRadioProps['onScroll']>>(
    event => {
      onScroll?.(event);
      if (!pagination) return;
      const target = event.target as HTMLElement;
      if (!isExceed(target.scrollTop + target.offsetHeight, target.scrollHeight, 80)) {
        return;
      }

      next();
    },
    [next, onScroll, pagination],
  );

  return (
    <RadioGroupSearch
      {...props}
      error={Boolean(error)}
      loading={loading}
      options={options}
      onSearch={handleSearch}
      filterOption={filterOption}
      onScroll={handleScroll}
    />
  );
};

const AsyncRadio = React.forwardRef(BaseAsyncRadio) as AsyncRadioComponent;

AsyncRadio.displayName = 'AsyncRadio';

export { AsyncRadio };

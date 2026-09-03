import React from 'react';
import debounce from 'lodash/debounce';
import { ApiFunctionPayload, ApiOptions, usePaginationApi } from '@rovna-ui/api';
import { isExceed } from '@rovna-ui/utils';

import { DefaultOptionType, Select } from '@rovna-internal/components/primitives/Select';
import { useCallbackRef } from '@rovna-internal/components/hooks/useCallbackRef';
import { ApiListResponse } from '@rovna-internal/components/types/ApiListResponse';
import { EmptyOverlay } from '@rovna-internal/components/ui/EmptyOverlay';
import { ErrorOverlay } from '@rovna-internal/components/ui/ErrorOverlay';

import { AsyncSelectComponent, AsyncSelectProps, AsyncSelectRef } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _transform = (data: any): DefaultOptionType => ({
  value: data?.id,
  label: data?.name,
  ...data,
});

const BaseAsyncSelect = <D extends object = object>(
  {
    filterOption = false,
    pagination = false,
    api,
    searchPropName = 'search',
    preload = ['onopen'],
    onLoad,
    onSearch,
    onSelect,
    onBlur,
    onDropdownVisibleChange,
    transform = _transform,
    onPopupScroll,
    autoClearSearchValue = true,
    ...props
  }: AsyncSelectProps<D>,
  ref: React.ForwardedRef<AsyncSelectRef>,
) => {
  const __api = React.useMemo<ApiOptions<ApiListResponse<D>>>(() => {
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
  const { loading, data, error, request: __request, next } = usePaginationApi(__api);

  /**
   * Нужно для отслеживания были ли получены данные или нет чтобы не делать
   * лишних запросов
   */
  const isRequestCalled = React.useRef(false);
  const isSearchTyped = React.useRef(false);
  const isMountingPreload = preload.includes('onmount');
  const isOpeningPreload = preload.includes('onopen');
  const isEveryOpeningPreload = preload.includes('oneveryopen');
  const isBluringPreload = preload.includes('onblur');
  const isEveryBluringPreload = preload.includes('oneveryblur');
  const isBackendSearching = filterOption === false;

  const isMultiple = props.mode === 'multiple';
  const isTags = props.mode === 'tags';
  const isSingle = !isMultiple && !isTags;

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

    __request({ ...payload, params }, { force })
      .then(response => {
        onLoad?.(response.results);
      })
      .catch(() => undefined);
  });

  React.useImperativeHandle(ref, () => ({
    request,
  }));

  /**
   * Request on the first mount
   */
  React.useEffect(() => {
    if (!isMountingPreload) return;
    request();
    // Следим за обновлением query объекта передаваемым извне
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_query]);

  const handleDropdownVisibleChange: NonNullable<
    AsyncSelectProps<D>['onDropdownVisibleChange']
  > = React.useCallback(
    value => {
      onDropdownVisibleChange?.(value);
      if (!value) return;

      if (isEveryOpeningPreload) {
        request();

        return;
      }

      if (isOpeningPreload && !isRequestCalled.current) {
        request();

        return;
      }
    },
    [isEveryOpeningPreload, isOpeningPreload, onDropdownVisibleChange, request],
  );
  const handleSelect: NonNullable<AsyncSelectProps<D>['onSelect']> = React.useCallback(
    (...params) => {
      onSelect?.(...params);
      if (!isSingle || !isSearchTyped.current) return;
      isSearchTyped.current = false;
      /**
       * Перезапрашиваем данные без поискового запроса
       */
      request();
    },
    [isSingle, onSelect, request],
  );
  const handleSearch = React.useMemo(
    () =>
      debounce((search: string) => {
        onSearch?.(search);
        if (!isBackendSearching) return;
        if (!search) {
          isSearchTyped.current = false;
          request();

          return;
        }
        request({ params: { [searchPropName]: search } }, true);
        isSearchTyped.current = true;
      }, 300),
    [isBackendSearching, onSearch, request, searchPropName],
  );
  React.useEffect(() => () => handleSearch.cancel(), [handleSearch]);
  const handleBlur: NonNullable<AsyncSelectProps<D>['onBlur']> = React.useCallback(
    event => {
      onBlur?.(event);

      /**
       * Если установлен флаг запрашивать данные на каждый blur
       * или если мы выполнили поиск и после произошел blur
       * нужно перезапросить данные в изначальном виде без параметров search
       */
      if (isEveryBluringPreload || (isSearchTyped.current && autoClearSearchValue)) {
        request();

        return;
      }

      if (isBluringPreload && !isRequestCalled.current) {
        request();
      }
    },
    [autoClearSearchValue, isBluringPreload, isEveryBluringPreload, onBlur, request],
  );
  const notFoundContent = React.useMemo(() => {
    if (error) return <ErrorOverlay />;

    return <EmptyOverlay />;
  }, [error]);
  const options = React.useMemo<DefaultOptionType[]>(() => {
    if (!data) return [];

    return data.map(transform);
  }, [data, transform]);

  const handlePopupScroll = React.useCallback<
    NonNullable<AsyncSelectProps['onPopupScroll']>
  >(
    event => {
      onPopupScroll?.(event);
      if (!pagination) return;
      const target = event.target as HTMLElement;
      if (!isExceed(target.scrollTop + target.offsetHeight, target.scrollHeight, 80)) {
        return;
      }

      next();
    },
    [next, onPopupScroll, pagination],
  );

  return (
    <Select<D>
      {...props}
      filterOption={filterOption}
      loading={loading}
      autoClearSearchValue={autoClearSearchValue}
      options={options}
      notFoundContent={notFoundContent}
      onSearch={handleSearch}
      onSelect={handleSelect}
      onBlur={handleBlur}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      onPopupScroll={handlePopupScroll}
    />
  );
};

const AsyncSelect = React.forwardRef(BaseAsyncSelect) as AsyncSelectComponent;

AsyncSelect.displayName = 'AsyncSelect';

export { AsyncSelect };

import React from 'react';

import {
  DefaultOptionType,
  SelectProps as DefaultSelectProps,
} from '@rovna-internal/components/primitives/Select';
import { ApiListResponse } from '@rovna-internal/components/types/ApiListResponse';
import type {
  ApiFunction,
  ApiFunctionPayload,
  ApiFunctionConfig as _ApiFunctionConfig,
  ApiUrlConfig as _ApiUrlConfig,
} from '@rovna-internal/components/hooks/useApi';
import { GenericObject } from '@rovna-internal/components/types/GenericObject';

type ApiUrlConfig = _ApiUrlConfig & {
  query?: GenericObject;
};
type ApiFunctionConfig<D> = _ApiFunctionConfig<D> & {
  query?: GenericObject;
};
type ApiOptions<D> = string | ApiFunction<D> | ApiUrlConfig | ApiFunctionConfig<D>;
export type GenericData = {
  id: string | number;
  name: string;
};
export type Preload = 'onmount' | 'onopen' | 'oneveryopen' | 'onblur' | 'oneveryblur';

type BaseAsyncSelectProps<D extends object = object> = {
  /**
   * Свойство позволяет задать `url` или асинхронный метод для отправки запроса
   */
  api: ApiOptions<ApiListResponse<D>>;
  /**
   * Включает/выключает `infinite scrolling`
   */
  pagination?: boolean;
  /**
   * Свойство позволяет настроить в какой момент отправлять запрос на получение данных
   */
  preload?: Preload[];
  /**
   * Свойство позволяет настроить какое имя будет использоваться при отправки поискового запроса
   *
   * @default `search`
   */
  searchPropName?: string;
  /**
   * Свойство позволяет трансформировать полученные данные перед тем как передать их в `AsyncSelect`
   */
  transform?: (data: D) => DefaultOptionType;
  /**
   * Вызывается при успешной загрузке данных
   */
  onLoad?: (data: D[]) => void;
};
export type AsyncSelectRef = {
  request: (payload?: ApiFunctionPayload) => void;
};
export type AsyncSelectProps<D extends object = object> = Omit<
  DefaultSelectProps<D>,
  'options' | 'notFoundContent' | 'loading'
> &
  BaseAsyncSelectProps<D>;
export type AsyncSelectComponent = (<D extends object = object>(
  props: AsyncSelectProps<D> & { ref?: React.ForwardedRef<AsyncSelectRef> },
) => React.JSX.Element) &
  Pick<React.FC, 'displayName'>;

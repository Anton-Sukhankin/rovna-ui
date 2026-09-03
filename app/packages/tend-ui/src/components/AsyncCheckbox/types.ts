import React from 'react';

import { CheckboxGroupSearchProps } from '@rovna-internal/components/components/CheckboxGroupSearch';
import { ApiListResponse } from '@rovna-internal/components/types/ApiListResponse';
import { CheckboxOptionType } from '@rovna-internal/components/primitives/Checkbox';
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

type BaseAsyncCheckboxProps<D extends object = object> = {
  api: ApiOptions<ApiListResponse<D>>;
  pagination?: boolean;
  transform?: (data: D) => CheckboxOptionType;
  onLoad?: (data: D[]) => void;
};
export type AsyncCheckboxRef = {
  request: (payload?: ApiFunctionPayload) => void;
};
export type AsyncCheckboxProps<D extends object = object> = Omit<
  CheckboxGroupSearchProps,
  'options' | 'error'
> &
  BaseAsyncCheckboxProps<D>;
export type AsyncCheckboxComponent = (<D extends object = object>(
  props: AsyncCheckboxProps<D> & { ref?: React.ForwardedRef<AsyncCheckboxRef> },
) => React.JSX.Element) &
  Pick<React.FC, 'displayName'>;

import { get } from './methods';
import { ApiPaginatedListParams, ApiPaginatedListResponse, GenericParams } from './types';

export const makePaginatedListFetch =
  <TResult, TParams extends GenericParams = GenericParams>(path: string) =>
  (params?: ApiPaginatedListParams<TParams>) =>
    get<ApiPaginatedListResponse<TResult>>(path, params);

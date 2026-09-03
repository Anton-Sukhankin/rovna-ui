export type CacheOptions = {
  key: string;
  cacheTime?: number;
  staleTime?: number;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiFunctionPayload<T = any> = {
  params?: T;
};
/**
 * @deprecated Use `ApiFunctionPayload` instead
 */
export type ApiFunctionParams = ApiFunctionPayload;
export type ApiFunction<D> = (params?: ApiFunctionPayload) => Promise<D>;
export type ApiUrlConfig = {
  url: string;
  cancellable?: boolean;
  cache?: CacheOptions;
};
export type ApiFunctionConfig<D> = {
  fn: ApiFunction<D>;
  cache?: CacheOptions;
};
export type ApiOptions<D> = string | ApiFunction<D> | ApiUrlConfig | ApiFunctionConfig<D>;

import { AxiosResponse } from 'axios';

import { InternalRequestConfig } from '../types';

/**
 * @description Интерфейс  базового middleware для axios
 */
export interface AxiosMiddleware {
  onRequest?(config: InternalRequestConfig): InternalRequestConfig;
  onRequestError?<T = unknown>(error: T): Promise<T>;
  onResponse?<D = unknown>(response: AxiosResponse<D>): AxiosResponse<D>;
  onResponseError?<T = unknown>(error: T): Promise<T>;
}

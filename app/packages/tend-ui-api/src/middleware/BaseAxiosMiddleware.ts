import { AxiosResponse } from 'axios';

import { AxiosMiddleware } from './types';
import { InternalRequestConfig } from '../types';

/**
 * @description Base middleware axios class
 */
export class BaseAxiosMiddleware implements AxiosMiddleware {
  onRequest = (config: InternalRequestConfig): InternalRequestConfig => {
    return config;
  };

  onRequestError = <T = unknown>(error: T): Promise<T> => {
    return Promise.reject(error);
  };

  onResponse = <D = unknown>(response: AxiosResponse<D>): AxiosResponse<D> => {
    return response;
  };

  onResponseError = <T = unknown>(error: T): Promise<T> => {
    return Promise.reject(error);
  };
}

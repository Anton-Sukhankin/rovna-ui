import axios, { AxiosResponse, CancelTokenSource } from 'axios';

import { BaseAxiosMiddleware } from './BaseAxiosMiddleware';
import { InternalRequestConfig, RequestConfig } from '../types';

/**
 * @description Middleware для библиотеки axios отвечающая за отмену повторно отправленных запросов
 */
export class RequestCanceller extends BaseAxiosMiddleware {
  private readonly pendingRequests = new Map<string, CancelTokenSource>();

  /**
   * @description Is request running?
   */
  private isPending = (url: string) => {
    return this.pendingRequests.has(url);
  };

  /**
   * @description Remove request
   */
  private unregister = (url: string) => {
    this.pendingRequests.delete(url);
  };

  /**
   * @description Register request
   */
  private register = (url: string, request: RequestConfig) => {
    const source = axios.CancelToken.source();
    this.pendingRequests.set(url, source);
    request.cancelToken = source.token;
  };

  /**
   * @description Cancel request
   */
  private cancel = (url: string) => {
    const source = this.pendingRequests.get(url);
    this.pendingRequests.delete(url);
    source?.cancel();
  };

  onRequest = (request: InternalRequestConfig): InternalRequestConfig => {
    const { cancellable = false } = request;
    if (!request.url || !cancellable) return request;
    if (this.isPending(request.url)) this.cancel(request.url);
    this.register(request.url, request);

    return request;
  };

  onResponse = <D = unknown>(response: AxiosResponse<D>): AxiosResponse<D> => {
    if (!response.config.url) return response;
    if (this.isPending(response.config.url)) this.unregister(response.config.url);

    return response;
  };
}

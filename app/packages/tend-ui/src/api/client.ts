import axios from 'axios';

import { RequestConfig } from './types';
import { RequestCanceller } from './middleware';

const client = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * Register all middlewares
 */
[RequestCanceller].forEach(Middleware => {
  const instance = new Middleware();
  client.interceptors.request.use(instance.onRequest, instance.onRequestError);
  client.interceptors.response.use(instance.onResponse, instance.onResponseError);
});

export const get = <D>(url: string, config?: RequestConfig) =>
  client.get<D>(url, config).then(response => response.data);

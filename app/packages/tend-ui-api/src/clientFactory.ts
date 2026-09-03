import { AxiosInstance } from 'axios';

import { Client, RequestConfig } from './types';

export const clientFactory = (instance: AxiosInstance): Client => ({
  get: (url: string, config?: RequestConfig) =>
    instance.get(url, config).then(response => response.data),
  post: <D, T = unknown>(url: string, data?: T, config?: RequestConfig) =>
    instance.post<D>(url, data, config).then(response => response.data),
});

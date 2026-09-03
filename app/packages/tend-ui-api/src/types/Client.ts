import { RequestConfig } from './RequestConfig';

export type Client = {
  get: <D>(url: string, config?: RequestConfig) => Promise<D>;
  post: <D, T = unknown>(url: string, data?: T, config?: RequestConfig) => Promise<D>;
};

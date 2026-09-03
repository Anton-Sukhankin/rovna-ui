import { AxiosRequestConfig } from 'axios';

export type GenericParams = Record<string, unknown>;
export type GenericData = Record<string, unknown>;

export type AxiosOptions = Omit<AxiosRequestConfig, 'url' | 'method'>;

export type ApiPaginatedListParams<T extends GenericParams = GenericParams> = T &
  Partial<{
    size: number;
    page: number;
    ordering: string;
  }>;

export type ApiPaginatedListResponse<T = unknown> = {
  items: Array<T>;
  total: number;
  page: number;
  pages: number;
  size: number;
};

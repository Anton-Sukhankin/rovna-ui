import { AxiosRequestConfig } from 'axios';

/**
 * @description Axios Config instance decorator
 */
export type RequestConfig = AxiosRequestConfig & {
  /**
   * @description Should cancel a request (CancelToken)
   * @default false
   */
  cancellable?: boolean;
};

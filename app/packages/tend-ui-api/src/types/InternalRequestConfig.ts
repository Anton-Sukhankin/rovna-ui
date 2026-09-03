import { InternalAxiosRequestConfig } from 'axios';

/**
 * @description Axios Config instance decorator
 */
export type InternalRequestConfig = InternalAxiosRequestConfig & {
  /**
   * @description Should cancel a request (CancelToken)
   * @default false
   */
  cancellable?: boolean;
};

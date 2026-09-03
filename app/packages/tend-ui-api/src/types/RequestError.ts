import { AxiosError } from 'axios';

import { RequestConfig } from './RequestConfig';

/**
 * @description Axios Error instance decorator
 */
export interface RequestError extends Omit<AxiosError, 'config'> {
  config: RequestConfig;
}

import { Toast } from '@rovna-ui/components/primitives';
import { AxiosError, AxiosResponse, CancelToken, Method } from 'axios';
import queryString from 'query-string';

import { axiosClient } from './client';
import { AxiosOptions, GenericData, GenericParams } from './types';

export const redirectToLogin = () => {
  const url = new URL('/accounts/login/samolet/', window.location.origin);

  url.searchParams.set('next', window.location.pathname);
  window.location.replace(url.toString());
};

export const requestErrorMessage = (error: AxiosError) => {
  const errorMessage: string =
    error.response?.status || error.request || error.message || 'Something went wrong';

  return Toast.error({
    duration: 5,
    message: `Произошла ошибка при обращении к серверу: ${errorMessage}`,
  });
};

const request = async <T>(
  method: Method,
  url: string,
  options?: AxiosOptions,
  hideMessage?: boolean,
) => {
  try {
    const response: AxiosResponse<T> = await axiosClient.request({
      method,
      url,
      ...options,
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError;

    if (!hideMessage) requestErrorMessage(err);
    console.error(err.response);

    throw err;
  }
};

export const get = <T, P = GenericParams>(
  url: string,
  params?: P,
  hideMessage?: boolean,
  cancelToken?: CancelToken,
  options?: AxiosOptions,
) =>
  request<T>(
    'get',
    url,
    {
      params,
      paramsSerializer: p => queryString.stringify(p, { arrayFormat: 'comma' }),
      cancelToken,
      ...options,
    },
    hideMessage,
  );

export const post = <T, D = GenericData>(
  url: string,
  data?: D,
  hideMessage?: boolean,
  options?: AxiosOptions,
) => request<T>('post', url, { data, ...options }, hideMessage);

export const put = <T, D = GenericData>(
  url: string,
  data?: D,
  hideMessage?: boolean,
  options?: AxiosOptions,
) => request<T>('put', url, { data, ...options }, hideMessage);

export const patch = <T, D = GenericData>(
  url: string,
  data?: D,
  hideMessage?: boolean,
  options?: AxiosOptions,
) => request<T>('patch', url, { data, ...options }, hideMessage);

export const del = <T, D = GenericData>(url: string, data?: D, options?: AxiosOptions) =>
  request<T>('delete', url, { data, ...options });

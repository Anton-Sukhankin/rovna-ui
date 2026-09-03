import axios from 'axios';

import { RequestCanceller } from './middleware';

export const client = axios.create({
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

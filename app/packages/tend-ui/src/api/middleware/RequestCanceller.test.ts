import axios, { AxiosError } from 'axios';
import nock from 'nock';

import { BaseAxiosMiddleware } from './BaseAxiosMiddleware';
import { RequestCanceller } from './RequestCanceller';
import { RequestConfig } from '../types';

describe('RequestCanceller', () => {
  it('return correct result', () => {
    const instance = new RequestCanceller();
    expect(instance).toBeInstanceOf(BaseAxiosMiddleware);
  });

  it('cancels the same request correctly', async () => {
    const DOMAIN = 'http://localhost';

    const canceller = new RequestCanceller();
    const client = axios.create({
      baseURL: DOMAIN,
    });
    const scope = nock(DOMAIN).get('/some-url/').reply(200, 'ok');

    client.interceptors.request.use(canceller.onRequest);
    client.interceptors.response.use(canceller.onResponse, (e: AxiosError) => e);

    const config: RequestConfig = { cancellable: true };
    const promise_1 = client.get<'ok'>('/some-url/', config);
    const promise_2 = client.get<'ok'>('/some-url/', config).then(r => r.data);

    expect(await promise_1).toBeInstanceOf(axios.Cancel);
    expect(await promise_2).toBe('ok');
    scope.done();
  });

  it('does not cancel different requests', async () => {
    const DOMAIN = 'http://localhost';

    const canceller = new RequestCanceller();
    const client = axios.create({
      baseURL: DOMAIN,
    });
    const scope_1 = nock(DOMAIN).get('/first-url/').reply(200, 'result_1');
    const scope_2 = nock(DOMAIN).get('/second-url/').reply(200, 'result_2');

    client.interceptors.request.use(canceller.onRequest);
    client.interceptors.response.use(canceller.onResponse, (e: AxiosError) => e);

    const promise_1 = client.get<'result_1'>('/first-url/').then(r => r.data);
    const promise_2 = client.get<'result_2'>('/second-url/').then(r => r.data);

    expect(await promise_1).not.toBeInstanceOf(axios.Cancel);
    expect(await promise_2).not.toBeInstanceOf(axios.Cancel);

    expect(await promise_1).toBe('result_1');
    expect(await promise_2).toBe('result_2');

    scope_1.done();
    scope_2.done();
  });
});

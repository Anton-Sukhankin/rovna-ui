import React from 'react';
import nock from 'nock';
import {
  act,
  configure,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';

import { AsyncSelect } from './AsyncSelect';

configure({ asyncUtilTimeout: 5000 });

const findMockOptions = async (renderer: RenderResult, count = 5) => {
  await Promise.all(
    Array.from({ length: count }, (_, index) =>
      renderer.findByText(new RegExp(`Mock option ${index + 1}`)),
    ),
  );
};

const openSelect = async (renderer: RenderResult) => {
  await renderer.findByText(/Выбрать/);
  await act(async () => {
    fireEvent.mouseDown(renderer.getByRole('combobox'));
  });
};

describe('AsyncSelect', () => {
  describe('given "mode" is "single"', () => {
    beforeEach(() => {
      jest.clearAllTimers();
      jest.clearAllMocks();
      nock.cleanAll();
    });
    describe('given "api" property is plain url string', () => {
      beforeEach(() => {
        jest.clearAllTimers();
        jest.clearAllMocks();
        nock.cleanAll();
      });
      it('requests data correctly', async () => {
        const scope = nock('http://localhost')
          .get('/api/animals/')
          .reply(200, {
            results: [
              { id: 1, name: 'Mock option 1' },
              { id: 2, name: 'Mock option 2' },
              { id: 3, name: 'Mock option 3' },
              { id: 4, name: 'Mock option 4' },
              { id: 5, name: 'Mock option 5' },
            ],
          });

        const renderer = render(
          <AsyncSelect
            preload={['onmount']}
            placeholder='Выбрать'
            api='http://localhost/api/animals/'
          />,
        );

        await openSelect(renderer);

        await findMockOptions(renderer);

        const option_1 = renderer.getByText(/Mock option 1/);
        const option_2 = renderer.getByText(/Mock option 2/);
        const option_3 = renderer.getByText(/Mock option 3/);
        const option_4 = renderer.getByText(/Mock option 4/);
        const option_5 = renderer.getByText(/Mock option 5/);

        expect(option_1).toBeInTheDocument();
        expect(option_2).toBeInTheDocument();
        expect(option_3).toBeInTheDocument();
        expect(option_4).toBeInTheDocument();
        expect(option_5).toBeInTheDocument();

        scope.done();
      });
      describe('when data is loaded', () => {
        it('calls "onLoad" correctly', async () => {
          const onLoadMock = jest.fn();
          const scope = nock('http://localhost')
            .get('/api/animals/')
            .reply(200, {
              results: [
                { id: 1, name: 'Mock option 1' },
                { id: 2, name: 'Mock option 2' },
                { id: 3, name: 'Mock option 3' },
                { id: 4, name: 'Mock option 4' },
                { id: 5, name: 'Mock option 5' },
              ],
            });

          const renderer = render(
            <AsyncSelect
              preload={['onmount']}
              placeholder='Выбрать'
              api='http://localhost/api/animals/'
              onLoad={onLoadMock}
            />,
          );

          await openSelect(renderer);

          await findMockOptions(renderer);

          expect(onLoadMock).toHaveBeenCalledWith([
            { id: 1, name: 'Mock option 1' },
            { id: 2, name: 'Mock option 2' },
            { id: 3, name: 'Mock option 3' },
            { id: 4, name: 'Mock option 4' },
            { id: 5, name: 'Mock option 5' },
          ]);

          scope.done();
        });
      });
      describe('and some option has been selected', () => {
        it('does not request data correctly', async () => {
          let calls = 0;

          const _scope = nock('http://localhost')
            .get('/api/animals/')
            .reply(200, () => {
              calls = calls + 1;

              return {
                results: [
                  { id: 1, name: 'Mock option 1' },
                  { id: 2, name: 'Mock option 2' },
                  { id: 3, name: 'Mock option 3' },
                ],
              };
            })
            .get('/api/animals/')
            .reply(200, () => {
              calls = calls + 1;

              return {
                results: [
                  { id: 1, name: 'Mock option 1' },
                  { id: 2, name: 'Mock option 2' },
                  { id: 3, name: 'Mock option 3' },
                ],
              };
            });

          const renderer = render(
            <AsyncSelect
              preload={['onmount']}
              placeholder='Выбрать'
              api='http://localhost/api/animals/'
            />,
          );

          await openSelect(renderer);

          await findMockOptions(renderer, 3);

          const option_1 = await renderer.findByText(/Mock option 1/);

          expect(option_1).toBeInTheDocument();

          await act(async () => {
            fireEvent.click(option_1);
          });

          expect(calls).toBe(1);
        });
      });
      describe('and "preload" is "onopen" only', () => {
        it('requests data  correctly', async () => {
          let calls = 0;

          const scope = nock('http://localhost')
            .get('/api/animals/')
            .reply(200, () => {
              calls = calls + 1;

              return {
                results: [
                  { id: 1, name: 'Mock option 1' },
                  { id: 2, name: 'Mock option 2' },
                  { id: 3, name: 'Mock option 3' },
                ],
              };
            });

          const renderer = render(
            <AsyncSelect placeholder='Выбрать' api='http://localhost/api/animals/' />,
          );

          // Making sure the request is not beeing send right after component mounting
          expect(calls).toBe(0);

          await openSelect(renderer);

          await findMockOptions(renderer, 3);

          const option_1 = await renderer.findByText(/Mock option 1/);
          const option_2 = await renderer.findByText(/Mock option 2/);
          const option_3 = await renderer.findByText(/Mock option 3/);

          expect(option_1).toBeInTheDocument();
          expect(option_2).toBeInTheDocument();
          expect(option_3).toBeInTheDocument();

          expect(calls).toBe(1);

          scope.done();
        });
      });
      describe('and "preload" is "onblur" only', () => {
        it('requests data when "preload" is "onblur" correctly', async () => {
          const api = jest.fn().mockResolvedValue({
            results: [
              { id: 1, name: 'Mock option 1' },
              { id: 2, name: 'Mock option 2' },
              { id: 3, name: 'Mock option 3' },
            ],
          });

          const renderer = render(
            <AsyncSelect placeholder='Выбрать' api={api} preload={['onblur']} />,
          );

          // Making sure the request is not beeing send right after component mounting
          expect(api).not.toHaveBeenCalled();

          const placeholder = await renderer.findByText(/Выбрать/);

          // Открываем селект
          await act(async () => {
            fireEvent.mouseDown(placeholder);
          });

          expect(api).not.toHaveBeenCalled();

          // Закрываем селект через блюр
          await act(async () => {
            fireEvent.blur(placeholder);
          });

          const option_1 = await renderer.findByText(/Mock option 1/);
          const option_2 = await renderer.findByText(/Mock option 2/);
          const option_3 = await renderer.findByText(/Mock option 3/);

          expect(option_1).toBeInTheDocument();
          expect(option_2).toBeInTheDocument();
          expect(option_3).toBeInTheDocument();
        });
      });
      describe('when some value has been typed in order to search', () => {
        it('requests data with "search" parameter correctly', async () => {
          const scope = nock('http://localhost')
            .get('/api/animals/')
            .reply(200, {
              results: [
                { id: 1, name: 'Mock option 1' },
                { id: 2, name: 'Mock option 2' },
                { id: 3, name: 'Mock option 3' },
              ],
            })
            .get('/api/animals/?search=Mock option 1')
            .reply(200, {
              results: [{ id: 1, name: 'Mock option 1' }],
            });

          const renderer = render(
            <AsyncSelect
              showSearch
              preload={['onmount']}
              placeholder='Выбрать'
              api='http://localhost/api/animals/'
            />,
          );

          const placeholder = await renderer.findByText(/Выбрать/);

          await act(async () => {
            fireEvent.mouseDown(placeholder);
          });

          await findMockOptions(renderer, 3);

          expect(renderer.getByText(/Mock option 1/)).toBeInTheDocument();
          expect(renderer.getByText(/Mock option 2/)).toBeInTheDocument();
          expect(renderer.getByText(/Mock option 3/)).toBeInTheDocument();

          const input = renderer.getByRole('combobox');

          await act(async () => {
            fireEvent.change(input, { target: { value: 'Mock option 1' } });
          });

          // Wait for debounce delay
          await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 350));
          });

          // Waiting for other options to dissappear
          await waitFor(() => {
            expect(renderer.queryByText(/Mock option 2/)).not.toBeInTheDocument();
            expect(renderer.queryByText(/Mock option 3/)).not.toBeInTheDocument();
          });

          scope.done();
        });
        describe('and "searchPropName" is customized', () => {
          it('requests data with "search" parameter correctly', async () => {
            const scope = nock('http://localhost')
              .get('/api/animals/')
              .reply(200, {
                results: [
                  { id: 1, name: 'Mock option 1' },
                  { id: 2, name: 'Mock option 2' },
                  { id: 3, name: 'Mock option 3' },
                ],
              })
              .get('/api/animals/?searchTerm=Mock option 1')
              .reply(200, {
                results: [{ id: 1, name: 'Mock option 1' }],
              });

            const renderer = render(
              <AsyncSelect
                showSearch
                searchPropName='searchTerm'
                preload={['onmount']}
                placeholder='Выбрать'
                api='http://localhost/api/animals/'
              />,
            );

            await openSelect(renderer);

            await findMockOptions(renderer, 3);

            expect(renderer.getByText(/Mock option 1/)).toBeInTheDocument();
            expect(renderer.getByText(/Mock option 2/)).toBeInTheDocument();
            expect(renderer.getByText(/Mock option 3/)).toBeInTheDocument();

            const input = renderer.getByRole('combobox');

            await act(async () => {
              fireEvent.change(input, { target: { value: 'Mock option 1' } });
            });

            // Wait for debounce delay
            await act(async () => {
              await new Promise(resolve => setTimeout(resolve, 350));
            });

            // Waiting for other options to dissappear
            await waitFor(() => {
              expect(renderer.queryByText(/Mock option 2/)).not.toBeInTheDocument();
              expect(renderer.queryByText(/Mock option 3/)).not.toBeInTheDocument();
            });

            scope.done();
          });
        });
        describe('and option has been selected', () => {
          it('refetches data without any "search" parameter correctly', async () => {
            const api = jest.fn().mockResolvedValue({
              results: [
                { id: 1, name: 'Mock option 1' },
                { id: 2, name: 'Mock option 2' },
                { id: 3, name: 'Mock option 3' },
              ],
            });

            const renderer = render(
              <AsyncSelect
                showSearch
                preload={['onmount']}
                placeholder='Выбрать'
                api={api}
              />,
            );

            const placeholder = await renderer.findByText(/Выбрать/);

            await act(async () => {
              fireEvent.mouseDown(placeholder);
            });

            await findMockOptions(renderer, 3);

            expect(renderer.getByText(/Mock option 1/)).toBeInTheDocument();
            expect(renderer.getByText(/Mock option 2/)).toBeInTheDocument();
            expect(renderer.getByText(/Mock option 3/)).toBeInTheDocument();

            const input = renderer.getByRole('combobox');

            await act(async () => {
              fireEvent.change(input, { target: { value: 'Mock option 1' } });
            });

            await waitFor(() => {
              expect(api).toHaveBeenCalledWith({ params: { search: 'Mock option 1' } });
            });

            await act(async () => {
              fireEvent.click(renderer.getByText(/Mock option 1/));
            });

            await waitFor(() => {
              expect(api).toHaveBeenCalledWith({ params: undefined });
            });
          });
        });
      });
    });
    describe('given "api" as a function', () => {
      beforeEach(() => {
        jest.clearAllTimers();
        jest.clearAllMocks();
        nock.cleanAll();
      });
      it('requests data correctly', async () => {
        const api = jest.fn().mockResolvedValue({
          results: [
            { id: 1, name: 'Mock option 1' },
            { id: 2, name: 'Mock option 2' },
            { id: 3, name: 'Mock option 3' },
            { id: 4, name: 'Mock option 4' },
            { id: 5, name: 'Mock option 5' },
          ],
        });

        const renderer = render(
          <AsyncSelect preload={['onmount']} placeholder='Выбрать' api={api} />,
        );

        expect(api).toHaveBeenCalledTimes(1);

        await openSelect(renderer);

        const option_1 = await renderer.findByText(/Mock option 1/);
        const option_2 = await renderer.findByText(/Mock option 2/);
        const option_3 = await renderer.findByText(/Mock option 3/);
        const option_4 = await renderer.findByText(/Mock option 4/);
        const option_5 = await renderer.findByText(/Mock option 5/);

        expect(option_1).toBeInTheDocument();
        expect(option_2).toBeInTheDocument();
        expect(option_3).toBeInTheDocument();
        expect(option_4).toBeInTheDocument();
        expect(option_5).toBeInTheDocument();
      });
      describe('when data is loaded', () => {
        it('executes "onLoad" callback with data correctly', async () => {
          const api = jest.fn().mockResolvedValue({
            results: [
              { id: 1, name: 'Mock option 1' },
              { id: 2, name: 'Mock option 2' },
              { id: 3, name: 'Mock option 3' },
              { id: 4, name: 'Mock option 4' },
              { id: 5, name: 'Mock option 5' },
            ],
          });

          const onLoadMock = jest.fn();

          render(
            <AsyncSelect
              preload={['onmount']}
              placeholder='Выбрать'
              api={api}
              onLoad={onLoadMock}
            />,
          );

          await waitFor(() => {
            expect(onLoadMock).toHaveBeenCalledWith([
              { id: 1, name: 'Mock option 1' },
              { id: 2, name: 'Mock option 2' },
              { id: 3, name: 'Mock option 3' },
              { id: 4, name: 'Mock option 4' },
              { id: 5, name: 'Mock option 5' },
            ]);
          });
        });
      });
      describe('when some option has been selected', () => {
        it('does not request data again correctly', async () => {
          const api = jest.fn().mockResolvedValue({
            results: [
              { id: 1, name: 'Mock option 1' },
              { id: 2, name: 'Mock option 2' },
              { id: 3, name: 'Mock option 3' },
              { id: 4, name: 'Mock option 4' },
              { id: 5, name: 'Mock option 5' },
            ],
          });

          const renderer = render(
            <AsyncSelect preload={['onmount']} placeholder='Выбрать' api={api} />,
          );

          expect(api).toHaveBeenCalledTimes(1);

          await openSelect(renderer);

          const option_1 = await renderer.findByText(/Mock option 1/);

          await act(async () => {
            fireEvent.click(option_1);
          });

          expect(api).toHaveBeenCalledTimes(1);
        });
      });
      describe('when some option has been selected and there is some search value', () => {
        it('requests data correctly', async () => {
          const onSearchMock = jest.fn();
          const api = jest.fn().mockResolvedValue({
            results: [
              { id: 1, name: 'Mock option 1' },
              { id: 2, name: 'Mock option 2' },
              { id: 3, name: 'Mock option 3' },
            ],
          });

          const renderer = render(
            <AsyncSelect
              preload={['onmount']}
              placeholder='Выбрать'
              api={api}
              showSearch
              onSearch={onSearchMock}
            />,
          );

          expect(api).toHaveBeenCalledTimes(1);

          await openSelect(renderer);

          await waitFor(() => {
            expect(renderer.queryByText(/Mock option 1/)).toBeInTheDocument();
            expect(renderer.queryByText(/Mock option 2/)).toBeInTheDocument();
            expect(renderer.queryByText(/Mock option 3/)).toBeInTheDocument();
          });

          const input = renderer.getByRole('combobox');

          await act(async () => {
            fireEvent.change(input, { target: { value: 'Search Value' } });
          });

          await waitFor(() => {
            expect(onSearchMock).toHaveBeenCalledWith('Search Value');
          });

          expect(api).toHaveBeenCalledTimes(2);

          const option = renderer.getByText(/Mock option 1/);

          await act(async () => {
            fireEvent.click(option);
          });

          expect(api).toHaveBeenCalledTimes(3);
        });
      });
      describe('when "preload" is "onopen" only', () => {
        it('requests data only on opening correctly', async () => {
          const api = jest.fn().mockResolvedValue({
            results: [
              { id: 1, name: 'Mock option 1' },
              { id: 2, name: 'Mock option 2' },
              { id: 3, name: 'Mock option 3' },
              { id: 4, name: 'Mock option 4' },
              { id: 5, name: 'Mock option 5' },
            ],
          });

          const renderer = render(<AsyncSelect placeholder='Выбрать' api={api} />);

          expect(api).not.toHaveBeenCalledTimes(1);

          await openSelect(renderer);

          expect(api).toHaveBeenCalledTimes(1);

          const option_1 = await renderer.findByText(/Mock option 1/);
          const option_2 = await renderer.findByText(/Mock option 2/);
          const option_3 = await renderer.findByText(/Mock option 3/);
          const option_4 = await renderer.findByText(/Mock option 4/);
          const option_5 = await renderer.findByText(/Mock option 5/);

          expect(option_1).toBeInTheDocument();
          expect(option_2).toBeInTheDocument();
          expect(option_3).toBeInTheDocument();
          expect(option_4).toBeInTheDocument();
          expect(option_5).toBeInTheDocument();
        });
      });
      describe('when "preload" is "onevereyopen" only', () => {
        it('requests data when "preload" is "oneveryopen" correctly', async () => {
          const api = jest.fn().mockResolvedValue({
            results: [
              { id: 1, name: 'Mock option 1' },
              { id: 2, name: 'Mock option 2' },
              { id: 3, name: 'Mock option 3' },
              { id: 4, name: 'Mock option 4' },
              { id: 5, name: 'Mock option 5' },
            ],
          });

          const onBlurMock = jest.fn();

          const renderer = render(
            <AsyncSelect
              placeholder='Выбрать'
              api={api}
              preload={['oneveryopen']}
              onBlur={onBlurMock}
            />,
          );

          expect(api).not.toHaveBeenCalled();

          const placeholder = await renderer.findByText(/Выбрать/);

          await act(async () => {
            fireEvent.mouseDown(placeholder);
          });

          expect(api).toHaveBeenCalledTimes(1);

          await act(async () => {
            fireEvent.mouseDown(placeholder);
          });

          await act(async () => {
            fireEvent.mouseDown(placeholder);
          });

          expect(api).toHaveBeenCalledTimes(2);
        });
      });
      describe('when "preload" is "onblur" only', () => {
        it('requests data only on blur correctly', async () => {
          const api = jest.fn().mockResolvedValue({
            results: [
              { id: 1, name: 'Mock option 1' },
              { id: 2, name: 'Mock option 2' },
              { id: 3, name: 'Mock option 3' },
              { id: 4, name: 'Mock option 4' },
              { id: 5, name: 'Mock option 5' },
            ],
          });

          const renderer = render(
            <AsyncSelect placeholder='Выбрать' api={api} preload={['onblur']} />,
          );

          expect(api).not.toHaveBeenCalledTimes(1);

          const placeholder = await renderer.findByText(/Выбрать/);

          await act(async () => {
            fireEvent.mouseDown(placeholder);
          });

          expect(api).not.toHaveBeenCalled();

          await act(async () => {
            fireEvent.blur(placeholder);
          });

          expect(api).toHaveBeenCalledTimes(1);

          const option_1 = await renderer.findByText(/Mock option 1/);
          const option_2 = await renderer.findByText(/Mock option 2/);
          const option_3 = await renderer.findByText(/Mock option 3/);
          const option_4 = await renderer.findByText(/Mock option 4/);
          const option_5 = await renderer.findByText(/Mock option 5/);

          expect(option_1).toBeInTheDocument();
          expect(option_2).toBeInTheDocument();
          expect(option_3).toBeInTheDocument();
          expect(option_4).toBeInTheDocument();
          expect(option_5).toBeInTheDocument();
        });
      });

      describe('when some value has been typed in order to search', () => {
        it('requests data correctly', async () => {
          const api = jest.fn().mockResolvedValue({
            results: [
              { id: 1, name: 'Mock option 1' },
              { id: 2, name: 'Mock option 2' },
              { id: 3, name: 'Mock option 3' },
              { id: 4, name: 'Mock option 4' },
              { id: 5, name: 'Mock option 5' },
            ],
          });

          const renderer = render(
            <AsyncSelect preload={['onmount']} placeholder='Выбрать' api={api} />,
          );

          expect(api).toHaveBeenCalledTimes(1);

          const input = renderer.getByRole('combobox');

          await act(async () => {
            fireEvent.change(input, { target: { value: 'Mock option 1' } });
          });

          await waitFor(() =>
            expect(api).toHaveBeenCalledWith({ params: { search: 'Mock option 1' } }),
          );
        });
      });

      describe('when "query" property has been changed', () => {
        describe('and "preload" is "onmount"', () => {
          it('request data correctly', async () => {
            const api = jest.fn().mockResolvedValue({
              results: [
                { id: 1, name: 'Mock option 1' },
                { id: 2, name: 'Mock option 2' },
                { id: 3, name: 'Mock option 3' },
                { id: 4, name: 'Mock option 4' },
                { id: 5, name: 'Mock option 5' },
              ],
            });

            const renderer = render(
              <AsyncSelect
                preload={['onmount']}
                placeholder='Выбрать'
                api={{ fn: api }}
              />,
            );

            expect(api).toHaveBeenCalledTimes(1);

            renderer.rerender(
              <AsyncSelect
                preload={['onmount']}
                placeholder='Выбрать'
                api={{ query: { contractor: 1 }, fn: api }}
              />,
            );

            await waitFor(() =>
              expect(api).toHaveBeenCalledWith({ params: { contractor: 1 } }),
            );
          });
        });
        describe('and preload is "onopen"', () => {
          it('calls "api" callback on "query" changing when "preload" is "onopen" correctly', async () => {
            const api = jest.fn().mockResolvedValue({
              results: [
                { id: 1, name: 'Mock option 1' },
                { id: 2, name: 'Mock option 2' },
                { id: 3, name: 'Mock option 3' },
                { id: 4, name: 'Mock option 4' },
                { id: 5, name: 'Mock option 5' },
              ],
            });

            const renderer = render(
              <AsyncSelect placeholder='Выбрать' api={{ fn: api }} />,
            );

            expect(api).toHaveBeenCalledTimes(0);

            // Открываем Select
            await act(async () => {
              fireEvent.mouseDown(await renderer.findByText(/Выбрать/));
            });

            await waitFor(() => {
              expect(api).toHaveBeenCalledTimes(1);
            });

            // Закрываем Select
            await act(async () => {
              fireEvent.mouseDown(await renderer.findByText(/Выбрать/));
            });

            renderer.rerender(
              <AsyncSelect
                placeholder='Выбрать'
                api={{ query: { contractor: 1 }, fn: api }}
              />,
            );

            await act(async () => {
              fireEvent.mouseDown(await renderer.findByText(/Выбрать/));
            });

            await waitFor(() =>
              expect(api).toHaveBeenCalledWith({ params: { contractor: 1 } }),
            );
          });
        });
      });
    });
  });

  describe('given "mode" is "multiple"', () => {
    beforeEach(() => {
      jest.clearAllTimers();
      jest.clearAllMocks();
      nock.cleanAll();
    });
    describe('given "api" property is plain url string', () => {
      beforeEach(() => {
        jest.clearAllTimers();
        jest.clearAllMocks();
        nock.cleanAll();
      });
      it('requests data correctly', async () => {
        const scope = nock('http://localhost')
          .get('/api/animals/')
          .reply(200, {
            results: [
              { id: 1, name: 'Mock option 1' },
              { id: 2, name: 'Mock option 2' },
              { id: 3, name: 'Mock option 3' },
              { id: 4, name: 'Mock option 4' },
              { id: 5, name: 'Mock option 5' },
            ],
          });

        const renderer = render(
          <AsyncSelect
            mode='multiple'
            preload={['onmount']}
            placeholder='Выбрать'
            api='http://localhost/api/animals/'
          />,
        );

        const placeholder = await renderer.findByText(/Выбрать/);

        await act(async () => {
          fireEvent.mouseDown(placeholder);
        });

        await findMockOptions(renderer);

        const option_1 = renderer.getByText(/Mock option 1/);
        const option_2 = renderer.getByText(/Mock option 2/);
        const option_3 = renderer.getByText(/Mock option 3/);
        const option_4 = renderer.getByText(/Mock option 4/);
        const option_5 = renderer.getByText(/Mock option 5/);

        expect(option_1).toBeInTheDocument();
        expect(option_2).toBeInTheDocument();
        expect(option_3).toBeInTheDocument();
        expect(option_4).toBeInTheDocument();
        expect(option_5).toBeInTheDocument();

        scope.done();
      });
      describe('when data is loaded', () => {
        it('calls "onLoad" correctly', async () => {
          const onLoadMock = jest.fn();
          const scope = nock('http://localhost')
            .get('/api/animals/')
            .reply(200, {
              results: [
                { id: 1, name: 'Mock option 1' },
                { id: 2, name: 'Mock option 2' },
                { id: 3, name: 'Mock option 3' },
                { id: 4, name: 'Mock option 4' },
                { id: 5, name: 'Mock option 5' },
              ],
            });

          const renderer = render(
            <AsyncSelect
              mode='multiple'
              preload={['onmount']}
              placeholder='Выбрать'
              api='http://localhost/api/animals/'
              onLoad={onLoadMock}
            />,
          );

          const placeholder = await renderer.findByText(/Выбрать/);

          await act(async () => {
            fireEvent.mouseDown(placeholder);
          });

          await findMockOptions(renderer);

          expect(onLoadMock).toHaveBeenCalledWith([
            { id: 1, name: 'Mock option 1' },
            { id: 2, name: 'Mock option 2' },
            { id: 3, name: 'Mock option 3' },
            { id: 4, name: 'Mock option 4' },
            { id: 5, name: 'Mock option 5' },
          ]);

          scope.done();
        });
      });
      describe('and some option has been selected', () => {
        it('does not request data correctly', async () => {
          let calls = 0;

          const _scope = nock('http://localhost')
            .get('/api/animals/')
            .reply(200, () => {
              calls = calls + 1;

              return {
                results: [
                  { id: 1, name: 'Mock option 1' },
                  { id: 2, name: 'Mock option 2' },
                  { id: 3, name: 'Mock option 3' },
                ],
              };
            })
            .get('/api/animals/')
            .reply(200, () => {
              calls = calls + 1;

              return {
                results: [
                  { id: 1, name: 'Mock option 1' },
                  { id: 2, name: 'Mock option 2' },
                  { id: 3, name: 'Mock option 3' },
                ],
              };
            });

          const renderer = render(
            <AsyncSelect
              mode='multiple'
              preload={['onmount']}
              placeholder='Выбрать'
              api='http://localhost/api/animals/'
            />,
          );

          const placeholder = await renderer.findByText(/Выбрать/);

          await act(async () => {
            fireEvent.mouseDown(placeholder);
          });

          await findMockOptions(renderer, 3);

          const option_1 = await renderer.findByText(/Mock option 1/);

          expect(option_1).toBeInTheDocument();

          await act(async () => {
            fireEvent.click(option_1);
          });

          expect(calls).toBe(1);
        });
      });
      describe('and "preload" is "onopen" only', () => {
        it('requests data  correctly', async () => {
          let calls = 0;

          const scope = nock('http://localhost')
            .get('/api/animals/')
            .reply(200, () => {
              calls = calls + 1;

              return {
                results: [
                  { id: 1, name: 'Mock option 1' },
                  { id: 2, name: 'Mock option 2' },
                  { id: 3, name: 'Mock option 3' },
                ],
              };
            });

          const renderer = render(
            <AsyncSelect
              mode='multiple'
              placeholder='Выбрать'
              api='http://localhost/api/animals/'
            />,
          );

          // Making sure the request is not beeing send right after component mounting
          expect(calls).toBe(0);

          const placeholder = await renderer.findByText(/Выбрать/);

          await act(async () => {
            fireEvent.mouseDown(placeholder);
          });

          await findMockOptions(renderer, 3);

          const option_1 = await renderer.findByText(/Mock option 1/);
          const option_2 = await renderer.findByText(/Mock option 2/);
          const option_3 = await renderer.findByText(/Mock option 3/);

          expect(option_1).toBeInTheDocument();
          expect(option_2).toBeInTheDocument();
          expect(option_3).toBeInTheDocument();

          expect(calls).toBe(1);

          scope.done();
        });
      });
      describe('and "preload" is "onblur" only', () => {
        it('requests data when "preload" is "onblur" correctly', async () => {
          const api = jest.fn().mockResolvedValue({
            results: [
              { id: 1, name: 'Mock option 1' },
              { id: 2, name: 'Mock option 2' },
              { id: 3, name: 'Mock option 3' },
            ],
          });

          const renderer = render(
            <AsyncSelect
              mode='multiple'
              placeholder='Выбрать'
              api={api}
              preload={['onblur']}
            />,
          );

          // Making sure the request is not beeing send right after component mounting
          expect(api).not.toHaveBeenCalled();

          const placeholder = await renderer.findByText(/Выбрать/);

          // Открываем селект
          await act(async () => {
            fireEvent.mouseDown(placeholder);
          });

          expect(api).not.toHaveBeenCalled();

          // Закрываем селект через блюр
          await act(async () => {
            fireEvent.blur(placeholder);
          });

          const option_1 = await renderer.findByText(/Mock option 1/);
          const option_2 = await renderer.findByText(/Mock option 2/);
          const option_3 = await renderer.findByText(/Mock option 3/);

          expect(option_1).toBeInTheDocument();
          expect(option_2).toBeInTheDocument();
          expect(option_3).toBeInTheDocument();
        });
      });
      describe('when some value has been typed in order to search', () => {
        it('requests data with "search" parameter correctly', async () => {
          const scope = nock('http://localhost')
            .get('/api/animals/')
            .reply(200, {
              results: [
                { id: 1, name: 'Mock option 1' },
                { id: 2, name: 'Mock option 2' },
                { id: 3, name: 'Mock option 3' },
              ],
            })
            .get('/api/animals/?search=Mock option 1')
            .reply(200, {
              results: [{ id: 1, name: 'Mock option 1' }],
            });

          const renderer = render(
            <AsyncSelect
              mode='multiple'
              showSearch
              preload={['onmount']}
              placeholder='Выбрать'
              api='http://localhost/api/animals/'
            />,
          );

          const placeholder = await renderer.findByText(/Выбрать/);

          await act(async () => {
            fireEvent.mouseDown(placeholder);
          });

          await findMockOptions(renderer, 3);

          expect(renderer.getByText(/Mock option 1/)).toBeInTheDocument();
          expect(renderer.getByText(/Mock option 2/)).toBeInTheDocument();
          expect(renderer.getByText(/Mock option 3/)).toBeInTheDocument();

          const input = renderer.getByRole('combobox');

          await act(async () => {
            fireEvent.change(input, { target: { value: 'Mock option 1' } });
          });

          // Wait for debounce delay
          await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 350));
          });

          // Waiting for other options to dissappear
          await waitFor(() => {
            expect(renderer.queryByText(/Mock option 2/)).not.toBeInTheDocument();
            expect(renderer.queryByText(/Mock option 3/)).not.toBeInTheDocument();
          });

          scope.done();
        });
      });
    });
    describe('given "api" as a function', () => {
      beforeEach(() => {
        jest.clearAllTimers();
        jest.clearAllMocks();
        nock.cleanAll();
      });
      it('requests data correctly', async () => {
        const api = jest.fn().mockResolvedValue({
          results: [
            { id: 1, name: 'Mock option 1' },
            { id: 2, name: 'Mock option 2' },
            { id: 3, name: 'Mock option 3' },
            { id: 4, name: 'Mock option 4' },
            { id: 5, name: 'Mock option 5' },
          ],
        });

        const renderer = render(
          <AsyncSelect
            mode='multiple'
            preload={['onmount']}
            placeholder='Выбрать'
            api={api}
          />,
        );

        expect(api).toHaveBeenCalledTimes(1);

        const placeholder = await renderer.findByText(/Выбрать/);

        await act(async () => {
          fireEvent.mouseDown(placeholder);
        });

        const option_1 = await renderer.findByText(/Mock option 1/);
        const option_2 = await renderer.findByText(/Mock option 2/);
        const option_3 = await renderer.findByText(/Mock option 3/);
        const option_4 = await renderer.findByText(/Mock option 4/);
        const option_5 = await renderer.findByText(/Mock option 5/);

        expect(option_1).toBeInTheDocument();
        expect(option_2).toBeInTheDocument();
        expect(option_3).toBeInTheDocument();
        expect(option_4).toBeInTheDocument();
        expect(option_5).toBeInTheDocument();
      });
      describe('when data is loaded', () => {
        it('executes "onLoad" callback with data correctly', async () => {
          const api = jest.fn().mockResolvedValue({
            results: [
              { id: 1, name: 'Mock option 1' },
              { id: 2, name: 'Mock option 2' },
              { id: 3, name: 'Mock option 3' },
              { id: 4, name: 'Mock option 4' },
              { id: 5, name: 'Mock option 5' },
            ],
          });

          const onLoadMock = jest.fn();

          render(
            <AsyncSelect
              mode='multiple'
              preload={['onmount']}
              placeholder='Выбрать'
              api={api}
              onLoad={onLoadMock}
            />,
          );

          await waitFor(() => {
            expect(onLoadMock).toHaveBeenCalledWith([
              { id: 1, name: 'Mock option 1' },
              { id: 2, name: 'Mock option 2' },
              { id: 3, name: 'Mock option 3' },
              { id: 4, name: 'Mock option 4' },
              { id: 5, name: 'Mock option 5' },
            ]);
          });
        });
      });
      describe('when some option has been selected', () => {
        it('does not request data correctly', async () => {
          const api = jest.fn().mockResolvedValue({
            results: [
              { id: 1, name: 'Mock option 1' },
              { id: 2, name: 'Mock option 2' },
              { id: 3, name: 'Mock option 3' },
              { id: 4, name: 'Mock option 4' },
              { id: 5, name: 'Mock option 5' },
            ],
          });

          const renderer = render(
            <AsyncSelect
              mode='multiple'
              preload={['onmount']}
              placeholder='Выбрать'
              api={api}
            />,
          );

          expect(api).toHaveBeenCalledTimes(1);

          const placeholder = await renderer.findByText(/Выбрать/);

          await act(async () => {
            fireEvent.mouseDown(placeholder);
          });

          const option_1 = await renderer.findByText(/Mock option 1/);

          await act(async () => {
            fireEvent.click(option_1);
          });

          expect(api).toHaveBeenCalledTimes(1);
        });
        describe('and there is some search value typed in', () => {
          it('does not request data correctly', async () => {
            const onSearchMock = jest.fn();
            const api = jest.fn().mockResolvedValue({
              results: [
                { id: 1, name: 'Mock option 1' },
                { id: 2, name: 'Mock option 2' },
                { id: 3, name: 'Mock option 3' },
              ],
            });

            const renderer = render(
              <AsyncSelect
                mode='multiple'
                preload={['onmount']}
                placeholder='Выбрать'
                api={api}
                showSearch
                onSearch={onSearchMock}
              />,
            );

            expect(api).toHaveBeenCalledTimes(1);

            const placeholder = await renderer.findByText(/Выбрать/);

            await act(async () => {
              fireEvent.mouseDown(placeholder);
            });

            await waitFor(() => {
              expect(renderer.queryByText(/Mock option 1/)).toBeInTheDocument();
              expect(renderer.queryByText(/Mock option 2/)).toBeInTheDocument();
              expect(renderer.queryByText(/Mock option 3/)).toBeInTheDocument();
            });

            const input = renderer.getByRole('combobox');

            await act(async () => {
              fireEvent.change(input, { target: { value: 'Search Value' } });
            });

            await waitFor(() => {
              expect(onSearchMock).toHaveBeenCalledWith('Search Value');
            });

            expect(api).toHaveBeenCalledTimes(2);

            const option = renderer.getByText(/Mock option 1/);

            await act(async () => {
              fireEvent.click(option);
            });

            expect(api).not.toHaveBeenCalledTimes(3);
          });
          describe('and click outside occurred (blur event)', () => {
            it('requests data correctly', async () => {
              const onSelectMock = jest.fn();
              const onSearchMock = jest.fn();
              const api = jest.fn().mockResolvedValue({
                results: [
                  { id: 1, name: 'Mock option 1' },
                  { id: 2, name: 'Mock option 2' },
                  { id: 3, name: 'Mock option 3' },
                  { id: 4, name: 'Mock option 4' },
                  { id: 5, name: 'Mock option 5' },
                ],
              });

              const renderer = render(
                <AsyncSelect
                  showSearch
                  mode='multiple'
                  preload={['onmount']}
                  placeholder='Выбрать'
                  api={api}
                  onSelect={onSelectMock}
                  onSearch={onSearchMock}
                />,
              );

              expect(api).toHaveBeenCalledTimes(1);

              const placeholder = await renderer.findByText(/Выбрать/);

              await act(async () => {
                fireEvent.mouseDown(placeholder);
              });

              const input = renderer.getByRole('combobox');

              await act(async () => {
                fireEvent.change(input, { target: { value: 'Search Value' } });
              });

              await waitFor(() => {
                expect(onSearchMock).toHaveBeenCalledWith('Search Value');
              });

              expect(api).toHaveBeenCalledTimes(2);

              await act(async () => {
                fireEvent.click(await renderer.findByText(/Mock option 1/));
              });

              expect(onSelectMock).toHaveBeenCalledWith(1, {
                id: 1,
                label: 'Mock option 1',
                name: 'Mock option 1',
                value: 1,
              });

              await act(async () => {
                fireEvent.click(await renderer.findByText(/Mock option 2/));
              });

              // Закрываем селект через blur фактического combobox.
              await act(async () => {
                fireEvent.blur(input);
              });

              await waitFor(() => {
                expect(api).toHaveBeenCalledTimes(3);
              });
            });
          });
        });
      });
      describe('when "preload" is "onopen" only', () => {
        it('requests data only on opening correctly', async () => {
          const api = jest.fn().mockResolvedValue({
            results: [
              { id: 1, name: 'Mock option 1' },
              { id: 2, name: 'Mock option 2' },
              { id: 3, name: 'Mock option 3' },
              { id: 4, name: 'Mock option 4' },
              { id: 5, name: 'Mock option 5' },
            ],
          });

          const renderer = render(
            <AsyncSelect mode='multiple' placeholder='Выбрать' api={api} />,
          );

          expect(api).not.toHaveBeenCalledTimes(1);

          const placeholder = await renderer.findByText(/Выбрать/);

          await act(async () => {
            fireEvent.mouseDown(placeholder);
          });

          expect(api).toHaveBeenCalledTimes(1);

          const option_1 = await renderer.findByText(/Mock option 1/);
          const option_2 = await renderer.findByText(/Mock option 2/);
          const option_3 = await renderer.findByText(/Mock option 3/);
          const option_4 = await renderer.findByText(/Mock option 4/);
          const option_5 = await renderer.findByText(/Mock option 5/);

          expect(option_1).toBeInTheDocument();
          expect(option_2).toBeInTheDocument();
          expect(option_3).toBeInTheDocument();
          expect(option_4).toBeInTheDocument();
          expect(option_5).toBeInTheDocument();
        });
      });
      describe('when "preload" is "onevereyopen" only', () => {
        it('requests data when "preload" is "oneveryopen" correctly', async () => {
          const api = jest.fn().mockResolvedValue({
            results: [
              { id: 1, name: 'Mock option 1' },
              { id: 2, name: 'Mock option 2' },
              { id: 3, name: 'Mock option 3' },
              { id: 4, name: 'Mock option 4' },
              { id: 5, name: 'Mock option 5' },
            ],
          });

          const onBlurMock = jest.fn();

          const renderer = render(
            <AsyncSelect
              mode='multiple'
              placeholder='Выбрать'
              api={api}
              preload={['oneveryopen']}
              onBlur={onBlurMock}
            />,
          );

          expect(api).not.toHaveBeenCalled();

          const placeholder = await renderer.findByText(/Выбрать/);

          await act(async () => {
            fireEvent.mouseDown(placeholder);
          });

          expect(api).toHaveBeenCalledTimes(1);

          await act(async () => {
            fireEvent.mouseDown(placeholder);
          });

          await act(async () => {
            fireEvent.mouseDown(placeholder);
          });

          expect(api).toHaveBeenCalledTimes(2);
        });
      });
      describe('when "preload" is "onblur" only', () => {
        it('requests data only on blur correctly', async () => {
          const api = jest.fn().mockResolvedValue({
            results: [
              { id: 1, name: 'Mock option 1' },
              { id: 2, name: 'Mock option 2' },
              { id: 3, name: 'Mock option 3' },
              { id: 4, name: 'Mock option 4' },
              { id: 5, name: 'Mock option 5' },
            ],
          });

          const renderer = render(
            <AsyncSelect
              mode='multiple'
              placeholder='Выбрать'
              api={api}
              preload={['onblur']}
            />,
          );

          expect(api).not.toHaveBeenCalledTimes(1);

          const placeholder = await renderer.findByText(/Выбрать/);

          await act(async () => {
            fireEvent.mouseDown(placeholder);
          });

          expect(api).not.toHaveBeenCalled();

          await act(async () => {
            fireEvent.blur(placeholder);
          });

          expect(api).toHaveBeenCalledTimes(1);

          const option_1 = await renderer.findByText(/Mock option 1/);
          const option_2 = await renderer.findByText(/Mock option 2/);
          const option_3 = await renderer.findByText(/Mock option 3/);
          const option_4 = await renderer.findByText(/Mock option 4/);
          const option_5 = await renderer.findByText(/Mock option 5/);

          expect(option_1).toBeInTheDocument();
          expect(option_2).toBeInTheDocument();
          expect(option_3).toBeInTheDocument();
          expect(option_4).toBeInTheDocument();
          expect(option_5).toBeInTheDocument();
        });
      });
      describe('when some value has been typed in order to search', () => {
        it('requests data correctly', async () => {
          const api = jest.fn().mockResolvedValue({
            results: [
              { id: 1, name: 'Mock option 1' },
              { id: 2, name: 'Mock option 2' },
              { id: 3, name: 'Mock option 3' },
              { id: 4, name: 'Mock option 4' },
              { id: 5, name: 'Mock option 5' },
            ],
          });

          const renderer = render(
            <AsyncSelect
              mode='multiple'
              preload={['onmount']}
              placeholder='Выбрать'
              api={api}
            />,
          );

          expect(api).toHaveBeenCalledTimes(1);

          const input = renderer.getByRole('combobox');

          await act(async () => {
            fireEvent.change(input, { target: { value: 'Mock option 1' } });
          });

          await waitFor(() =>
            expect(api).toHaveBeenCalledWith({ params: { search: 'Mock option 1' } }),
          );
        });
      });
      describe('when "query" property has been changed', () => {
        describe('and "preload" is "onmount"', () => {
          it('request data correctly', async () => {
            const api = jest.fn().mockResolvedValue({
              results: [
                { id: 1, name: 'Mock option 1' },
                { id: 2, name: 'Mock option 2' },
                { id: 3, name: 'Mock option 3' },
                { id: 4, name: 'Mock option 4' },
                { id: 5, name: 'Mock option 5' },
              ],
            });

            const renderer = render(
              <AsyncSelect
                mode='multiple'
                preload={['onmount']}
                placeholder='Выбрать'
                api={{ fn: api }}
              />,
            );

            expect(api).toHaveBeenCalledTimes(1);

            renderer.rerender(
              <AsyncSelect
                mode='multiple'
                preload={['onmount']}
                placeholder='Выбрать'
                api={{ query: { contractor: 1 }, fn: api }}
              />,
            );

            await waitFor(() =>
              expect(api).toHaveBeenCalledWith({ params: { contractor: 1 } }),
            );
          });
        });
        describe('and preload is "onopen"', () => {
          it('calls "api" callback on "query" changing when "preload" is "onopen" correctly', async () => {
            const api = jest.fn().mockResolvedValue({
              results: [
                { id: 1, name: 'Mock option 1' },
                { id: 2, name: 'Mock option 2' },
                { id: 3, name: 'Mock option 3' },
                { id: 4, name: 'Mock option 4' },
                { id: 5, name: 'Mock option 5' },
              ],
            });

            const renderer = render(
              <AsyncSelect mode='multiple' placeholder='Выбрать' api={{ fn: api }} />,
            );

            expect(api).toHaveBeenCalledTimes(0);

            // Открываем Select
            await act(async () => {
              fireEvent.mouseDown(await renderer.findByText(/Выбрать/));
            });

            await waitFor(() => {
              expect(api).toHaveBeenCalledTimes(1);
            });

            // Закрываем Select
            await act(async () => {
              fireEvent.mouseDown(await renderer.findByText(/Выбрать/));
            });

            renderer.rerender(
              <AsyncSelect
                mode='multiple'
                placeholder='Выбрать'
                api={{ query: { contractor: 1 }, fn: api }}
              />,
            );

            await act(async () => {
              fireEvent.mouseDown(await renderer.findByText(/Выбрать/));
            });

            await waitFor(() =>
              expect(api).toHaveBeenCalledWith({ params: { contractor: 1 } }),
            );
          });
        });
      });
    });
  });
});

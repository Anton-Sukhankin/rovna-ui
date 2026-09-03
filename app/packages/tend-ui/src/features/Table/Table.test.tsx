import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import * as Table from '.';

type ComponentProps = Table.RootProps;

const Component = (props: ComponentProps) => {
  return (
    <Table.Root
      value={props.value}
      filters={props.filters}
      columns={props.columns}
      sorters={props.sorters}
      onFilterValuesChange={props.onFilterValuesChange}
      onSorterValuesChange={props.onSorterValuesChange}
      onSearchValueChange={props.onSearchValueChange}
    >
      <Table.Header.Layout>
        <Table.Search />
        <Table.Toolbar.Layout>
          <Table.Toolbar.Sorters />
          <Table.Toolbar.FiltersButton />
          <Table.Toolbar.SettingsButton />
        </Table.Toolbar.Layout>
      </Table.Header.Layout>
      <Table.Filters open />
    </Table.Root>
  );
};

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe('Table', () => {
  describe('Filters', () => {
    describe('when changing some filters', () => {
      it('calls "onFilterValuesChange" callback correctly', async () => {
        const onFilterValuesChangeMock = jest.fn();
        const renderer = render(
          <Component
            onFilterValuesChange={onFilterValuesChangeMock}
            filters={[
              {
                key: 'filter-one',
                id: 'filter-one',
                name: 'filter-one',
                label: 'Filter 1',
                component: { component: 'input', ['data-testid']: 'filter-one' },
              },
              {
                key: 'filter-two',
                id: 'filter-two',
                name: 'filter-two',
                label: 'Filter 2',
                component: { component: 'input', ['data-testid']: 'filter-two' },
              },
            ]}
          />,
        );

        expect(renderer.getByTestId('filter-one')).toBeInTheDocument();
        expect(renderer.getByTestId('filter-two')).toBeInTheDocument();

        act(() => {
          fireEvent.change(renderer.getByTestId('filter-one'), {
            target: { value: 'Hello World' },
          });
        });

        await waitFor(() => {
          expect(onFilterValuesChangeMock).toHaveBeenCalledWith(
            { ['filter-one']: 'Hello World' },
            { ['filter-one']: 'Hello World' },
          );
        });

        act(() => {
          fireEvent.change(renderer.getByTestId('filter-two'), {
            target: { value: 'Hello Galaxy' },
          });
        });

        await waitFor(() => {
          expect(onFilterValuesChangeMock).toHaveBeenCalledWith(
            { ['filter-two']: 'Hello Galaxy' },
            { ['filter-one']: 'Hello World', ['filter-two']: 'Hello Galaxy' },
          );
        });
      });
    });

    describe('when filter has not any typed values', () => {
      it('"Reset filter" button is not visible', async () => {
        const onFilterValuesChangeMock = jest.fn();

        const renderer = render(
          <Component
            onFilterValuesChange={onFilterValuesChangeMock}
            filters={[
              {
                key: 'filter-one',
                id: 'filter-one',
                name: 'filter-one',
                label: 'Filter 1',
                component: { component: 'input', ['data-testid']: 'filter-one' },
              },
              {
                key: 'filter-two',
                id: 'filter-two',
                name: 'filter-two',
                label: 'Filter 2',
                component: { component: 'input', ['data-testid']: 'filter-two' },
              },
            ]}
          />,
        );

        await waitFor(() => {
          expect(renderer.getByTestId('filter-one')).toBeInTheDocument();
          expect(renderer.getByTestId('filter-two')).toBeInTheDocument();
          expect(renderer.queryAllByText(/^Сбросить$/)).toEqual([]);
        });

        // Вводим значение
        act(() => {
          fireEvent.change(renderer.getByTestId('filter-one'), {
            target: { value: 'Hello World' },
          });
        });

        await waitFor(() => {
          expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
            { ['filter-one']: 'Hello World' },
            { ['filter-one']: 'Hello World' },
          );
        });

        expect(renderer.queryAllByText(/^Сбросить$/).length).toBe(1);

        act(() => {
          fireEvent.change(renderer.getByTestId('filter-two'), {
            target: { value: 'Hello Galaxy' },
          });
        });

        await waitFor(() => {
          expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
            { ['filter-two']: 'Hello Galaxy' },
            { ['filter-one']: 'Hello World', ['filter-two']: 'Hello Galaxy' },
          );
          expect(renderer.queryAllByText(/^Сбросить$/).length).toBe(2);
        });

        act(() => {
          fireEvent.click(renderer.getAllByText(/^Сбросить$/)[1]);
        });

        await waitFor(() => {
          expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
            { ['filter-one']: undefined },
            { ['filter-one']: 'Hello World', ['filter-two']: undefined },
          );
          expect(renderer.queryAllByText(/^Сбросить$/).length).toBe(1);
        });
      });
    });

    describe('when "Reset filter" button has been clicked', () => {
      it('resets specific clicked filter correctly', async () => {
        const onFilterValuesChangeMock = jest.fn();
        const renderer = render(
          <Component
            onFilterValuesChange={onFilterValuesChangeMock}
            filters={[
              {
                key: 'filter-one',
                id: 'filter-one',
                name: 'filter-one',
                label: 'Filter 1',
                component: { component: 'input', ['data-testid']: 'filter-one' },
              },
              {
                key: 'filter-two',
                id: 'filter-two',
                name: 'filter-two',
                label: 'Filter 2',
                component: { component: 'input', ['data-testid']: 'filter-two' },
              },
            ]}
          />,
        );

        await waitFor(() => {
          expect(renderer.getByTestId('filter-one')).toBeInTheDocument();
          expect(renderer.getByTestId('filter-two')).toBeInTheDocument();
        });

        // Вводим значение
        act(() => {
          fireEvent.change(renderer.getByTestId('filter-one'), {
            target: { value: 'Hello World' },
          });
        });

        await waitFor(() => {
          expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
            { ['filter-one']: 'Hello World' },
            { ['filter-one']: 'Hello World' },
          );
        });

        act(() => {
          fireEvent.change(renderer.getByTestId('filter-two'), {
            target: { value: 'Hello Galaxy' },
          });
        });

        await waitFor(() => {
          expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
            { ['filter-two']: 'Hello Galaxy' },
            { ['filter-one']: 'Hello World', ['filter-two']: 'Hello Galaxy' },
          );
        });

        act(() => {
          fireEvent.click(renderer.getAllByText(/^Сбросить$/)[0]);
        });

        await waitFor(() => {
          expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
            { ['filter-one']: undefined },
            { ['filter-one']: undefined, ['filter-two']: 'Hello Galaxy' },
          );
        });
      });
    });

    describe('when "requires" property is not empty', () => {
      it('then the depending filter "disabled" property is "true"', async () => {
        const renderer = render(
          <Component
            filters={[
              {
                key: 'filter-one',
                id: 'filter-one',
                name: 'filter-one',
                label: 'Filter 1',
                component: { component: 'input', ['data-testid']: 'filter-one' },
              },
              {
                key: 'filter-two',
                id: 'filter-two',
                name: 'filter-two',
                label: 'Filter 2',
                requires: ['filter-one'],
                component: { component: 'input', ['data-testid']: 'filter-two' },
              },
            ]}
          />,
        );

        expect(renderer.getByTestId('filter-one')).toBeInTheDocument();
        expect(renderer.getByTestId('filter-two')).toBeInTheDocument();
        expect(renderer.getByTestId('filter-two')).toBeDisabled();

        // Вводим значение
        act(() => {
          fireEvent.change(renderer.getByTestId('filter-one'), {
            target: { value: 'Hello World' },
          });
        });

        // Фильтр должен быть разблокирован
        expect(renderer.getByTestId('filter-two')).not.toBeDisabled();

        // Стираем значение
        act(() => {
          fireEvent.change(renderer.getByTestId('filter-one'), {
            target: { value: '' },
          });
        });

        // Фильтра должен быть снова заблокирован
        expect(renderer.getByTestId('filter-two')).toBeDisabled();
      });
      it('then the depending filters "Reset" button "disabled" property is "true"', async () => {
        const renderer = render(
          <Component
            filters={[
              {
                key: 'filter-one',
                id: 'filter-one',
                name: 'filter-one',
                label: 'Filter 1',
                component: { component: 'input', ['data-testid']: 'filter-one' },
              },
              {
                key: 'filter-two',
                id: 'filter-two',
                name: 'filter-two',
                label: 'Filter 2',
                requires: ['filter-one'],
                component: { component: 'input', ['data-testid']: 'filter-two' },
              },
            ]}
          />,
        );

        expect(renderer.getByTestId('filter-one')).toBeInTheDocument();
        expect(renderer.getByTestId('filter-two')).toBeInTheDocument();

        // Вводим значение
        act(() => {
          fireEvent.change(renderer.getByTestId('filter-one'), {
            target: { value: 'Hello World' },
          });
        });

        // Фильтр должен быть разблокирован
        expect(renderer.getByTestId('filter-two')).not.toBeDisabled();

        // Вводим значение во второй фильтр
        act(() => {
          fireEvent.change(renderer.getByTestId('filter-two'), {
            target: { value: 'Hello Galaxy' },
          });
        });

        // Стираем значение из первого
        act(() => {
          fireEvent.change(renderer.getByTestId('filter-one'), {
            target: { value: '' },
          });
        });

        // Кнопка сброса зависимого фильтра должна быть заблокирована
        expect(renderer.getAllByTestId('rovna-ui-filters-reset-button')[0]).toBeDisabled();
      });
    });

    describe('when slave filter has "depends" property', () => {
      describe('and master filter has been touched', () => {
        it('then calls "onFilterValuesChange" with empty slave filter correctly', async () => {
          const onFilterValuesChangeMock = jest.fn();

          const renderer = render(
            <Component
              onFilterValuesChange={onFilterValuesChangeMock}
              filters={[
                {
                  key: 'filter-one',
                  id: 'filter-one',
                  name: 'filter-one',
                  label: 'Filter 1',
                  component: { component: 'input', ['data-testid']: 'filter-one' },
                },
                {
                  key: 'filter-two',
                  id: 'filter-two',
                  name: 'filter-two',
                  label: 'Filter 2',
                  depends: ['filter-one'],
                  component: { component: 'input', ['data-testid']: 'filter-two' },
                },
              ]}
            />,
          );

          await waitFor(() => {
            expect(renderer.getByTestId('filter-one')).toBeInTheDocument();
            expect(renderer.getByTestId('filter-two')).toBeInTheDocument();
          });

          // Вводим значение в первый фильтр
          act(() => {
            fireEvent.change(renderer.getByTestId('filter-one'), {
              target: { value: 'Hello World' },
            });
          });

          await waitFor(() => {
            expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
              { ['filter-one']: 'Hello World' },
              { ['filter-one']: 'Hello World' },
            );
          });

          // Вводим значение во второй фильтр
          act(() => {
            fireEvent.change(renderer.getByTestId('filter-two'), {
              target: { value: 'Hello Space' },
            });
          });

          await waitFor(() => {
            expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
              { ['filter-two']: 'Hello Space' },
              { ['filter-one']: 'Hello World', ['filter-two']: 'Hello Space' },
            );
          });

          // Вводим значение в первый фильтр снова
          act(() => {
            fireEvent.change(renderer.getByTestId('filter-one'), {
              target: { value: 'Hello World 2' },
            });
          });

          // Ожидаем, что второй фильтр должен быть сброшен
          waitFor(() => {
            expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
              { ['filter-one']: 'Hello World 2' },
              { ['filter-one']: 'Hello World 2', ['filter-two']: undefined },
            );
          });
        });
      });
      describe('and "query" property has changed', () => {
        it('then depending filter "api" has to be called', async () => {
          const mockApi = jest.fn().mockResolvedValue({
            results: [
              { id: 1, name: 'Mock option 1' },
              { id: 2, name: 'Mock option 2' },
              { id: 3, name: 'Mock option 3' },
            ],
          });
          const renderer = render(
            <Component
              filters={[
                {
                  key: 'filter-one',
                  id: 'filter-one',
                  name: 'filter-one',
                  label: 'Filter 1',
                  component: { component: 'input', ['data-testid']: 'filter-one' },
                },
                {
                  key: 'filter-two',
                  id: 'filter-two',
                  name: 'filter-two',
                  label: 'Filter 2',
                  depends: ['filter-one'],
                  component: {
                    component: 'async-select',
                    // FIXME: Fix data-testid types
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    ['data-testid']: 'filter-two',
                    placeholder: 'Выбрать',
                    api: mockApi,
                  },
                },
              ]}
            />,
          );

          await waitFor(() => {
            expect(renderer.getByTestId('filter-one')).toBeInTheDocument();
            expect(renderer.getByTestId('filter-two')).toBeInTheDocument();
          });

          // Открываем AsyncSelect
          await act(async () => {
            fireEvent.mouseDown(await renderer.findByText(/Выбрать/));
          });

          waitFor(() => {
            expect(mockApi).toHaveBeenCalled();
          });

          // Закрываем AsyncSelect
          await act(async () => {
            fireEvent.mouseDown(await renderer.findByText(/Выбрать/));
          });

          // // Вводим значение
          act(() => {
            fireEvent.change(renderer.getByTestId('filter-one'), {
              target: { value: 'Hello World' },
            });
          });

          // Открываем снова AsyncSelect
          await act(async () => {
            fireEvent.mouseDown(await renderer.findByText(/Выбрать/));
          });

          // Ожидаем, что был вызван API с параметрами, переданными из первого фильтра
          waitFor(() => {
            expect(mockApi).toHaveBeenLastCalledWith({
              params: { ['filter-one']: 'Hello World' },
            });
          });
        });
      });
    });
  });
});

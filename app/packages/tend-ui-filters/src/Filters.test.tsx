import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import { Filters } from './Filters';

describe('Filters', () => {
  describe('when INTERNAL_scope is NOT given', () => {
    describe('when "value" is provided', () => {
      it('update internal state correctly', async () => {
        const onFilterValuesChangeMock = jest.fn();

        const renderer = render(
          <Filters
            open
            debounce={false}
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
          expect(renderer.getByDisplayValue(/Hello World/)).toBeInTheDocument();
          expect(renderer.getByDisplayValue(/Hello Galaxy/)).toBeInTheDocument();
        });

        renderer.rerender(
          <Filters
            open
            debounce={false}
            value={{ ['filter-one']: 'Hello Earth' }}
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
          expect(renderer.queryByDisplayValue(/Hello Earth/)).toBeInTheDocument();
          expect(renderer.queryByDisplayValue(/Hello World/)).not.toBeInTheDocument();
          expect(renderer.queryByDisplayValue(/Hello Galaxy/)).not.toBeInTheDocument();
        });
      });
    });
    describe('when "defaultValue" is provided', () => {
      it('fills out internal state correctly', async () => {
        const onFilterValuesChangeMock = jest.fn();

        const renderer = render(
          <Filters
            open
            debounce={false}
            defaultValue={{
              ['filter-one']: 'Hello World',
              ['filter-two']: 'Hello Galaxy',
            }}
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

        await waitFor(() => {
          expect(renderer.queryByDisplayValue(/Hello World/)).toBeInTheDocument();
          expect(renderer.queryByDisplayValue(/Hello Galaxy/)).toBeInTheDocument();
        });

        act(() => {
          fireEvent.change(renderer.getByTestId('filter-one'), {
            target: { value: 'Hello World Again' },
          });
        });

        await waitFor(() => {
          expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
            { ['filter-one']: 'Hello World Again' },
            { ['filter-one']: 'Hello World Again', ['filter-two']: 'Hello Galaxy' },
          );
        });
      });
    });
    describe('when "range-input" filter is typed', () => {
      it('calls "onFilterValuesChange" callback correctly', async () => {
        const onFilterValuesChangeMock = jest.fn();

        const renderer = render(
          <Filters
            open
            debounce={false}
            onFilterValuesChange={onFilterValuesChangeMock}
            filters={[
              {
                key: 'filter-one',
                id: 'filter-one',
                name: 'filter-one',
                label: 'Filter 1',
                component: { component: 'range-input' },
              },
            ]}
          />,
        );

        await waitFor(() => {
          expect(renderer.getByTestId('rovna-ui-range-input-from')).toBeInTheDocument();
          expect(renderer.getByTestId('rovna-ui-range-input-to')).toBeInTheDocument();
        });

        act(() => {
          fireEvent.change(renderer.getByTestId('rovna-ui-range-input-from'), {
            target: { value: '100' },
          });
        });

        await waitFor(() => {
          expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
            { ['filter-one']: [100, null] },
            { ['filter-one']: [100, null] },
          );
        });

        act(() => {
          fireEvent.change(renderer.getByTestId('rovna-ui-range-input-to'), {
            target: { value: '500' },
          });
        });

        await waitFor(() => {
          expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
            { ['filter-one']: [100, 500] },
            { ['filter-one']: [100, 500] },
          );
        });
      });
    });
    describe('when changing some filters', () => {
      it('calls "onFilterValuesChange" callback correctly', async () => {
        const onFilterValuesChangeMock = jest.fn();

        const renderer = render(
          <Filters
            open
            debounce={false}
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
      });
      it('calls "onFilterValuesFinish" callback correctly', async () => {
        const onFilterValuesFinishMock = jest.fn();

        const renderer = render(
          <Filters
            open
            showApplyButton
            debounce={false}
            onFilterValuesFinish={onFilterValuesFinishMock}
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
          expect(
            renderer.getByTestId('rovna-ui-filters-apply-button'),
          ).toBeInTheDocument();
        });

        act(() => {
          fireEvent.change(renderer.getByTestId('filter-one'), {
            target: { value: 'Hello World' },
          });
        });

        // Кликаем на "Применить"
        act(() => {
          fireEvent.click(renderer.getByTestId('rovna-ui-filters-apply-button'));
        });

        await waitFor(() => {
          expect(onFilterValuesFinishMock).toHaveBeenLastCalledWith({
            ['filter-one']: 'Hello World',
          });
        });

        act(() => {
          fireEvent.change(renderer.getByTestId('filter-two'), {
            target: { value: 'Hello Galaxy' },
          });
        });

        // Кликаем на "Применить"
        act(() => {
          fireEvent.click(renderer.getByTestId('rovna-ui-filters-apply-button'));
        });

        await waitFor(() => {
          expect(onFilterValuesFinishMock).toHaveBeenLastCalledWith({
            ['filter-one']: 'Hello World',
            ['filter-two']: 'Hello Galaxy',
          });
        });
      });
    });
    describe('when "Reset all filters" button has been clicked', () => {
      it('resets all filters correctly', async () => {
        const onFilterValuesChangeMock = jest.fn();

        const renderer = render(
          <Filters
            open
            debounce={false}
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
          fireEvent.click(renderer.getByTestId('rovna-ui-filters-reset-all-button'));
        });

        await waitFor(() => {
          expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
            { ['filter-one']: undefined, ['filter-two']: undefined },
            { ['filter-one']: undefined, ['filter-two']: undefined },
          );
        });
      });
    });
    describe('when filter has not any typed  values', () => {
      it('"Reset filter" button is not visible', async () => {
        const onFilterValuesChangeMock = jest.fn();

        const renderer = render(
          <Filters
            open
            debounce={false}
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

          expect(renderer.queryAllByText(/^Сбросить$/).length).toBe(1);
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
          <Filters
            open
            debounce={false}
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
          <Filters
            open
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

        await waitFor(() => {
          expect(renderer.getByTestId('filter-one')).toBeInTheDocument();
          expect(renderer.getByTestId('filter-two')).toBeInTheDocument();
          expect(renderer.getByTestId('filter-two')).toBeDisabled();
        });

        // Вводим значение
        act(() => {
          fireEvent.change(renderer.getByTestId('filter-one'), {
            target: { value: 'Hello World' },
          });
        });

        await waitFor(() => {
          // Фильтр должен быть разблокирован
          expect(renderer.getByTestId('filter-two')).not.toBeDisabled();
        });

        // Стираем значение
        act(() => {
          fireEvent.change(renderer.getByTestId('filter-one'), {
            target: { value: '' },
          });
        });

        await waitFor(() => {
          // Фильтра должен быть снова заблокирован
          expect(renderer.getByTestId('filter-two')).toBeDisabled();
        });
      });
      it('then the depending filters "Reset" button "disabled" property is "true"', async () => {
        const renderer = render(
          <Filters
            open
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
          // Фильтр должен быть разблокирован
          expect(renderer.getByTestId('filter-two')).not.toBeDisabled();
        });

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

        await waitFor(() => {
          // Кнопка сброса зависимого фильтра должна быть заблокирована
          expect(
            renderer.getAllByTestId('rovna-ui-filters-reset-button')[0],
          ).toBeDisabled();
        });
      });
    });
    describe('when slave filter has "depends" property', () => {
      describe('and master filter has been touched', () => {
        it('then calls "onFilterValuesChange" with empty slave filter correctly', async () => {
          const onFilterValuesChangeMock = jest.fn();

          const renderer = render(
            <Filters
              open
              debounce={false}
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

          await waitFor(() => {
            // Ожидаем, что второй фильтр должен быть сброшен
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
            <Filters
              open
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

          await waitFor(() => {
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

          await waitFor(() => {
            // Ожидаем, что был вызван API с параметрами, переданными из первого фильтра
            expect(mockApi).toHaveBeenLastCalledWith({
              params: { ['filter-one']: 'Hello World' },
            });
          });
        });
      });
    });
    describe('when "showPresets" is "true"', () => {
      describe('and "defaultPresets" is given', () => {
        it('applies preset correctly', async () => {
          const onPresetApplyMock = jest.fn();

          const Component = () => {
            const [open, setOpen] = React.useState(false);

            return (
              <>
                <button onClick={() => setOpen(true)}>Open</button>
                <Filters
                  showPresets
                  open={open}
                  debounce={false}
                  onPresetApply={onPresetApplyMock}
                  defaultPresets={[
                    {
                      id: '1',
                      label: 'Preset 1',
                      value: {
                        ['filter-one']: 'Hello World',
                      },
                    },
                    {
                      id: '2',
                      label: 'Preset 2',
                      value: {
                        ['filter-two']: '2025-02-25T12:47:50.030Z',
                      },
                    },
                  ]}
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
                      component: {
                        component: 'date-picker',
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        ['data-testid']: 'filter-two',
                      },
                    },
                  ]}
                />
              </>
            );
          };

          const renderer = render(<Component />);

          act(() => {
            fireEvent.click(renderer.getByText(/Open/));
          });

          const filter_1 = await renderer.findByTestId('filter-one');
          const filter_2 = await renderer.findByTestId('filter-two');
          const saveButton = await renderer.findByTestId('rovna-ui-filters-save-button');

          expect(filter_1).toBeInTheDocument();
          expect(filter_2).toBeInTheDocument();
          expect(saveButton).toBeDisabled();

          act(() => {
            fireEvent.click(renderer.getByText(/Сохраненные фильтры: 2/));
          });

          await waitFor(() => {
            expect(renderer.getByText(/Preset 2/)).toBeInTheDocument();
          });

          act(() => {
            fireEvent.click(renderer.getByText(/Preset 1/));
          });

          await waitFor(() => {
            expect(onPresetApplyMock).toHaveBeenLastCalledWith({
              id: '1',
              label: 'Preset 1',
              value: { ['filter-one']: 'Hello World' },
            });
          });
        });
      });
      describe('and there is no selected filters', () => {
        it('"Save button" should be disabled"', async () => {
          const onFilterValuesChangeMock = jest.fn();

          const Component = () => {
            const [open, setOpen] = React.useState(false);

            return (
              <>
                <button onClick={() => setOpen(true)}>Open</button>
                <Filters
                  showPresets
                  open={open}
                  debounce={false}
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
                />
              </>
            );
          };

          const renderer = render(<Component />);

          act(() => {
            fireEvent.click(renderer.getByText(/Open/));
          });

          const filter_1 = await renderer.findByTestId('filter-one');
          const filter_2 = await renderer.findByTestId('filter-two');
          const saveButton = await renderer.findByTestId('rovna-ui-filters-save-button');

          await waitFor(() => {
            expect(filter_1).toBeInTheDocument();
            expect(filter_2).toBeInTheDocument();
            expect(saveButton).toBeDisabled();
          });
        });
      });
      describe('and there is selected filters', () => {
        it('calls "onPresetsChange" correctly', async () => {
          const onPresetsChangeMock = jest.fn();
          const onPresetSaveMock = jest.fn();

          const Component = () => {
            const [open, setOpen] = React.useState(false);

            return (
              <>
                <button onClick={() => setOpen(true)}>Open</button>
                <Filters
                  showPresets
                  open={open}
                  debounce={false}
                  onPresetsChange={onPresetsChangeMock}
                  onPresetSave={onPresetSaveMock}
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
                />
              </>
            );
          };

          const renderer = render(<Component />);

          act(() => {
            fireEvent.click(renderer.getByText(/Open/));
          });

          const filter_1 = await renderer.findByTestId('filter-one');
          const filter_2 = await renderer.findByTestId('filter-two');
          const saveButton = await renderer.findByTestId('rovna-ui-filters-save-button');

          expect(filter_1).toBeInTheDocument();
          expect(filter_2).toBeInTheDocument();
          expect(saveButton).toBeDisabled();

          act(() => {
            fireEvent.change(renderer.getByTestId('filter-one'), {
              target: { value: 'Hello World' },
            });
            fireEvent.change(renderer.getByTestId('filter-two'), {
              target: { value: 'Hello Galaxy' },
            });
          });

          await waitFor(() => {
            expect(renderer.getByDisplayValue(/Hello World/)).toBeInTheDocument();
            expect(renderer.getByDisplayValue(/Hello Galaxy/)).toBeInTheDocument();
          });

          act(() => {
            fireEvent.click(saveButton);
          });

          await waitFor(() => {
            expect(
              renderer.getByTestId('rovna-ui-filters-save-preset-modal'),
            ).toBeInTheDocument();
          });

          act(() => {
            fireEvent.click(renderer.getByText(/Сохранить фильтр/));
          });

          await waitFor(() => {
            expect(onPresetSaveMock).toHaveBeenLastCalledWith(
              expect.objectContaining({
                id: expect.any(String),
                label: 'Сохраненный фильтр 1',
                value: {
                  ['filter-one']: 'Hello World',
                  ['filter-two']: 'Hello Galaxy',
                },
              }),
            );
          });
        });
        it('"Save button" should not be disabled"', async () => {
          const onFilterValuesChangeMock = jest.fn();

          const Component = () => {
            const [open, setOpen] = React.useState(false);

            return (
              <>
                <button onClick={() => setOpen(true)}>Open</button>
                <Filters
                  showPresets
                  open={open}
                  debounce={false}
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
                />
              </>
            );
          };

          const renderer = render(<Component />);

          act(() => {
            fireEvent.click(renderer.getByText(/Open/));
          });

          const filter_1 = await renderer.findByTestId('filter-one');
          const filter_2 = await renderer.findByTestId('filter-two');
          const saveButton = await renderer.findByTestId('rovna-ui-filters-save-button');

          await waitFor(() => {
            expect(filter_1).toBeInTheDocument();
            expect(filter_2).toBeInTheDocument();
            expect(saveButton).toBeDisabled();
          });

          act(() => {
            fireEvent.change(renderer.getByTestId('filter-one'), {
              target: { value: 'Hello World' },
            });
          });

          await waitFor(() => {
            expect(saveButton).not.toBeDisabled();
          });
        });
      });
    });
  });

  describe('when INTERNAL_scope is given', () => {
    describe('when changing some filters', () => {
      it('calls "onFilterValuesChange" callback correctly', async () => {
        const onFilterValuesChangeMock = jest.fn();

        const Component = () => {
          const [open, setOpen] = React.useState(false);

          return (
            <>
              <button onClick={() => setOpen(true)}>Open</button>
              <Filters
                INTERNAL_scope='filters'
                open={open}
                debounce={false}
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
              />
            </>
          );
        };

        const renderer = render(<Component />);

        act(() => {
          fireEvent.click(renderer.getByText(/Open/));
        });

        await waitFor(() => {
          expect(renderer.getByTestId('filter-one')).toBeInTheDocument();
          expect(renderer.getByTestId('filter-two')).toBeInTheDocument();
        });

        act(() => {
          fireEvent.change(renderer.getByTestId('filter-one'), {
            target: { value: 'Hello World' },
          });
        });

        await waitFor(() => {
          expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
            { filters: { ['filter-one']: 'Hello World' } },
            { filters: { ['filter-one']: 'Hello World' } },
          );
        });

        act(() => {
          fireEvent.change(renderer.getByTestId('filter-two'), {
            target: { value: 'Hello Galaxy' },
          });
        });

        await waitFor(() => {
          expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
            { filters: { ['filter-two']: 'Hello Galaxy' } },
            {
              filters: { ['filter-one']: 'Hello World', ['filter-two']: 'Hello Galaxy' },
            },
          );
        });
      });
      it('calls "onFilterValuesFinish" callback correctly', async () => {
        const onFilterValuesFinishMock = jest.fn();

        const renderer = render(
          <Filters
            INTERNAL_scope='filters'
            open
            showApplyButton
            debounce={false}
            onFilterValuesFinish={onFilterValuesFinishMock}
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
          expect(
            renderer.getByTestId('rovna-ui-filters-apply-button'),
          ).toBeInTheDocument();
        });

        act(() => {
          fireEvent.change(renderer.getByTestId('filter-one'), {
            target: { value: 'Hello World' },
          });
        });

        // Кликаем на "Применить"
        act(() => {
          fireEvent.click(renderer.getByTestId('rovna-ui-filters-apply-button'));
        });

        await waitFor(() => {
          expect(onFilterValuesFinishMock).toHaveBeenLastCalledWith({
            filters: { ['filter-one']: 'Hello World' },
          });
        });

        act(() => {
          fireEvent.change(renderer.getByTestId('filter-two'), {
            target: { value: 'Hello Galaxy' },
          });
          fireEvent.click(renderer.getByTestId('rovna-ui-filters-apply-button'));
        });

        await waitFor(() => {
          expect(onFilterValuesFinishMock).toHaveBeenLastCalledWith({
            filters: {
              ['filter-one']: 'Hello World',
              ['filter-two']: 'Hello Galaxy',
            },
          });
        });
      });
    });

    describe('when "Reset all filters" button has been clicked', () => {
      it('resets all filters correctly', async () => {
        const onFilterValuesChangeMock = jest.fn();
        const INTERNAL_scope = 'filters';

        const Component = () => {
          const [open, setOpen] = React.useState(false);

          return (
            <>
              <button onClick={() => setOpen(true)}>Open</button>
              <Filters
                INTERNAL_scope={INTERNAL_scope}
                open={open}
                debounce={false}
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
              />
            </>
          );
        };

        const renderer = render(<Component />);

        act(() => {
          fireEvent.click(renderer.getByText(/Open/));
        });

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
            { [INTERNAL_scope]: { ['filter-one']: 'Hello World' } },
            { [INTERNAL_scope]: { ['filter-one']: 'Hello World' } },
          );
        });

        act(() => {
          fireEvent.change(renderer.getByTestId('filter-two'), {
            target: { value: 'Hello Galaxy' },
          });
        });

        await waitFor(() => {
          expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
            { [INTERNAL_scope]: { ['filter-two']: 'Hello Galaxy' } },
            {
              [INTERNAL_scope]: {
                ['filter-one']: 'Hello World',
                ['filter-two']: 'Hello Galaxy',
              },
            },
          );
        });

        act(() => {
          fireEvent.click(renderer.getByTestId('rovna-ui-filters-reset-all-button'));
        });

        await waitFor(() => {
          expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
            {
              [INTERNAL_scope]: { ['filter-one']: undefined, ['filter-two']: undefined },
            },
            {
              [INTERNAL_scope]: { ['filter-one']: undefined, ['filter-two']: undefined },
            },
          );
        });
      });
    });

    describe('when filter has not any typed  values', () => {
      it('"Reset filter" button is not visible', async () => {
        const INTERNAL_scope = 'filters';
        const onFilterValuesChangeMock = jest.fn();

        const Component = () => {
          const [open, setOpen] = React.useState(false);

          return (
            <>
              <button onClick={() => setOpen(true)}>Open</button>
              <Filters
                INTERNAL_scope={INTERNAL_scope}
                open={open}
                debounce={false}
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
              />
            </>
          );
        };

        const renderer = render(<Component />);

        act(() => {
          fireEvent.click(renderer.getByText(/Open/));
        });

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
            { [INTERNAL_scope]: { ['filter-one']: 'Hello World' } },
            { [INTERNAL_scope]: { ['filter-one']: 'Hello World' } },
          );
        });

        await waitFor(() => {
          expect(renderer.queryAllByText(/^Сбросить$/).length).toBe(1);
        });

        act(() => {
          fireEvent.change(renderer.getByTestId('filter-two'), {
            target: { value: 'Hello Galaxy' },
          });
        });

        await waitFor(() => {
          expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
            { [INTERNAL_scope]: { ['filter-two']: 'Hello Galaxy' } },
            {
              [INTERNAL_scope]: {
                ['filter-one']: 'Hello World',
                ['filter-two']: 'Hello Galaxy',
              },
            },
          );
        });

        await waitFor(() => {
          expect(renderer.queryAllByText(/^Сбросить$/).length).toBe(2);
        });

        act(() => {
          fireEvent.click(renderer.getAllByText(/^Сбросить$/)[1]);
        });

        await waitFor(() => {
          expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
            { [INTERNAL_scope]: { ['filter-one']: undefined } },
            {
              [INTERNAL_scope]: {
                ['filter-one']: 'Hello World',
                ['filter-two']: undefined,
              },
            },
          );
          expect(renderer.queryAllByText(/^Сбросить$/).length).toBe(1);
        });
      });
    });

    describe('when "Reset filter" button has been clicked', () => {
      it('resets specific clicked filter correctly', async () => {
        const INTERNAL_scope = 'filters';
        const onFilterValuesChangeMock = jest.fn();

        const Component = () => {
          const [open, setOpen] = React.useState(false);

          return (
            <>
              <button
                onClick={() => {
                  setOpen(true);
                }}
              >
                Open
              </button>
              <Filters
                INTERNAL_scope={INTERNAL_scope}
                open={open}
                debounce={false}
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
              />
            </>
          );
        };

        const renderer = render(<Component />);

        act(() => {
          fireEvent.click(renderer.getByText(/Open/));
        });

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
            { [INTERNAL_scope]: { ['filter-one']: 'Hello World' } },
            { [INTERNAL_scope]: { ['filter-one']: 'Hello World' } },
          );
        });

        act(() => {
          fireEvent.change(renderer.getByTestId('filter-two'), {
            target: { value: 'Hello Galaxy' },
          });
        });

        await waitFor(() => {
          expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
            { [INTERNAL_scope]: { ['filter-two']: 'Hello Galaxy' } },
            {
              [INTERNAL_scope]: {
                ['filter-one']: 'Hello World',
                ['filter-two']: 'Hello Galaxy',
              },
            },
          );
        });

        act(() => {
          fireEvent.click(renderer.getAllByText(/^Сбросить$/)[0]);
        });

        await waitFor(() => {
          expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
            { [INTERNAL_scope]: { ['filter-one']: undefined } },
            {
              [INTERNAL_scope]: {
                ['filter-one']: undefined,
                ['filter-two']: 'Hello Galaxy',
              },
            },
          );
        });
      });
    });

    describe('when "requires" property is not empty', () => {
      it('then the depending filter "disabled" property is "true"', async () => {
        const INTERNAL_scope = 'filters';

        const Component = () => {
          const [open, setOpen] = React.useState(false);

          return (
            <>
              <button
                onClick={() => {
                  setOpen(true);
                }}
              >
                Open
              </button>
              <Filters
                INTERNAL_scope={INTERNAL_scope}
                open={open}
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
              />
            </>
          );
        };

        const renderer = render(<Component />);

        act(() => {
          fireEvent.click(renderer.getByText(/Open/));
        });

        await waitFor(() => {
          expect(renderer.getByTestId('filter-one')).toBeInTheDocument();
          expect(renderer.getByTestId('filter-two')).toBeInTheDocument();
          expect(renderer.getByTestId('filter-one')).toBeInTheDocument();
          expect(renderer.getByTestId('filter-two')).toBeInTheDocument();
          expect(renderer.getByTestId('filter-two')).toBeDisabled();
        });

        // Вводим значение
        act(() => {
          fireEvent.change(renderer.getByTestId('filter-one'), {
            target: { value: 'Hello World' },
          });
        });

        await waitFor(() => {
          // Фильтр должен быть разблокирован
          expect(renderer.getByTestId('filter-two')).not.toBeDisabled();
        });

        // Стираем значение
        act(() => {
          fireEvent.change(renderer.getByTestId('filter-one'), {
            target: { value: '' },
          });
        });

        await waitFor(() => {
          // Фильтра должен быть снова заблокирован
          expect(renderer.getByTestId('filter-two')).toBeDisabled();
        });
      });
      it('then the depending filters "Reset" button "disabled" property is "true"', async () => {
        const INTERNAL_scope = 'filters';

        const Component = () => {
          const [open, setOpen] = React.useState(false);

          return (
            <>
              <button
                onClick={() => {
                  setOpen(true);
                }}
              >
                Open
              </button>
              <Filters
                INTERNAL_scope={INTERNAL_scope}
                open={open}
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
              />
            </>
          );
        };

        const renderer = render(<Component />);

        act(() => {
          fireEvent.click(renderer.getByText(/Open/));
        });

        await waitFor(() => {
          expect(renderer.getByTestId('filter-one')).toBeInTheDocument();
          expect(renderer.getByTestId('filter-two')).toBeInTheDocument();
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
          // Фильтр должен быть разблокирован
          expect(renderer.getByTestId('filter-two')).not.toBeDisabled();
        });

        // Вводим значение во второй фильтр
        act(() => {
          fireEvent.change(renderer.getByTestId('filter-two'), {
            target: { value: 'Hello Galaxy' },
          });
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
          const INTERNAL_scope = 'filters';

          const Component = () => {
            const [open, setOpen] = React.useState(false);

            return (
              <>
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Open
                </button>
                <Filters
                  INTERNAL_scope={INTERNAL_scope}
                  open={open}
                  debounce={false}
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
                />
              </>
            );
          };

          const renderer = render(<Component />);

          act(() => {
            fireEvent.click(renderer.getByText(/Open/));
          });

          await waitFor(() => {
            expect(renderer.getByTestId('filter-one')).toBeInTheDocument();
            expect(renderer.getByTestId('filter-two')).toBeInTheDocument();
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
              { [INTERNAL_scope]: { ['filter-one']: 'Hello World' } },
              { [INTERNAL_scope]: { ['filter-one']: 'Hello World' } },
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
              { [INTERNAL_scope]: { ['filter-two']: 'Hello Space' } },
              {
                [INTERNAL_scope]: {
                  ['filter-one']: 'Hello World',
                  ['filter-two']: 'Hello Space',
                },
              },
            );
          });

          // Вводим значение в первый фильтр снова
          act(() => {
            fireEvent.change(renderer.getByTestId('filter-one'), {
              target: { value: 'Hello World 2' },
            });
          });

          // Ожидаем, что второй фильтр должен быть сброшен
          await waitFor(() => {
            expect(onFilterValuesChangeMock).toHaveBeenLastCalledWith(
              { [INTERNAL_scope]: { ['filter-one']: 'Hello World 2' } },
              {
                [INTERNAL_scope]: {
                  ['filter-one']: 'Hello World 2',
                  ['filter-two']: undefined,
                },
              },
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

          const INTERNAL_scope = 'filters';

          const Component = () => {
            const [open, setOpen] = React.useState(false);

            return (
              <>
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Open
                </button>
                <Filters
                  INTERNAL_scope={INTERNAL_scope}
                  open={open}
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
                />
              </>
            );
          };

          const renderer = render(<Component />);

          act(() => {
            fireEvent.click(renderer.getByText(/Open/));
          });

          await waitFor(() => {
            expect(renderer.getByTestId('filter-one')).toBeInTheDocument();
            expect(renderer.getByTestId('filter-two')).toBeInTheDocument();
            expect(renderer.getByTestId('filter-one')).toBeInTheDocument();
            expect(renderer.getByTestId('filter-two')).toBeInTheDocument();
          });

          // Открываем AsyncSelect
          await act(async () => {
            fireEvent.mouseDown(await renderer.findByText(/Выбрать/));
          });

          await waitFor(() => {
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
          await waitFor(() => {
            expect(mockApi).toHaveBeenLastCalledWith({
              params: { ['filter-one']: 'Hello World' },
            });
          });
        });
      });
    });
  });
});

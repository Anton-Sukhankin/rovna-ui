import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-test-renderer';

import { ContextMenu, Filters, Search, Toolbar, useTable } from '@rovna-internal/components/features/Table';

import { Root } from './Root';

describe('Root', () => {
  describe('when search input is touched', () => {
    it('calls "onSearchValueChange" correctly', async () => {
      const onSearchValueChange = jest.fn();

      const Component = () => {
        return (
          <Root debounce={false} onSearchValueChange={onSearchValueChange}>
            <Search placeholder='Search...' />
          </Root>
        );
      };

      const renderer = render(<Component />);

      act(() => {
        fireEvent.change(renderer.getByPlaceholderText(/Search.../), {
          target: { value: 'Hello World' },
        });
      });

      expect(onSearchValueChange).toHaveBeenLastCalledWith(
        { search: 'Hello World' },
        'Hello World',
      );
    });
  });
  describe('when sorter is touched', () => {
    it('calls "onSorterValuesChange" correctly', async () => {
      const onSorterValuesChange = jest.fn();

      const Component = () => {
        return (
          <Root
            debounce={false}
            sorters={[
              {
                key: 'sorter-one',
                name: 'sorter-one',
                id: 'sorter-one',
                label: 'Sorter one',
              },
              {
                key: 'sorter-two',
                name: 'sorter-two',
                id: 'sorter-two',
                label: 'Sorter two',
              },
            ]}
            onSorterValuesChange={onSorterValuesChange}
          >
            <Toolbar.Sorters />
          </Root>
        );
      };

      const renderer = render(<Component />);

      // Открываем тулбар с сортировкой
      act(() => {
        fireEvent.click(renderer.getByTestId('rovna-ui-toggle-button'));
      });

      await waitFor(() => {
        expect(renderer.getByText(/Sorter one/)).toBeInTheDocument();
        expect(renderer.getByText(/Sorter two/)).toBeInTheDocument();
      });

      act(() => {
        fireEvent.click(renderer.getByText(/Sorter one/));
      });

      expect(onSorterValuesChange).toHaveBeenCalledWith(
        { ['sorter-one']: 'ascend' },
        { ['sorter-one']: 'ascend' },
      );
    });
    describe('and another sorter is touched', () => {
      it('resets previous applied sorter correctly', async () => {
        const onSorterValuesChange = jest.fn();

        const Component = () => {
          return (
            <Root
              debounce={false}
              sorters={[
                {
                  key: 'sorter-one',
                  name: 'sorter-one',
                  id: 'sorter-one',
                  label: 'Sorter one',
                },
                {
                  key: 'sorter-two',
                  name: 'sorter-two',
                  id: 'sorter-two',
                  label: 'Sorter two',
                },
              ]}
              onSorterValuesChange={onSorterValuesChange}
            >
              <Toolbar.Sorters />
            </Root>
          );
        };

        const renderer = render(<Component />);

        // Открываем тулбар с сортировкой
        act(() => {
          fireEvent.click(renderer.getByTestId('rovna-ui-toggle-button'));
        });

        await waitFor(() => {
          expect(renderer.getByText(/Sorter one/)).toBeInTheDocument();
          expect(renderer.getByText(/Sorter two/)).toBeInTheDocument();
        });

        act(() => {
          fireEvent.click(renderer.getByText(/Sorter one/));
        });

        expect(onSorterValuesChange).toHaveBeenCalledWith(
          { ['sorter-one']: 'ascend' },
          { ['sorter-one']: 'ascend' },
        );

        act(() => {
          fireEvent.click(renderer.getByText(/Sorter two/));
        });

        expect(onSorterValuesChange).toHaveBeenCalledWith(
          { ['sorter-two']: 'ascend' },
          { ['sorter-one']: 'default', ['sorter-two']: 'ascend' },
        );
      });
    });
  });
  describe('when side filters are touched', () => {
    it('calls "onFilterValuesChange" correctly', async () => {
      const onFilterValuesChangeMock = jest.fn();

      const Component = () => {
        const [open, setOpen] = React.useState(false);
        const table = useTable();

        return (
          <Root
            debounce={false}
            form={table.form}
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
            onFilterValuesChange={onFilterValuesChangeMock}
          >
            <button
              onClick={() => {
                setOpen(true);
              }}
            >
              Open filters
            </button>
            <Filters open={open} />
          </Root>
        );
      };

      const renderer = render(<Component />);

      act(() => {
        fireEvent.click(renderer.getByText(/Open filters/));
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

      expect(onFilterValuesChangeMock).toHaveBeenCalledWith(
        { ['filter-one']: 'Hello World' },
        { ['filter-one']: 'Hello World' },
      );

      act(() => {
        fireEvent.change(renderer.getByTestId('filter-two'), {
          target: { value: 'Hello Galaxy' },
        });
      });

      expect(onFilterValuesChangeMock).toHaveBeenCalledWith(
        { ['filter-two']: 'Hello Galaxy' },
        { ['filter-one']: 'Hello World', ['filter-two']: 'Hello Galaxy' },
      );
    });
  });
  describe('when context filters are touched', () => {
    it('calls "onFilterValuesChange" correctly', async () => {
      const onFilterValuesChangeMock = jest.fn();

      const Component = () => {
        const table = useTable();

        return (
          <Root
            debounce={false}
            form={table.form}
            columns={[
              { key: 'column-one', id: 'filter-one' },
              { key: 'column-two', id: 'filter-two' },
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
                component: { component: 'input', ['data-testid']: 'filter-two' },
              },
            ]}
            onFilterValuesChange={onFilterValuesChangeMock}
          >
            <ContextMenu id='filter-one'>Context filter one</ContextMenu>
            <ContextMenu id='filter-two'>Context filter two</ContextMenu>
          </Root>
        );
      };

      const renderer = render(<Component />);

      // Открываем фильтр
      act(() => {
        fireEvent.click(renderer.getByText(/Context filter one/));
      });

      await waitFor(() => {
        expect(renderer.getByTestId('filter-one')).toBeInTheDocument();
      });

      // Открываем фильтр
      act(() => {
        fireEvent.click(renderer.getByText(/Context filter two/));
      });

      await waitFor(() => {
        expect(renderer.getByTestId('filter-two')).toBeInTheDocument();
      });

      act(() => {
        fireEvent.change(renderer.getByTestId('filter-one'), {
          target: { value: 'Hello World' },
        });
      });

      expect(onFilterValuesChangeMock).toHaveBeenCalledWith(
        { ['filter-one']: 'Hello World' },
        { ['filter-one']: 'Hello World' },
      );

      act(() => {
        fireEvent.change(renderer.getByTestId('filter-two'), {
          target: { value: 'Hello Galaxy' },
        });
      });

      expect(onFilterValuesChangeMock).toHaveBeenCalledWith(
        { ['filter-two']: 'Hello Galaxy' },
        { ['filter-one']: 'Hello World', ['filter-two']: 'Hello Galaxy' },
      );
    });
  });
  describe('when "Reset all filters" button clicked', () => {
    it('resets all filters and does not resets sorters correctly', async () => {
      const onFilterValuesChangeMock = jest.fn();

      const Component = () => {
        const [open, setOpen] = React.useState(false);
        const table = useTable();

        return (
          <Root
            debounce={false}
            form={table.form}
            sorters={[
              { name: 'sorter-one', id: 'id-one', label: 'Sorter one' },
              { name: 'sorter-two', id: 'id-two', label: 'Sorter two' },
            ]}
            value={{ sorters: { ['sorter-one']: 'ascend', ['sorter-two']: 'descend' } }}
            filters={[
              {
                key: 'filter-one',
                id: 'id-one',
                name: 'filter-one',
                label: 'Filter 1',
                component: { component: 'input', ['data-testid']: 'filter-one' },
              },
              {
                key: 'filter-two',
                id: 'id-two',
                name: 'filter-two',
                label: 'Filter 2',
                component: { component: 'input', ['data-testid']: 'filter-two' },
              },
            ]}
            onFilterValuesChange={onFilterValuesChangeMock}
          >
            <button
              onClick={() => {
                setOpen(true);
              }}
            >
              Open filters
            </button>
            <Toolbar.Sorters />
            <Filters open={open} />
          </Root>
        );
      };

      const renderer = render(<Component />);

      // Открываем тулбар с сортировкой чтобы косвенно по наличие иконки
      // понять, что сортировка отображается корректно
      act(() => {
        fireEvent.click(renderer.getByTestId('rovna-ui-toggle-button'));
      });

      await waitFor(() => {
        expect(renderer.getByTestId('rovna-ui-arrow-up-icon')).toBeInTheDocument();
        expect(renderer.getByTestId('rovna-ui-arrow-down-icon')).toBeInTheDocument();
      });

      act(() => {
        fireEvent.click(renderer.getByText(/Open filters/));
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

      expect(onFilterValuesChangeMock).toHaveBeenCalledWith(
        { ['filter-one']: 'Hello World' },
        { ['filter-one']: 'Hello World' },
      );

      act(() => {
        fireEvent.change(renderer.getByTestId('filter-two'), {
          target: { value: 'Hello Galaxy' },
        });
      });

      expect(onFilterValuesChangeMock).toHaveBeenCalledWith(
        { ['filter-two']: 'Hello Galaxy' },
        { ['filter-one']: 'Hello World', ['filter-two']: 'Hello Galaxy' },
      );

      act(() => {
        fireEvent.click(renderer.getByTestId('rovna-ui-filters-reset-all-button'));
      });

      expect(onFilterValuesChangeMock).toHaveBeenCalledWith(
        { ['filter-one']: undefined, ['filter-two']: undefined },
        { ['filter-one']: undefined, ['filter-two']: undefined },
      );

      // Проверяем, что при сбросе фильтров сортировка не сбрасывается
      expect(renderer.getByTestId('rovna-ui-arrow-up-icon')).toBeInTheDocument();
      expect(renderer.getByTestId('rovna-ui-arrow-down-icon')).toBeInTheDocument();
    });
  });
  describe('when "Reset" button in context menu is clicked', () => {
    it('calls "onFilterValuesChange" correctly', async () => {
      const onFilterValuesChangeMock = jest.fn();

      const Component = () => {
        const table = useTable();

        return (
          <Root
            debounce={false}
            form={table.form}
            columns={[
              { key: 'column-one', id: 'filter-one' },
              { key: 'column-two', id: 'filter-two' },
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
                component: { component: 'input', ['data-testid']: 'filter-two' },
              },
            ]}
            onFilterValuesChange={onFilterValuesChangeMock}
          >
            <ContextMenu id='filter-one'>Context filter one</ContextMenu>
            <ContextMenu id='filter-two'>Context filter two</ContextMenu>
          </Root>
        );
      };

      const renderer = render(<Component />);

      // Открываем фильтр
      act(() => {
        fireEvent.click(renderer.getByText(/Context filter one/));
      });

      await waitFor(() => {
        expect(renderer.getByTestId('filter-one')).toBeInTheDocument();
      });

      // Открываем фильтр
      act(() => {
        fireEvent.click(renderer.getByText(/Context filter two/));
      });

      await waitFor(() => {
        expect(renderer.getByTestId('filter-two')).toBeInTheDocument();
      });

      act(() => {
        fireEvent.change(renderer.getByTestId('filter-one'), {
          target: { value: 'Hello World' },
        });
      });

      expect(onFilterValuesChangeMock).toHaveBeenCalledWith(
        { ['filter-one']: 'Hello World' },
        { ['filter-one']: 'Hello World' },
      );

      act(() => {
        fireEvent.change(renderer.getByTestId('filter-two'), {
          target: { value: 'Hello Galaxy' },
        });
      });

      expect(onFilterValuesChangeMock).toHaveBeenCalledWith(
        { ['filter-two']: 'Hello Galaxy' },
        { ['filter-one']: 'Hello World', ['filter-two']: 'Hello Galaxy' },
      );

      act(() => {
        fireEvent.click(renderer.getAllByText(/Сбросить/)[0]);
      });

      expect(onFilterValuesChangeMock).toHaveBeenCalledWith(
        { ['filter-one']: undefined },
        { ['filter-one']: undefined, ['filter-two']: 'Hello Galaxy' },
      );

      act(() => {
        fireEvent.click(renderer.getAllByText(/Сбросить/)[1]);
      });

      expect(onFilterValuesChangeMock).toHaveBeenCalledWith(
        { ['filter-two']: undefined },
        { ['filter-one']: undefined, ['filter-two']: undefined },
      );
    });
  });
  describe('when "Reset" button in "Drawer" filters is clicked', () => {
    it('calls "onFilterValuesChange" correctly', async () => {
      const onFilterValuesChangeMock = jest.fn();

      const Component = () => {
        const [open, setOpen] = React.useState(false);

        return (
          <Root
            debounce={false}
            columns={[
              { key: 'column-one', id: 'filter-one' },
              { key: 'column-two', id: 'filter-two' },
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
                component: { component: 'input', ['data-testid']: 'filter-two' },
              },
            ]}
            onFilterValuesChange={onFilterValuesChangeMock}
          >
            <button
              onClick={() => {
                setOpen(true);
              }}
            >
              Open filters
            </button>
            <Filters open={open} />
          </Root>
        );
      };

      const renderer = render(<Component />);

      // Вводим значение
      act(() => {
        fireEvent.click(renderer.getByText(/Open filters/));
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

      expect(onFilterValuesChangeMock).toHaveBeenCalledWith(
        { ['filter-one']: 'Hello World' },
        { ['filter-one']: 'Hello World' },
      );

      act(() => {
        fireEvent.change(renderer.getByTestId('filter-two'), {
          target: { value: 'Hello Galaxy' },
        });
      });

      expect(onFilterValuesChangeMock).toHaveBeenCalledWith(
        { ['filter-two']: 'Hello Galaxy' },
        { ['filter-one']: 'Hello World', ['filter-two']: 'Hello Galaxy' },
      );

      act(() => {
        fireEvent.click(renderer.getAllByTestId('rovna-ui-filters-reset-button')[0]);
      });

      expect(onFilterValuesChangeMock).toHaveBeenCalledWith(
        { ['filter-one']: undefined },
        { ['filter-one']: undefined, ['filter-two']: 'Hello Galaxy' },
      );
    });
  });

  describe('when "defaultValue" is given', () => {
    it('fills out filters correctly', async () => {
      const onFilterValuesChangeMock = jest.fn();

      const Component = () => {
        const [open, setOpen] = React.useState(false);

        return (
          <Root
            debounce={false}
            columns={[
              { key: 'column-one', id: 'filter-one' },
              { key: 'column-two', id: 'filter-two' },
            ]}
            defaultValue={{
              filters: {
                ['filter-one']: 'Default filter-one input value',
              },
            }}
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
            onFilterValuesChange={onFilterValuesChangeMock}
          >
            <button
              onClick={() => {
                setOpen(true);
              }}
            >
              Open filters
            </button>
            <Filters open={open} />
          </Root>
        );
      };

      const renderer = render(<Component />);

      // Открываем фильтры
      act(() => {
        fireEvent.click(renderer.getByText(/Open filters/));
      });

      await waitFor(() => {
        expect(renderer.getByTestId('filter-one')).toBeInTheDocument();
        expect(renderer.getByTestId('filter-two')).toBeInTheDocument();
      });

      expect(
        renderer.getByDisplayValue(/Default filter-one input value/),
      ).toBeInTheDocument();
    });
  });
});

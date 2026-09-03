import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-test-renderer';

import { FilterConfig, Form } from '@rovna-internal/components/components';
import { Input } from '@rovna-internal/components/primitives/Input';
import { FormName, Scope } from '@rovna-internal/components/features/Table/consts';

import { useFormChangeCallback } from './hooks';

describe('useFormChangeCallback', () => {
  describe('when filters fields have been touched', () => {
    it('calls "onFilterValuesChange" callback correctly', () => {
      const onFilterValuesChange = jest.fn();
      const onSearchValueChange = jest.fn();
      const onSorterValuesChange = jest.fn();

      const Component = () => {
        const [form] = Form.useForm();
        const onFormChange = useFormChangeCallback({
          onFilterValuesChange,
          onSearchValueChange,
          onSorterValuesChange,
        });

        return (
          <Form.Provider onFormChange={onFormChange}>
            <Form form={form} name={FormName.Filters}>
              <Form.Item name={[Scope.Filters, 'first']}>
                <Input data-testid='input-1' />
              </Form.Item>
            </Form>
            <Form form={form} name={FormName.Sorters}>
              <Form.Item name={['sorters', 'second']}>
                <Input data-testid='input-2' />
              </Form.Item>
            </Form>
          </Form.Provider>
        );
      };

      const renderer = render(<Component />);
      const input_1 = renderer.getByTestId('input-1');

      act(() => {
        fireEvent.change(input_1, { target: { value: 'Hello World' } });
      });

      expect(onFilterValuesChange).toHaveBeenCalledWith(
        { first: 'Hello World' },
        { first: 'Hello World' },
      );
      expect(onSearchValueChange).not.toHaveBeenCalled();
      expect(onSorterValuesChange).not.toHaveBeenCalled();
    });
    describe('and some filter has "depends" on another', () => {
      describe('and that filter has been touched', () => {
        it('calls "onFilterValuesChange" with empty depending filter correctly', () => {
          const onFilterValuesChange = jest.fn();
          const onSearchValueChange = jest.fn();
          const onSorterValuesChange = jest.fn();

          const Component = () => {
            const filters: FilterConfig[] = [
              { id: 'input-one', name: 'input-one', component: { component: 'input' } },
              {
                id: 'input-two',
                name: 'input-two',
                depends: ['input-one'],
                component: { component: 'input' },
              },
            ];
            const [form] = Form.useForm();
            const onFormChange = useFormChangeCallback({
              filters,
              onFilterValuesChange,
              onSearchValueChange,
              onSorterValuesChange,
            });

            return (
              <Form.Provider onFormChange={onFormChange}>
                <Form form={form} name={FormName.Filters}>
                  <Form.Item name={[Scope.Filters, 'input-one']}>
                    <Input data-testid='input-one' />
                  </Form.Item>
                  <Form.Item name={[Scope.Filters, 'input-two']}>
                    <Input data-testid='input-two' />
                  </Form.Item>
                </Form>
              </Form.Provider>
            );
          };

          const renderer = render(<Component />);

          act(() => {
            fireEvent.change(renderer.getByTestId('input-one'), {
              target: { value: 'Hello world' },
            });
          });

          expect(onFilterValuesChange).toHaveBeenCalledWith(
            { ['input-one']: 'Hello world' },
            { ['input-one']: 'Hello world' },
          );

          act(() => {
            fireEvent.change(renderer.getByTestId('input-two'), {
              target: { value: 'Hello space' },
            });
          });

          expect(onFilterValuesChange).toHaveBeenCalledWith(
            { ['input-two']: 'Hello space' },
            { ['input-one']: 'Hello world', ['input-two']: 'Hello space' },
          );

          act(() => {
            fireEvent.change(renderer.getByTestId('input-one'), {
              target: { value: 'Hello world 2' },
            });
          });

          expect(onFilterValuesChange).toHaveBeenCalledWith(
            { ['input-one']: 'Hello world 2' },
            { ['input-one']: 'Hello world 2', ['input-two']: undefined },
          );

          expect(onSearchValueChange).not.toHaveBeenCalled();
          expect(onSorterValuesChange).not.toHaveBeenCalled();
        });
      });
    });
  });
  describe('when sorters fields have been touched', () => {
    it('calls "onSorterValuesChange" callback correctly', () => {
      const onFilterValuesChange = jest.fn();
      const onSearchValueChange = jest.fn();
      const onSorterValuesChange = jest.fn();

      const Component = () => {
        const [form] = Form.useForm();
        const onFormChange = useFormChangeCallback({
          onFilterValuesChange,
          onSearchValueChange,
          onSorterValuesChange,
        });

        return (
          <Form.Provider onFormChange={onFormChange}>
            <Form form={form} name={FormName.Filters}>
              <Form.Item name={[Scope.Filters, 'first']}>
                <Input data-testid='input-1' />
              </Form.Item>
            </Form>
            <Form form={form} name={FormName.Sorters}>
              <Form.Item name={['sorters', 'second']}>
                <Input data-testid='input-2' />
              </Form.Item>
            </Form>
          </Form.Provider>
        );
      };

      const renderer = render(<Component />);
      const input_2 = renderer.getByTestId('input-2');

      act(() => {
        fireEvent.change(input_2, { target: { value: 'Hello World' } });
      });

      expect(onSorterValuesChange).toHaveBeenCalledWith(
        { second: 'Hello World' },
        { second: 'Hello World' },
      );
      expect(onFilterValuesChange).not.toHaveBeenCalled();
      expect(onSearchValueChange).not.toHaveBeenCalled();
    });
  });
  describe('when some fields of an unnamed <Form /> have been touched', () => {
    it('does not calls "onFilterValuesChange", "onSorterValuesChange", "onSearchValueChange" callbacks', () => {
      const onFilterValuesChange = jest.fn();
      const onSearchValueChange = jest.fn();
      const onSorterValuesChange = jest.fn();

      const Component = () => {
        const [form] = Form.useForm();
        const onFormChange = useFormChangeCallback({
          onFilterValuesChange,
          onSearchValueChange,
          onSorterValuesChange,
        });

        return (
          <Form.Provider onFormChange={onFormChange}>
            <Form form={form} name={FormName.Filters}>
              <Form.Item name={[Scope.Filters, 'first']}>
                <Input data-testid='input-1' />
              </Form.Item>
            </Form>
            <Form form={form} name={FormName.Sorters}>
              <Form.Item name={['sorters', 'second']}>
                <Input data-testid='input-2' />
              </Form.Item>
            </Form>
            <Form form={form}>
              <Form.Item name='input-3'>
                <Input data-testid='input-3' />
              </Form.Item>
            </Form>
          </Form.Provider>
        );
      };

      const renderer = render(<Component />);

      act(() => {
        fireEvent.change(renderer.getByTestId('input-3'), {
          target: { value: 'Hello World' },
        });
      });

      expect(onSorterValuesChange).not.toHaveBeenCalledWith();
      expect(onFilterValuesChange).not.toHaveBeenCalled();
      expect(onSearchValueChange).not.toHaveBeenCalled();
    });
  });
});

import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import { FormModel } from '@rovna-internal/form/core/classes/FormModel';
import { useForm } from '@rovna-internal/form/hooks';
import { Form } from '@rovna-internal/form/components';

describe('FormModel', () => {
  describe('flat state', () => {
    describe('setField', () => {
      it('does not execute "onChange" callback', () => {
        const onChange = jest.fn();
        const form = new FormModel<{ name?: string }>({ onChange });
        expect(form.getFields()).toStrictEqual({});
        expect(form.getField('name')).toStrictEqual(undefined);

        form.setField('name', 'Hello World');

        expect(form.getFields()).toStrictEqual({ name: 'Hello World' });
        expect(form.getField('name')).toStrictEqual('Hello World');
        expect(onChange).not.toHaveBeenCalled();
      });
    });
    describe('setFields', () => {
      it('does not execute "onChange" callback', () => {
        const onChange = jest.fn();
        const form = new FormModel<{ name?: string }>({ onChange });
        expect(form.getFields()).toStrictEqual({});
        expect(form.getField('name')).toStrictEqual(undefined);

        form.setFields({ name: 'Hello World' });

        expect(form.getFields()).toStrictEqual({ name: 'Hello World' });
        expect(form.getField('name')).toStrictEqual('Hello World');
        expect(onChange).not.toHaveBeenCalled();
      });
    });

    describe('"__setValue"', () => {
      it('sets value correctly', () => {
        const form = new FormModel<{ name?: string }>();
        expect(form.getFields()).toStrictEqual({});
        expect(form.getField('name')).toStrictEqual(undefined);

        form.__setField('name', 'Hello World');

        expect(form.getFields()).toStrictEqual({ name: 'Hello World' });
        expect(form.getField('name')).toStrictEqual('Hello World');
      });
    });
    describe('"setValues"', () => {
      it('sets value correctly', () => {
        const form = new FormModel<{ name?: string }>();
        expect(form.getFields()).toStrictEqual({});
        expect(form.getField('name')).toStrictEqual(undefined);

        form.__setFields({ name: 'Hello World' });

        expect(form.getFields()).toStrictEqual({ name: 'Hello World' });
        expect(form.getField('name')).toStrictEqual('Hello World');
      });
    });
    it('"subscribe" subscribes only for a specific field correctly', () => {
      const subscriber = jest.fn();
      const form = new FormModel<{ name?: string; surname?: string }>();

      form.__onFieldChange('name', subscriber);

      form.__setField('name', 'Hello');

      expect(subscriber).toHaveBeenCalledTimes(1);

      form.__setField('surname', 'World');

      expect(subscriber).toHaveBeenCalledTimes(1);
    });
    it('executes "onChange" callback correctly', () => {
      const onChange = jest.fn();

      const form = new FormModel<{ name?: string; surname?: string; age?: number }>({
        onChange,
      });

      form.__setField('name', 'Hello');

      expect(onChange).toHaveBeenLastCalledWith({ name: 'Hello' }, { name: 'Hello' });

      form.__setField('surname', 'World');

      expect(onChange).toHaveBeenLastCalledWith(
        { surname: 'World' },
        { name: 'Hello', surname: 'World' },
      );

      form.__setField('name', undefined);

      expect(onChange).toHaveBeenLastCalledWith(
        { name: undefined },
        { name: undefined, surname: 'World' },
      );
    });
    describe('"requires"', () => {
      it('demands required field to exist', async () => {
        const Component = () => {
          const form = useForm({ defaultValues: { name: '', surname: '' } });

          return (
            <Form form={form}>
              <Form.Field name='name' getValueFromEvent={e => e.target.value}>
                <input data-testid='input_1' type='text' />
              </Form.Field>
              <Form.Field
                requires={['name']}
                name='surname'
                getValueFromEvent={e => e.target.value}
              >
                <input data-testid='input_2' type='text' />
              </Form.Field>
            </Form>
          );
        };

        const renderer = render(<Component />);

        expect(renderer.getByTestId('input_1')).not.toBeDisabled();
        expect(renderer.getByTestId('input_2')).toBeDisabled();

        act(() => {
          fireEvent.change(renderer.getByTestId('input_1'), {
            target: { value: 'Hello' },
          });
        });

        await waitFor(() => {
          expect(renderer.getByTestId('input_1')).not.toBeDisabled();
          expect(renderer.getByTestId('input_2')).not.toBeDisabled();
        });
      });
    });
  });
  describe('deep state', () => {
    describe('"setValue"', () => {
      it('sets value correctly', () => {
        const form = new FormModel<{ person?: { name?: string; surname?: string } }>();
        expect(form.getFields()).toStrictEqual({});
        expect(form.getField(['person', 'name'])).toStrictEqual(undefined);

        form.__setField(['person', 'name'], 'Hello World');

        expect(form.getFields()).toStrictEqual({ person: { name: 'Hello World' } });
        expect(form.getField(['person', 'name'])).toStrictEqual('Hello World');
      });
    });
    describe('"setValues"', () => {
      it('sets value correctly', () => {
        const form = new FormModel<{ person?: { name?: string; surname?: string } }>();
        expect(form.getFields()).toStrictEqual({});
        expect(form.getField(['person', 'name'])).toStrictEqual(undefined);

        form.__setFields({ person: { name: 'Hello World' } });

        expect(form.getFields()).toStrictEqual({ person: { name: 'Hello World' } });
        expect(form.getField(['person', 'name'])).toStrictEqual('Hello World');
      });
    });
    it('"subscribe" subscribes only for a specific field correctly', () => {
      const subscriber = jest.fn();
      const form = new FormModel<{ person: { name?: string; surname?: string } }>();

      form.__onFieldChange(['person', 'name'], subscriber);

      form.__setField(['person', 'name'], 'Hello');

      expect(subscriber).toHaveBeenCalledTimes(1);

      form.__setField(['person', 'surname'], 'World');

      expect(subscriber).toHaveBeenCalledTimes(1);
    });
    it('executes "onChange" callback correctly', () => {
      const onChange = jest.fn();

      const form = new FormModel<{
        person: { name?: string; surname?: string; age?: number };
      }>({
        onChange,
      });

      form.__setField(['person', 'name'], 'Hello');

      expect(onChange).toHaveBeenLastCalledWith(
        { person: { name: 'Hello' } },
        { person: { name: 'Hello' } },
      );

      form.__setField(['person', 'surname'], 'World');

      expect(onChange).toHaveBeenLastCalledWith(
        { person: { surname: 'World' } },
        { person: { name: 'Hello', surname: 'World' } },
      );

      form.__setField(['person', 'name'], undefined);

      expect(onChange).toHaveBeenLastCalledWith(
        { person: { name: undefined } },
        { person: { name: undefined, surname: 'World' } },
      );
    });
  });
});

import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { Checkbox, Input, Radio, Select } from '@rovna-ui/components/primitives';
import { UploadArea } from '@rovna-ui/upload';

import { useForm } from '@rovna-internal/form/hooks';

import { Form } from './Form';

describe('"Form"', () => {
  it('associates labels and omits unsupported group aria-required', () => {
    const Component = () => {
      const form = useForm({
        defaultValues: { files: [], name: '', materials: [], payment: '', role: '' },
      });

      return (
        <Form form={form}>
          <Form.Field
            label='Имя'
            name='name'
            rules={[{ required: true, message: 'Укажите имя' }]}
          >
            <Input />
          </Form.Field>
          <Form.Field
            label='Материалы'
            name='materials'
            rules={[{ required: true, message: 'Выберите материалы' }]}
          >
            <Checkbox.Group options={['Камень', 'Металл']} />
          </Form.Field>
          <Form.Field
            label='Роль'
            name='role'
            rules={[{ required: true, message: 'Выберите роль' }]}
          >
            <Select options={[{ label: 'Разработчик', value: 'developer' }]} />
          </Form.Field>
          <Form.Field
            label='Способ оплаты'
            name='payment'
            rules={[{ required: true, message: 'Выберите способ оплаты' }]}
          >
            <Radio.Group options={['Картой', 'Наличными']} />
          </Form.Field>
          <Form.Field
            label='Файлы'
            name='files'
            rules={[{ required: true, message: 'Добавьте файл' }]}
          >
            <UploadArea />
          </Form.Field>
        </Form>
      );
    };

    const renderer = render(<Component />);
    const checkboxGroup = renderer.container.querySelector('[id="materials"]');
    const radioGroup = renderer.container.querySelector('[id="payment"]');
    const uploadArea = renderer.container.querySelector('.rovna-ui-upload-drop-area');

    expect(renderer.getByLabelText('Имя')).toHaveAttribute('aria-required', 'true');
    expect(renderer.getByLabelText('Роль')).not.toHaveAttribute('aria-required');
    expect(checkboxGroup).not.toBeNull();
    expect(checkboxGroup).not.toHaveAttribute('aria-required');
    expect(radioGroup).not.toBeNull();
    expect(radioGroup).not.toHaveAttribute('aria-required');
    expect(uploadArea).not.toBeNull();
    expect(uploadArea).not.toHaveAttribute('aria-required');
  });

  it('uses the Russian field label as the accessible name in headless mode', () => {
    const Component = () => {
      const form = useForm({ defaultValues: { name: '' } });

      return (
        <Form headless form={form}>
          <Form.Field label='Имя' name='name'>
            <Input />
          </Form.Field>
        </Form>
      );
    };

    const renderer = render(<Component />);

    expect(renderer.getByRole('textbox', { name: 'Имя' })).toHaveAttribute('id', 'name');
  });

  it('executes "onChange" callback correctly', async () => {
    const onChange = jest.fn();

    const Component = () => {
      const form = useForm({
        defaultValues: { name: '', surname: '', age: '', gender: '' },
        onChange,
      });

      return (
        <Form form={form}>
          <Form.Field name='name'>
            <Input data-testid='input_1' type='text' />
          </Form.Field>
          <Form.Field name='surname'>
            <Input data-testid='input_2' type='text' />
          </Form.Field>
          <Form.Field name='age'>
            <Input data-testid='input_3' type='text' />
          </Form.Field>
          <Form.Field name='gender'>
            <Select
              data-testid='select_1'
              options={[
                { value: 'male', label: 'Мужчина' },
                { value: 'female', label: 'Женщина' },
              ]}
            />
          </Form.Field>
        </Form>
      );
    };

    const renderer = render(<Component />);

    expect(renderer.getByTestId('input_1')).not.toBeDisabled();
    expect(renderer.getByTestId('input_2')).not.toBeDisabled();
    expect(renderer.getByTestId('input_3')).not.toBeDisabled();
    expect(renderer.getByTestId('select_1')).not.toBeDisabled();
    expect(onChange).not.toHaveBeenLastCalledWith();

    act(() => {
      fireEvent.change(renderer.getByTestId('input_1'), {
        target: { value: 'Hello' },
      });
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(
        { name: 'Hello' },
        { name: 'Hello', surname: '', age: '', gender: '' },
      );
    });

    act(() => {
      fireEvent.change(renderer.getByTestId('input_2'), {
        target: { value: 'World' },
      });
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(
        { surname: 'World' },
        { name: 'Hello', surname: 'World', age: '', gender: '' },
      );
    });

    act(() => {
      fireEvent.change(renderer.getByTestId('input_3'), {
        target: { value: '16' },
      });
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(
        { age: '16' },
        { name: 'Hello', surname: 'World', age: '16', gender: '' },
      );
    });

    act(() => {
      fireEvent.click(renderer.getByTestId('rovna-ui-chevron-down-icon'));
    });

    await waitFor(async () => {
      expect(renderer.queryByText(/Мужчина/)).toBeInTheDocument();
      expect(renderer.queryByText(/Женщина/)).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(renderer.getByText(/Мужчина/));
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(
        { gender: 'male' },
        { name: 'Hello', surname: 'World', age: '16', gender: 'male' },
      );
    });
  });
  describe('with given "requires"', () => {
    it('demands required field to be filled', async () => {
      const onChange = jest.fn();

      const Component = () => {
        const form = useForm({
          defaultValues: { person: { name: '', surname: '' }, age: '' },
          onChange,
        });

        return (
          <Form form={form}>
            <Form.Field name={['person', 'name']}>
              <Input data-testid='input_1' type='text' />
            </Form.Field>
            <Form.Field requires={[['person', 'name']]} name={['person', 'surname']}>
              <Input data-testid='input_2' type='text' />
            </Form.Field>
            <Form.Field
              requires={[
                ['person', 'name'],
                ['person', 'surname'],
              ]}
              name='age'
              getValueFromEvent={e => Number(e.target.value)}
            >
              <Input data-testid='input_3' type='text' />
            </Form.Field>
          </Form>
        );
      };

      const renderer = render(<Component />);

      expect(renderer.getByTestId('input_1')).not.toBeDisabled();
      expect(renderer.getByTestId('input_2')).toBeDisabled();
      expect(renderer.getByTestId('input_3')).toBeDisabled();

      act(() => {
        fireEvent.change(renderer.getByTestId('input_1'), {
          target: { value: 'Hello' },
        });
      });

      await waitFor(() => {
        expect(renderer.getByTestId('input_1')).not.toBeDisabled();
        expect(renderer.getByTestId('input_2')).not.toBeDisabled();
        expect(renderer.getByTestId('input_3')).toBeDisabled();
      });

      act(() => {
        fireEvent.change(renderer.getByTestId('input_2'), {
          target: { value: 'World' },
        });
      });

      await waitFor(() => {
        expect(renderer.getByTestId('input_1')).not.toBeDisabled();
        expect(renderer.getByTestId('input_2')).not.toBeDisabled();
        expect(renderer.getByTestId('input_3')).not.toBeDisabled();
      });

      act(() => {
        fireEvent.change(renderer.getByTestId('input_3'), {
          target: { value: '16' },
        });
      });

      await waitFor(() => {
        expect(onChange).toHaveBeenLastCalledWith(
          { age: 16 },
          {
            age: 16,
            person: {
              name: 'Hello',
              surname: 'World',
            },
          },
        );
      });
    });
  });
  describe('"getValueFromEvent"', () => {
    it('transforms value correctly', async () => {
      const onChange = jest.fn();

      const Component = () => {
        const form = useForm({
          onChange,
          defaultValues: {
            name: '',
            age: '',
          },
        });

        return (
          <Form form={form}>
            <Form.Field name='name' getValueFromEvent={e => `${e.target.value}!`}>
              <Input data-testid='input_1' type='text' />
            </Form.Field>
            <Form.Field name='age' getValueFromEvent={e => Number(e.target.value)}>
              <Input data-testid='input_2' type='text' />
            </Form.Field>
          </Form>
        );
      };

      const renderer = render(<Component />);

      expect(renderer.getByTestId('input_1')).not.toBeDisabled();
      expect(renderer.getByTestId('input_2')).not.toBeDisabled();
      expect(onChange).not.toHaveBeenLastCalledWith();

      act(() => {
        fireEvent.change(renderer.getByTestId('input_1'), {
          target: { value: 'Hello World' },
        });
      });

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(
          { name: 'Hello World!' },
          { name: 'Hello World!', age: '' },
        );
      });

      act(() => {
        fireEvent.change(renderer.getByTestId('input_2'), {
          target: { value: '16' },
        });
      });

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(
          { age: 16 },
          { name: 'Hello World!', age: 16 },
        );
      });
    });
  });
  describe('"normalize"', () => {
    it('transforms value correctly', async () => {
      const onChange = jest.fn();

      const Component = () => {
        const form = useForm({
          values: {
            name: 'John Smith',
            age: '16',
          },
          onChange,
        });

        return (
          <Form form={form}>
            <Form.Field name='name' normalize={value => `${value} is name!`}>
              <Input data-testid='input_1' type='text' />
            </Form.Field>
            <Form.Field name='age' normalize={value => `${value} is number!`}>
              <Input data-testid='input_2' type='text' />
            </Form.Field>
          </Form>
        );
      };

      const renderer = render(<Component />);

      expect(renderer.getByDisplayValue(/John Smith is name!/)).toBeInTheDocument();
      expect(renderer.getByDisplayValue(/16 is number!/)).toBeInTheDocument();
      expect(onChange).not.toHaveBeenLastCalledWith();
    });
  });
});

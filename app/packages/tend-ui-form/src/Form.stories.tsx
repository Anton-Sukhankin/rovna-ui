import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import {
  Checkbox,
  DatePicker,
  Input,
  Radio,
  RangePicker,
  Select,
  TextArea,
  Toggle,
} from '@rovna-ui/components/primitives';
import { Button, RangeInput } from '@rovna-ui/primitives';
import { UploadArea } from '@rovna-ui/upload';

import { Form } from './components';
import { useForm, useWatch } from './hooks';

const onFormSubmit = action('Form submitted');

const meta: Meta<typeof Form> = {
  title: 'Rovna UI/Form/Form',
  component: Form,
};

const options = [
  { label: 'Подрядчик', value: '1' },
  { label: 'ЗДС', value: '2' },
  { label: 'Поставщик', value: '3' },
  { label: 'ТехНадзор', value: '4' },
  { label: 'Руководитель рембригады', value: '5' },
];

const fields = [
  { name: "Название", label: 'Имя', node: <Input placeholder='Введите имя' /> },
  { name: 'fathername', node: <Checkbox>Нет отчества</Checkbox> },
  {
    name: 'role',
    label: 'Роль',
    node: <Select placeholder='Выберите свою роль' options={options} />,
  },
  {
    name: 'comment',
    label: 'Комментарий',
    node: <TextArea placeholder='Введите комментарий' />,
  },
  {
    name: 'material',
    label: 'Материал',
    node: <Checkbox.Group layout='vertical' options={['Дерево', 'Металл', 'Цемент']} />,
  },
  {
    name: 'date',
    label: 'Дата доставка',
    node: <DatePicker />,
  },
  {
    name: 'range-date',
    label: 'Период доставки',
    node: <RangePicker />,
  },
  {
    name: 'price',
    label: 'Цена',
    node: <RangeInput placeholder={['Цена от', 'Цена до']} />,
  },
  {
    name: 'payment',
    label: 'Способ оплаты',
    node: <Radio.Group layout='vertical' options={['Картой', 'Наличными', 'СПБ']} />,
  },
  {
    name: 'theme',
    label: 'Тема',
    node: (
      <Toggle.Group layout='vertical'>
        <Toggle>Темная тема</Toggle>
        <Toggle>Светлая тема</Toggle>
      </Toggle.Group>
    ),
  },
  { name: 'files', label: 'Файлы', node: <UploadArea /> },
] as const;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Введите имя');
    await userEvent.type(input, 'Тест');
    await expect(input).toHaveValue('Тест');
    await userEvent.click(canvas.getByRole('button', { name: 'Продолжить' }));
  },
  render: _args => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const form = useForm({
      onSubmit: state => {
        onFormSubmit(state);
      },
      onChange: state => {
        console.log('[Default][onChange]', state);
      },
    });
    const values = useWatch(form, s => s);
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <Form form={form}>
        {fields.map(field => (
          <Form.Field key={field.name} name={field.name} label={field.label}>
            {field.node}
          </Form.Field>
        ))}
        <Button type='submit'>Продолжить</Button>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Form>
    );
  },
};

export const DefaultValues: Story = {
  render: _args => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const form = useForm({
      defaultValues: {
        name: 'John',
        surname: 'Snow',
      },
      onSubmit: state => {
        onFormSubmit(state);
      },
      onChange: state => {
        console.log('[DefaultValues][onChange]', state);
      },
    });
    const values = useWatch(form, s => s);
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <Form form={form}>
        {fields.map(field => (
          <Form.Field key={field.name} name={field.name} label={field.label}>
            {field.node}
          </Form.Field>
        ))}
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Form>
    );
  },
};

export const KeyboardAccessibility: Story = {
  render: () => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const form = useForm({ defaultValues: { confirmation: false } });
    const checked = useWatch(form, 'confirmation');
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <Form form={form}>
        <Form.Field name='confirmation' valuePropName='checked'>
          <Checkbox>Подтвердить выбор</Checkbox>
        </Form.Field>
        <output aria-live='polite'>{checked ? 'Выбор подтвержден' : 'Выбор не подтвержден'}</output>
      </Form>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', { name: 'Подтвердить выбор' });

    checkbox.focus();
    await userEvent.keyboard(' ');
    await expect(checkbox).toBeChecked();
    await expect(canvas.getByText('Выбор подтвержден')).toBeVisible();
  },
};

export const Rules: Story = {
  render: _args => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const form = useForm({
      onSubmit: state => {
        onFormSubmit(state);
      },
      onChange: state => {
        console.log('[Rule][onChange]', state);
      },
    });
    const values = useWatch(form, s => s);
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <Form form={form}>
        {fields.map(field => (
          <Form.Field
            rules={[{ required: true, message: 'Поле обязательно для заполнения' }]}
            key={field.name}
            name={field.name}
            label={field.label}
          >
            {field.node}
          </Form.Field>
        ))}
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Form>
    );
  },
};

export const MultipleRules: Story = {
  render: _args => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const form = useForm({
      onSubmit: state => {
        onFormSubmit(state);
      },
      onChange: state => {
        console.log('[Requires][onChange]', state);
      },
    });
    const values = useWatch(form, s => s);
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <Form form={form}>
        {fields.map(field => (
          <Form.Field
            rules={[
              {
                required: true,
                message: 'Поле обязательно для заполнения',
              },
              {
                min: 5,
                message: 'Поле должно содержать минимум 5 символов',
              },
              {
                pattern: /^\d+$/,
                message: 'Поле должно содержать только цифры',
              },
            ]}
            key={field.name}
            name={field.name}
            label={field.label}
          >
            {field.node}
          </Form.Field>
        ))}
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Form>
    );
  },
};

export const Controlled: Story = {
  render: _args => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const [values, setValues] = React.useState({});
    const form = useForm({
      values,
      onSubmit: state => {
        onFormSubmit(state);
      },
      onChange: state => {
        console.log('[Controlled][onChange]', state);
        setValues(state);
      },
    });
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <Form form={form}>
        <Button
          onClick={() => {
            setValues({ name: 'Will', surname: 'Smith' });
          }}
        >
          Заполнить форму
        </Button>
        {fields.map(field => (
          <Form.Field key={field.name} name={field.name} label={field.label}>
            {field.node}
          </Form.Field>
        ))}
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Form>
    );
  },
};

export const Nested: Story = {
  render: _args => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const form = useForm({
      onSubmit: state => {
        onFormSubmit(state);
      },
      onChange: state => {
        console.log('[Nested][onChange]', state);
      },
    });
    const values = useWatch(form, state => state);
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <Form form={form}>
        <Form.Field label='Имя' name={['person', "Название"]}>
          <Input />
        </Form.Field>
        <Form.Field label='Фамилия' name={['person', 'surname']}>
          <Input />
        </Form.Field>
        <Form.Field label='Комментарий' name={["Описание", 'comment']}>
          <TextArea />
        </Form.Field>
        <Form.Field label='Род деятельности' name={["Описание", "Должность"]}>
          <Checkbox.Group
            layout='vertical'
            options={['Инфраструктура', 'Фронтенд', 'Бэкенд']}
          />
        </Form.Field>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Form>
    );
  },
};

export const Normalize: Story = {
  render: _args => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const form = useForm({
      onSubmit: state => {
        onFormSubmit(state);
      },
      onChange: state => {
        console.log('[Default][onChange]', state);
      },
    });
    const values = useWatch(form, s => s);
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <Form form={form}>
        <Form.Field label='Имя' name="Название" normalize={payload => `!${payload}!`}>
          <Input />
        </Form.Field>
        <Form.Field label='Фамилия' name='surname' normalize={payload => `${payload}!`}>
          <Input />
        </Form.Field>
        <Form.Field
          label='Комментарий'
          name='comment'
          normalize={payload => `${payload}!`}
        >
          <TextArea />
        </Form.Field>
        <Form.Field label='Род деятельности' name="Должность">
          <Checkbox.Group
            layout='vertical'
            options={['Инфраструктура', 'Фронтенд', 'Бэкенд']}
          />
        </Form.Field>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Form>
    );
  },
};

export const Requires: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textboxes = canvas.getAllByRole('textbox');
    await expect(textboxes[0]).toBeEnabled();
    await expect(textboxes[1]).toBeDisabled();
    await userEvent.type(textboxes[0], 'Анна');
    await waitFor(() => expect(textboxes[1]).toBeEnabled());
  },
  render: _args => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const form = useForm({
      onSubmit: state => {
        onFormSubmit(state);
      },
      onChange: state => {
        console.log('[Requires][onChange]', state);
      },
    });
    const values = useWatch(form, s => s);
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <Form form={form}>
        <Form.Field
          label='Имя'
          rules={[
            {
              required: true,
              message: 'Поле обязательно для заполнения',
            },
          ]}
          name="Название"
        >
          <Input />
        </Form.Field>
        <Form.Field
          requires={["Название"]}
          label='Фамилия'
          rules={[
            {
              required: true,
              message: 'Поле обязательно для заполнения',
            },
          ]}
          name='surname'
        >
          <Input />
        </Form.Field>
        <Form.Field
          requires={['surname']}
          label='Комментарий'
          rules={[
            {
              required: true,
              message: 'Поле обязательно для заполнения',
            },
          ]}
          name='comment'
        >
          <TextArea />
        </Form.Field>
        <Form.Field
          requires={['comment']}
          label='Род деятельности'
          rules={[
            {
              required: true,
              message: 'Поле обязательно для заполнения',
            },
          ]}
          name="Должность"
        >
          <Checkbox.Group
            layout='vertical'
            options={['Инфраструктура', 'Фронтенд', 'Бэкенд']}
          />
        </Form.Field>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Form>
    );
  },
};

export const Validator: Story = {
  render: _args => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const form = useForm({
      onSubmit: state => {
        onFormSubmit(state);
      },
      onChange: state => {
        console.log('[Validator][onChange]', state);
      },
    });
    const values = useWatch(form, s => s);
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <Form form={form}>
        <Form.Field
          label='Имя'
          rules={[
            {
              message: 'Кастомная ошибка',
              validator: _value => {
                return Promise.reject();
              },
            },
          ]}
          name="Название"
        >
          <Input />
        </Form.Field>
        <Form.Field label='Фамилия' name='surname'>
          <Input />
        </Form.Field>
        <Form.Field label='Комментарий' name='comment'>
          <TextArea />
        </Form.Field>
        <Form.Field label='Род деятельности' name="Должность">
          <Checkbox.Group
            layout='vertical'
            options={['Инфраструктура', 'Фронтенд', 'Бэкенд']}
          />
        </Form.Field>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Form>
    );
  },
};

export const GetMessageRender: Story = {
  render: _args => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const form = useForm({
      onSubmit: state => {
        onFormSubmit(state);
      },
      onChange: state => {
        console.log('[Default][onChange]', state);
      },
    });
    const values = useWatch(form, ["Название", 'surname', 'comment', "Должность"]);
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <Form form={form}>
        <Form.Field
          getMessageRender={message => `${message} + кастомный текст`}
          label='Имя'
          name="Название"
          rules={[
            {
              required: true,
              message: 'Поле обязательно для заполнения',
            },
          ]}
        >
          <Input />
        </Form.Field>
        <Form.Field
          getMessageRender={message => `${message} + кастомный текст`}
          label='Фамилия'
          name='surname'
          rules={[
            {
              required: true,
              message: 'Поле обязательно для заполнения',
            },
          ]}
        >
          <Input />
        </Form.Field>
        <Form.Field
          getMessageRender={message => `${message} + кастомный текст`}
          label='Комментарий'
          name='comment'
          rules={[
            {
              required: true,
              message: 'Поле обязательно для заполнения',
            },
          ]}
        >
          <TextArea />
        </Form.Field>
        <Form.Field
          getMessageRender={message => `${message} + кастомный текст`}
          name="Должность"
          rules={[
            {
              required: true,
              message: 'Поле обязательно для заполнения',
            },
          ]}
        >
          <Checkbox.Group
            layout='vertical'
            options={['Инфраструктура', 'Фронтенд', 'Бэкенд']}
          />
        </Form.Field>
        {JSON.stringify(values, null, 2)}
      </Form>
    );
  },
};

export const Tooltip: Story = {
  render: _args => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const form = useForm({
      onSubmit: state => {
        onFormSubmit(state);
      },
      onChange: state => {
        console.log('[Default][onChange]', state);
      },
    });
    const values = useWatch(form, s => s);
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <Form form={form}>
        <Form.Field tooltip={{ title: 'Имя' }} label='Имя' name="Название">
          <Input />
        </Form.Field>
        <Form.Field tooltip={{ title: 'Фамилия' }} label='Фамилия' name='surname'>
          <Input />
        </Form.Field>
        <Form.Field tooltip={{ title: 'Комментарий' }} label='Комментарий' name='comment'>
          <TextArea />
        </Form.Field>
        <Form.Field tooltip={{ title: 'Род деятельности' }} name="Должность">
          <Checkbox.Group
            layout='vertical'
            options={['Инфраструктура', 'Фронтенд', 'Бэкенд']}
          />
        </Form.Field>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Form>
    );
  },
};

export const Headless: Story = {
  render: _args => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const form = useForm({
      onSubmit: state => {
        onFormSubmit(state);
      },
      onChange: state => {
        console.log('[Default][onChange]', state);
      },
    });
    const values = useWatch(form, s => s);
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <Form headless form={form}>
        <Form.Field label='Имя' name="Название">
          <Input />
        </Form.Field>
        <Form.Field label='Фамилия' name='surname'>
          <Input />
        </Form.Field>
        <Form.Field label='Комментарий' name='comment'>
          <TextArea />
        </Form.Field>
        <Form.Field name="Должность">
          <Checkbox.Group
            layout='vertical'
            options={['Инфраструктура', 'Фронтенд', 'Бэкенд']}
          />
        </Form.Field>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Form>
    );
  },
};

const CustomInput = ({
  state,
  onValueChange,
  ...props
}: {
  state?: string;
  onValueChange?: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>) => {
  return <input {...props} value={state} onChange={e => onValueChange?.(e.target.value)} />;
};

export const ValuePropNameAndHandlerPropName: Story = {
  render: _args => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const form = useForm({
      onSubmit: state => {
        onFormSubmit(state);
      },
      onChange: state => {
        console.log('[ValuePropNameAndHandlerPropName][onChange]', state);
      },
    });
    const values = useWatch(form, s => s);
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <Form form={form}>
        <Form.Field
          handlerPropName='onValueChange'
          valuePropName='state'
          name="Название"
          label='Имя'
        >
          <CustomInput />
        </Form.Field>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Form>
    );
  },
};

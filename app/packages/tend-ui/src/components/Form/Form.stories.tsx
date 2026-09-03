import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { AccountBox, BrickFence, Building4, Building6, Clock } from '@rovna-ui/icons';
import { UploadArea } from '@rovna-ui/upload';
import { RangeInput } from '@rovna-ui/primitives';

import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Radio,
  RangePicker,
  Select,
  TextArea,
  Toggle,
} from '@rovna-ui/components/primitives';

import * as InputStories from '../../../../tend-ui-primitives/src/Input/Input.stories';
import { Form } from './Form';

const meta: Meta<typeof Form> = {
  title: 'Rovna UI/Main/Components/Form',
  component: Form,
  argTypes: {
    layout: {
      options: ['vertical', 'horizontal'],
      control: { type: 'select' },
    },
    size: {
      options: ['large', 'small', 'medium'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Введите имя');
    await userEvent.type(input, 'Анна');
    await expect(input).toHaveValue('Анна');
  },
  render: args => {
    return (
      <Form {...args}>
        {fields.map(field => (
          <Form.Item key={field.name} label={field.label} name={field.name}>
            {field.node}
          </Form.Item>
        ))}
      </Form>
    );
  },
};

export const Required: Story = {
  render: args => {
    return (
      <Form {...args}>
        {fields.map(field => (
          <Form.Item key={field.name} required label={field.label} name={field.name}>
            {field.node}
          </Form.Item>
        ))}
      </Form>
    );
  },
};

export const Disabled: Story = {
  render: args => {
    return (
      <Form {...args}>
        {fields.map(field => (
          <Form.Item key={field.name} label={field.label} name={field.name}>
            {field.node}
          </Form.Item>
        ))}
      </Form>
    );
  },
};

export const Error: Story = {
  render: args => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const [form] = Form.useForm();

    React.useEffect(() => {
      form.validateFields();
    }, [form]);
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <Form {...args}>
        {fields.map(field => (
          <Form.Item
            key={field.name}
            rules={[{ required: true, message: 'Поле обязательно для заполнения' }]}
            label={field.label}
            name={field.name}
          >
            {field.node}
          </Form.Item>
        ))}
      </Form>
    );
  },
};

export const Tooltip: Story = {
  render: args => {
    return (
      <Form {...args}>
        <Form.Item
          label='Имя'
          name='role'
          tooltip={{
            title: 'Поле для ввода имени. Сюда вы можете ввести ваше имя',
          }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Фамилия'
          name='surname'
          tooltip={{
            title: 'Поле для ввода фамилии. Сюда вы можете ввести ваше Фамилия',
          }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Роль'
          name="Название"
          tooltip={{
            title: 'Поле для выбора роли. Тут вы можете выбрать роль',
          }}
        >
          <Select options={options} />
        </Form.Item>
        <Form.Item
          tooltip={{
            title: 'Поле для ввода комментария. Опишите здесь вашу проблему',
          }}
          name='comment'
          label='Комментарий'
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          label='Материалы'
          tooltip={{
            title: 'Отметьте нужные материалы',
          }}
          name='remember'
          valuePropName='checked'
        >
          <Checkbox value='A'>Растворы</Checkbox>
          <Checkbox value='B'>Цемент</Checkbox>
          <Checkbox value='C'>Камень</Checkbox>
        </Form.Item>
        <Form.Item
          tooltip={{ title: 'Выберите темизацию' }}
          label='Темизация'
          name='dark-theme'
          valuePropName='checked'
        >
          <Toggle>Темная тема</Toggle>
        </Form.Item>
        <Form.Item>
          <Button type='submit'>Далее</Button>
        </Form.Item>
      </Form>
    );
  },
};

const hint = {
  title: 'Изображение человека',
  icon: <AccountBox />,
};
const hint_2 = {
  title: 'Стена ',
  icon: <BrickFence />,
};
const hint_3 = {
  title: 'Часы',
  icon: <Clock />,
};
const hint_4 = {
  title: 'Дом',
  icon: <Building6 />,
};
const hint_5 = {
  title: 'Дом',
  icon: <Building4 />,
};

export const Customization: Story = {
  render: args => {
    return (
      <Form {...args} gap={32}>
        <Form.Item label='Имя' name="Название" tooltip={hint}>
          <Input {...InputStories.Customization.args} />
        </Form.Item>

        <Form.Item tooltip={hint_2} label='Фамилия' name='surname'>
          <Input {...InputStories.Customization.args} />
        </Form.Item>
        <Form.Item tooltip={hint_3} name='comment' label='Комментарий'>
          <TextArea placeholder='Пиши-сокращай' maxLength={150} showCount />
        </Form.Item>
        <Form.Item
          tooltip={hint_4}
          label='Материалы'
          name='remember'
          valuePropName='checked'
        >
          <Checkbox value='A'>Растворы</Checkbox>
          <Checkbox value='B'>Цемент</Checkbox>
          <Checkbox value='C'>Камень</Checkbox>
        </Form.Item>
        <Form.Item
          tooltip={hint_5}
          label='Темизация'
          name='dark-theme'
          valuePropName='checked'
        >
          <Toggle>Темная тема</Toggle>
        </Form.Item>
        <Form.Item>
          <Button type='submit'>Далее</Button>
        </Form.Item>
      </Form>
    );
  },
};

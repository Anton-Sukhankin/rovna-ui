import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { AccountBox, BrickFence } from '@rovna-ui/icons';
import { Help as HelpIcon } from '@rovna-ui/icons/Help';
import { Button, Checkbox, Input, TextArea, Toggle } from '@rovna-ui/components/primitives';

import { Tooltip } from '@rovna-ui/primitives/Tooltip';

import { Radio } from '../../../tend-ui/src/primitives/Radio';
import * as InputStories from '../Input/Input.stories';
import { Form } from './Form';

const meta: Meta<typeof Form> = {
  title: 'Rovna UI/Primitives/Form',
  component: Form,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const contractor = canvas.getByRole('textbox', { name: 'Подрядчик' });
    await userEvent.type(contractor, 'ООО СтройПроект');
    await expect(contractor).toHaveValue('ООО СтройПроект');
    const material = canvas.getByRole('checkbox', { name: 'Дерево' });
    await userEvent.click(material);
    await expect(material).toBeChecked();
  },
  args: {
    gap: 16,
  },
  render: _args => {
    return (
      <Form>
        <Form.Field>
          <Form.Label>Подрядчик</Form.Label>
          <Input aria-label='Подрядчик' />
        </Form.Field>
        <Form.Field>
          <Form.Label>Поставщик</Form.Label>
          <Input aria-label='Поставщик' />
        </Form.Field>
        <Form.Field>
          <Form.Label>Комментарий</Form.Label>
          <TextArea aria-label='Комментарий' />
        </Form.Field>
        <Form.Field>
          <Form.Label>Материалы</Form.Label>
          <Checkbox.Group layout='vertical' options={['Дерево', 'Металл', 'Цемент']} />
        </Form.Field>
        <Form.Field>
          <Form.Label>Темизация</Form.Label>
          <Toggle.Group layout='vertical'>
            <Toggle>Темная тема</Toggle>
            <Toggle>Светлая тема</Toggle>
          </Toggle.Group>
        </Form.Field>
        <Form.Field>
          <Form.Label>Оплата</Form.Label>
          <Radio.Group layout='vertical' options={['Картой', 'Наличными', 'СПБ']} />
        </Form.Field>
        <Form.Field>
          <Button>Далее</Button>
        </Form.Field>
      </Form>
    );
  },
};

export const Required: Story = {
  args: {
    gap: 16,
  },
  render: _args => {
    return (
      <Form>
        <Form.Field>
          <Form.Label htmlFor='required-contractor' required>Подрядчик</Form.Label>
          <Input id='required-contractor' />
        </Form.Field>
        <Form.Field>
          <Form.Label htmlFor='required-provider' required>Поставщик</Form.Label>
          <Input id='required-provider' />
        </Form.Field>
        <Form.Field>
          <Button>Далее</Button>
        </Form.Field>
      </Form>
    );
  },
};

export const Error: Story = {
  args: {
    gap: 16,
  },
  render: _args => {
    return (
      <Form>
        <Form.Field status='error'>
          <Form.Label htmlFor='error-contractor'>Подрядчик</Form.Label>
          <Input id='error-contractor' status='error' />
          <Form.Message>Сообщение об ошибке</Form.Message>
        </Form.Field>
        <Form.Field status='error'>
          <Form.Label htmlFor='error-provider'>Поставщик</Form.Label>
          <Input id='error-provider' status='error' />
          <Form.Message>Сообщение об ошибке</Form.Message>
        </Form.Field>
        <Form.Field status='error'>
          <Button>Далее</Button>
        </Form.Field>
      </Form>
    );
  },
};

export const Warning: Story = {
  args: {
    gap: 16,
  },
  render: _args => {
    return (
      <Form>
        <Form.Field status='warning'>
          <Form.Label htmlFor='warning-contractor'>Подрядчик</Form.Label>
          <Input id='warning-contractor' status='warning' />
          <Form.Message>Сообщение о предупреждении</Form.Message>
        </Form.Field>
        <Form.Field status='warning'>
          <Form.Label htmlFor='warning-provider'>Поставщик</Form.Label>
          <Input id='warning-provider' status='warning' />
          <Form.Message>Сообщение о предупреждении</Form.Message>
        </Form.Field>
        <Form.Field status='warning'>
          <Button>Далее</Button>
        </Form.Field>
      </Form>
    );
  },
};

export const Help: Story = {
  args: {
    gap: 16,
  },
  render: _args => {
    return (
      <Form>
        <Form.Field>
          <Form.Label htmlFor='help-contractor'>Подрядчик</Form.Label>
          <Input id='help-contractor' />
          <Form.Help>Сообщение-подсказка</Form.Help>
        </Form.Field>
        <Form.Field>
          <Form.Label htmlFor='help-provider'>Поставщик</Form.Label>
          <Input id='help-provider' />
          <Form.Help>Сообщение-подсказка</Form.Help>
        </Form.Field>
        <Form.Field>
          <Button>Далее</Button>
        </Form.Field>
      </Form>
    );
  },
};

export const ErrorWithHelp: Story = {
  args: {
    gap: 16,
  },
  render: _args => {
    return (
      <Form>
        <Form.Field>
          <Form.Label htmlFor='error-help-contractor'>Подрядчик</Form.Label>
          <Input id='error-help-contractor' status='error' />
          <Form.Message>Сообщение об ошибке</Form.Message>
          <Form.Help>Сообщение-подсказка</Form.Help>
        </Form.Field>
        <Form.Field>
          <Form.Label htmlFor='error-help-provider'>Поставщик</Form.Label>
          <Input id='error-help-provider' status='error' />
          <Form.Message>Сообщение об ошибке</Form.Message>
          <Form.Help>Сообщение-подсказка</Form.Help>
        </Form.Field>
        <Form.Field>
          <Button>Далее</Button>
        </Form.Field>
      </Form>
    );
  },
};

export const Hinting: Story = {
  args: {
    gap: 16,
  },
  render: _args => {
    return (
      <Form>
        <Form.Field>
          <Form.Label htmlFor='hint-contractor'>
            Подрядчик
            <Tooltip title='Подсказка'>
              <HelpIcon />
            </Tooltip>
          </Form.Label>
          <Input id='hint-contractor' />
        </Form.Field>
        <Form.Field>
          <Form.Label htmlFor='hint-provider'>
            Поставщик
            <Tooltip title='Подсказка'>
              <HelpIcon />
            </Tooltip>
          </Form.Label>
          <Input id='hint-provider' />
        </Form.Field>
        <Form.Field>
          <Button>Далее</Button>
        </Form.Field>
      </Form>
    );
  },
};

export const Customization: Story = {
  args: {
    gap: 16,
  },
  render: _args => {
    return (
      <Form gap={64}>
        <Form.Field>
          <Form.Label>
            Подрядчик
            <Tooltip title='Стена'>
              <BrickFence />
            </Tooltip>
          </Form.Label>
          <Input {...InputStories.Customization.args} />
          <Form.Message>Сообщение об ошибке</Form.Message>
          <Form.Help>Сообщение-подсказка</Form.Help>
        </Form.Field>
        <Form.Field>
          <Form.Label>
            Поставщик
            <Tooltip title='Человек'>
              <AccountBox />
            </Tooltip>
          </Form.Label>
          <Input {...InputStories.Customization.args} />
          <Form.Message>Сообщение об ошибке</Form.Message>
          <Form.Help>Сообщение-подсказка</Form.Help>
        </Form.Field>
        <Form.Field>
          <Button>Далее</Button>
        </Form.Field>
      </Form>
    );
  },
};

export const Internationalization: Story = {
  args: {
    gap: 16,
  },
  render: _args => {
    return (
      <Form>
        <Form.Field>
          <Form.Label>
            Контрагент
            <Tooltip title="Стена">
              <BrickFence />
            </Tooltip>
          </Form.Label>
          <Input aria-label='Контрагент' />
          <Form.Message>Сообщение об ошибке</Form.Message>
          <Form.Help>Поясняющее сообщение</Form.Help>
        </Form.Field>
        <Form.Field>
          <Form.Label>
            Поставщик
            <Tooltip title="Человек">
              <AccountBox />
            </Tooltip>
          </Form.Label>
          <Input aria-label='Поставщик' />
          <Form.Message>Сообщение об ошибке</Form.Message>
          <Form.Help>Поясняющее сообщение</Form.Help>
        </Form.Field>
        <Form.Field>
          <Button>Далее</Button>
        </Form.Field>
      </Form>
    );
  },
};

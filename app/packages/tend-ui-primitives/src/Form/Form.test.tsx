import React from 'react';
import { render } from '@testing-library/react';

import { snapshotWithTheme } from '../../../tend-ui/src/tools/snapshotWithTheme';
import { Input } from '../Input';
import { Button } from '../Button';
import { Form } from './Form';

describe('Primitive Form', () => {
  it('announces validation messages', () => {
    const renderer = render(<Form.Message>Заполните обязательное поле</Form.Message>);

    expect(renderer.getByRole('alert')).toHaveTextContent(
      'Заполните обязательное поле',
    );
  });

  it('renders correctly', () => {
    const snap = snapshotWithTheme(
      <Form>
        <Form.Field>
          <Form.Label>Подрядчик</Form.Label>
          <Input />
          <Form.Message>Сообщение об ошибке</Form.Message>
          <Form.Help>Сообщение-подсказка</Form.Help>
        </Form.Field>
        <Form.Field>
          <Form.Label>Поставщик</Form.Label>
          <Input />
          <Form.Message>Сообщение об ошибке</Form.Message>
          <Form.Help>Сообщение-подсказка</Form.Help>
        </Form.Field>
        <Form.Field>
          <Button>Далее</Button>
        </Form.Field>
      </Form>,
    );

    expect(snap).toMatchSnapshot();
  });

  it('with custom gap renders correctly', () => {
    const snap = snapshotWithTheme(
      <Form gap={32}>
        <Form.Field>
          <Form.Label>Подрядчик</Form.Label>
          <Input />
          <Form.Message>Сообщение об ошибке</Form.Message>
          <Form.Help>Сообщение-подсказка</Form.Help>
        </Form.Field>
        <Form.Field>
          <Form.Label>Поставщик</Form.Label>
          <Input />
          <Form.Message>Сообщение об ошибке</Form.Message>
          <Form.Help>Сообщение-подсказка</Form.Help>
        </Form.Field>
        <Form.Field>
          <Button>Далее</Button>
        </Form.Field>
      </Form>,
    );

    expect(snap).toMatchSnapshot();
  });
});

import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { UploadArea } from '@rovna-ui/upload';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';
import { Button, Checkbox, Input, Radio, Select } from '@rovna-internal/components/primitives';

import { Form } from './Form';

describe('Form', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(
      <Form>
        <Form.Item>
          <Input />
        </Form.Item>
      </Form>,
    );

    expect(snap).toMatchSnapshot();
  });

  describe('Item', () => {
    it('forwards aria-required only to controls that support it', () => {
      const renderer = render(
        <Form>
          <Form.Item label='Имя' name='name' required>
            <Input />
          </Form.Item>
          <Form.Item label='Роль' name='role' required>
            <Select options={[{ label: 'Разработчик', value: 'developer' }]} />
          </Form.Item>
          <Form.Item label='Материалы' name='materials' required>
            <Checkbox.Group options={['Камень', 'Металл']} />
          </Form.Item>
          <Form.Item label='Способ оплаты' name='payment' required>
            <Radio.Group options={['Картой', 'Наличными']} />
          </Form.Item>
          <Form.Item label='Файлы' name='files' required>
            <UploadArea />
          </Form.Item>
        </Form>,
      );

      expect(renderer.getByLabelText('Имя')).toHaveAttribute('aria-required', 'true');
      expect(renderer.getByTestId('rovna-ui-select')).not.toHaveAttribute('aria-required');
      expect(renderer.container.querySelector('[id="materials"]')).not.toHaveAttribute(
        'aria-required',
      );
      expect(renderer.container.querySelector('[id="payment"]')).not.toHaveAttribute(
        'aria-required',
      );
      expect(renderer.container.querySelector('.rovna-ui-upload-drop-area')).not.toHaveAttribute(
        'aria-required',
      );
    });

    it('tooltip appears correctly', async () => {
      const renderer = render(
        <Form>
          <Form.Item label='Поле' tooltip={{ title: 'Some tooltip text' }}>
            <Input />
          </Form.Item>
        </Form>,
      );

      const content = await renderer.findByTestId('help-icon');
      expect(content).toBeInTheDocument();
      act(() => {
        fireEvent.mouseOver(content);
      });
      const tooltipText = await renderer.findByText('Some tooltip text');
      expect(tooltipText).toBeInTheDocument();
    });

    it('customized tooltip appears correctly', async () => {
      const renderer = render(
        <Form>
          <Form.Item
            label='Поле'
            tooltip={{
              title: 'Some tooltip text',
              children: <span data-testid='custom-content'>Some Custom Content</span>,
            }}
          >
            <Input />
          </Form.Item>
        </Form>,
      );

      const content = await renderer.findByTestId('custom-content');
      expect(content).toBeInTheDocument();
      act(() => {
        fireEvent.mouseOver(content);
      });
      const tooltipText = await renderer.findByText('Some tooltip text');
      expect(tooltipText).toBeInTheDocument();
    });

    it('error message appears correctly', async () => {
      const renderer = render(
        <Form>
          <Form.Item name='name' rules={[{ required: true, message: 'Error message' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button data-testid='submit-button' type='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>,
      );

      const btn = await renderer.findByTestId('submit-button');
      act(() => {
        fireEvent.click(btn);
      });

      const errorMessage = await renderer.findByText('Error message', undefined, {
        timeout: 10000,
      });
      const errorIcon = await renderer.findByTestId('error-icon', undefined, {
        timeout: 10000,
      });

      expect(errorMessage).toBeInTheDocument();
      expect(errorIcon).toBeInTheDocument();
    });
  });
});

import React from 'react';

import { Form } from '../packages/tend-ui/src/components';
import { Input } from '../packages/tend-ui-primitives/src';
import { UploadArea } from '../packages/tend-ui-upload/src';

export const FormsPage = () => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue({
      files: [
        {
          uuid: 'b42dd6d6-1723-4f5d-9346-3e656917b6f1',
          name: 'Initial File',
          extension: '.jpg',
          type: 'image/jpeg',
          source: '',
        },
      ],
    });
  }, [form]);

  return (
    <div>
      <Form
        form={form}
        onValuesChange={(_, state) => {
          console.log('[FormsPage][onFieldsChange]', state);
        }}
      >
        <Form.Item label='FirstName' name='firstName'>
          <Input />
        </Form.Item>
        <Form.Item label='Files' name='files'>
          <UploadArea />
        </Form.Item>
      </Form>
    </div>
  );
};

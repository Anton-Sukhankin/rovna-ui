import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { argTypes } from '@rovna-ui/tools';
import { Form } from '@rovna-ui/components/components';
import { Home } from '@rovna-ui/icons';
import { DropdownItem } from '@rovna-ui/components/primitives';
import {
  pendingFixture,
  rejectFixture,
  resolveFixture,
  timeoutFixture,
  unauthorizedFixture,
} from '@rovna-internal/components/stories/asyncFixtures';

import { UploadArea } from './UploadArea';
import { UploadButton } from './UploadButton';
import docs from './docs.json';
import { Attachment } from './core';
import { OnUploadOptions } from './core/interfaces/Upload';

const meta: Meta<typeof UploadArea> = {
  title: 'Rovna UI/Upload/UploadArea',
  component: UploadArea,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultValue: Attachment[] = [
  {
    uuid: 'storybook-file-1',
    name: 'hello_world',
    extension: '.txt',
    type: 'text/plain',
  },
];

const onUpload =
  (message: string) => (uploading: Attachment[], options: OnUploadOptions) => {
    console.info(message);
    uploading.forEach(item => options.setProgress(item.uuid, 100));
    return resolveFixture(uploading.map(f => ({ ...f, name: `${f.name} Hello World` })));
  };

const rejectedUpload =
  (message: string, reject: () => Promise<Attachment[]>) =>
  (uploading: Attachment[], options: OnUploadOptions) => {
    options.setMessage(
      uploading.map(file => file.uuid),
      message,
    );
    return reject();
  };

const uploadFile = async (canvasElement: HTMLElement, name: string) => {
  const input = canvasElement.querySelector<HTMLInputElement>('input[type="file"]');
  if (!input) throw new Error('Поле выбора файла не найдено');
  await userEvent.upload(input, new File(['local fixture'], name, { type: 'text/plain' }));
};

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('button', { name: /Перетащите файл/i }),
    ).toBeEnabled();
  },
  args: {
    defaultValue,
    description: 'Загрузите необходимые файлы',
    limit: 'Минимальный размер - 100 MB',
    onChange: attachments => {
      console.log('[Default][onChange]', attachments);
    },
    onUpload: onUpload('[Default][onUpload]'),
  },
};

export const KeyboardAccessibility: Story = {
  args: {
    description: 'Загрузите файл отчета',
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const uploadButton = canvas.getByRole('button', { name: /Перетащите файл/i });
    const fileInput = canvasElement.querySelector<HTMLInputElement>('input[type="file"]');
    const onInputClick = fn();
    fileInput?.addEventListener('click', onInputClick);

    try {
      uploadButton.focus();
      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');
      await expect(onInputClick).toHaveBeenCalledTimes(2);
    } finally {
      fileInput?.removeEventListener('click', onInputClick);
    }
  },
};

export const Disabled: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const dropArea = canvas.getByRole('button', { name: /Перетащите файл/i });
    const fileInput = canvasElement.querySelector<HTMLInputElement>('input[type="file"]');
    await expect(dropArea).toHaveClass('rovna-ui-upload-drop-area-disabled');
    await expect(fileInput).not.toBeNull();
    await userEvent.upload(fileInput!, new File(['content'], 'blocked.txt'));
    await waitFor(() => expect(args.onChange).not.toHaveBeenCalled());
    await expect(fileInput!.files).toHaveLength(0);
  },
  args: {
    onChange: fn(),
    defaultValue,
    disabled: true,
    onUpload: onUpload('[Default][onUpload]'),
  },
};

export const Description: Story = {
  args: {
    onChange: attachments => {
      console.log('[Description][onChange]', attachments);
    },
    defaultValue,
    onUpload: onUpload('[Default][onUpload]'),
    description: 'PDF, XLSX, JPEG, PNG',
  },
};

export const Limit: Story = {
  args: {
    defaultValue,
    onChange: attachments => {
      console.log('[Limit][onChange]', attachments);
    },
    onUpload: onUpload('[Default][onUpload]'),
    limit: 'Минимальный размер - 100 MB',
  },
};

export const Extensions: Story = {
  args: {
    onChange: attachments => {
      console.log('[Extensions][onChange]', attachments);
    },
    defaultValue,
    extensions: ['.svg'],
    onUpload: onUpload('[Default][onUpload]'),
  },
};

export const Multiple: Story = {
  args: {
    onChange: attachments => {
      console.log('[Multiple][onChange]', attachments);
    },
    defaultValue,
    multiple: true,
    onUpload: onUpload('[Default][onUpload]'),
  },
};

export const Max: Story = {
  args: {
    onChange: attachments => {
      console.log('[Max][onChange]', attachments);
    },
    defaultValue,
    max: 1,
    onUpload: onUpload('[Default][onUpload]'),
  },
};

export const Message: Story = {
  args: {
    onChange: attachments => {
      console.log('[Message][onChange]', attachments);
    },
    defaultValue: [
      {
        ...defaultValue[0],
        status: 'error',
        message: 'Сообщение об ошибке',
      },
    ],
    max: 1,
    onUpload: onUpload('[Default][onUpload]'),
  },
};

export const UploadRejected: Story = {
  args: {
    onChange: fn(),
    onUpload: rejectedUpload('Локальная ошибка загрузки', () =>
      rejectFixture(new Error('Локальная ошибка загрузки')),
    ),
  },
  play: async ({ canvasElement }) => {
    const page = within(canvasElement.ownerDocument.body);
    await uploadFile(canvasElement, 'ошибка.txt');
    await expect(await page.findByRole('alert')).toHaveTextContent('Локальная ошибка загрузки');
  },
};

export const UploadLoading: Story = {
  args: {
    onChange: fn(),
    onUpload: (uploading, options) => {
      uploading.forEach(file => options.setProgress(file.uuid, 35));
      return pendingFixture();
    },
  },
  play: async ({ canvasElement }) => {
    await uploadFile(canvasElement, 'загрузка.txt');
    await expect(within(canvasElement).findByText('загрузка.txt')).resolves.toBeTruthy();
  },
};

export const UploadUnauthorized: Story = {
  args: {
    onChange: fn(),
    onUpload: rejectedUpload('Требуется авторизация', unauthorizedFixture),
  },
  play: async ({ canvasElement }) => {
    const page = within(canvasElement.ownerDocument.body);
    await uploadFile(canvasElement, 'авторизация.txt');
    await expect(await page.findByRole('alert')).toHaveTextContent('Требуется авторизация');
  },
};

export const UploadTimeout: Story = {
  args: {
    onChange: fn(),
    onUpload: rejectedUpload('Превышено время ожидания', timeoutFixture),
  },
  play: async ({ canvasElement }) => {
    const page = within(canvasElement.ownerDocument.body);
    await uploadFile(canvasElement, 'таймаут.txt');
    await expect(await page.findByRole('alert')).toHaveTextContent('Превышено время ожидания');
  },
};

let uploadRetryAttempts = 0;
export const UploadRetry: Story = {
  args: {
    onChange: fn(),
    multiple: true,
    onUpload: (uploading, options) => {
      uploadRetryAttempts += 1;
      if (uploadRetryAttempts === 1) {
        options.setMessage(
          uploading.map(file => file.uuid),
          'Первая попытка отклонена',
        );
        return rejectFixture(new Error('Первая попытка отклонена'));
      }
      uploading.forEach(file => options.setProgress(file.uuid, 100));
      return resolveFixture(uploading);
    },
  },
  play: async ({ canvasElement }) => {
    const page = within(canvasElement.ownerDocument.body);
    uploadRetryAttempts = 0;
    await uploadFile(canvasElement, 'попытка-1.txt');
    await expect(await page.findByRole('alert')).toHaveTextContent('Первая попытка отклонена');
    await uploadFile(canvasElement, 'попытка-2.txt');
    await expect(await page.findByText('попытка-2.txt')).toBeTruthy();
  },
};

export const GetAttachmentBefore: Story = {
  args: {
    onChange: attachments => {
      console.log('[GetAttachmentBefore][onChange]', attachments);
    },
    defaultValue,
    onUpload: onUpload('[GetAttachmentBefore][onUpload]'),
    getAttachmentBefore: () => <Home />,
  },
};

export const GetAttachmentAfter: Story = {
  args: {
    onChange: attachments => {
      console.log('[GetAttachmentAfter][onChange]', attachments);
    },
    defaultValue,
    onUpload: onUpload('[GetAttachmentAfter][onUpload]'),
    getAttachmentAfter: () => <Home />,
  },
};
export const GetAttachmentActions: Story = {
  args: {
    onChange: attachments => {
      console.log('[GetAttachmentActions][onChange]', attachments);
    },
    defaultValue,
    onUpload: onUpload('[GetAttachmentActions][onUpload]'),
    getAttachmentActions: (_, options) =>
      Array.from<DropdownItem>([
        { key: 'action_1', label: 'Действие 1' },
        { key: 'action_2', label: 'Действие 2' },
      ]).concat(options.actions),
  },
};
export const GetOneAttachmentActions: Story = {
  args: {
    onChange: attachments => {
      console.log('[GetAttachmentActions][onChange]', attachments);
    },
    defaultValue,
    onUpload: onUpload('[GetAttachmentActions][onUpload]'),
    getAttachmentActions: (_, _options) => [
      {
        key: 'action_1',
        icon: <Home />,
        onClick: action('Upload home action clicked'),
      },
    ],
  },
};

export const OnEdit: Story = {
  args: {
    defaultValue,
    onEdit: edited => resolveFixture(edited),
  },
};

export const OnRemove: Story = {
  args: {
    defaultValue,
    onRemove: () => resolveFixture(undefined),
  },
};

const OnUploadCode = `
<UploadArea
  onUpload={(files, options) => {
    return axios.post('/api/upload/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: e => {
        options.setProgress()
      },
    });
  }}
/>
`;
export const OnUpload: Story = {
  parameters: {
    docs: {
      source: {
        code: OnUploadCode,
      },
    },
  },
  args: {
    onChange: attachments => {
      console.log('[OnUpload][onChange]', attachments);
    },
    defaultValue,
    onUpload: onUpload('[Default][onUpload]'),
  },
};

export const CanClick: Story = {
  args: {
    defaultValue,
    getAttachmentAfter: () => <div>Содержимое</div>,
    getAttachmentActions: () => [
      {
        key: '1',
        label: "Действие 1",
        onClick: action('Upload action 1 clicked'),
      },
      {
        key: '2',
        label: "Действие 2",
        onClick: action('Upload action 2 clicked'),
      },
    ],
    canClick: () => false,
    onItemClick: action('Upload item clicked'),
    onChange: attachments => {
      console.log('[OnClick][onChange]', attachments);
    },
  },
};

export const OnItemClick: Story = {
  args: {
    defaultValue,
    getAttachmentAfter: () => <div>Содержимое</div>,
    getAttachmentActions: () => [
      {
        key: '1',
        label: "Действие 1",
        onClick: action('Upload action 1 clicked'),
      },
      {
        key: '2',
        label: "Действие 2",
        onClick: action('Upload action 2 clicked'),
      },
    ],
    onItemClick: action('Upload item clicked'),
    onChange: attachments => {
      console.log('[OnClick][onChange]', attachments);
    },
  },
};

export const CanEdit: Story = {
  args: {
    onChange: attachments => {
      console.log('[CanEdit][onChange]', attachments);
    },
    defaultValue,
    onUpload: onUpload('[CanEdit][onUpload]'),
    canEdit: () => false,
  },
};

export const CanRemove: Story = {
  args: {
    onChange: attachments => {
      console.log('[CanRemove][onChange]', attachments);
    },
    defaultValue,
    onUpload: onUpload('[CanRemove][onUpload]'),
    canRemove: () => false,
  },
};

export const CanDownload: Story = {
  args: {
    onChange: attachments => {
      console.log('[CanDownload][onChange]', attachments);
    },
    defaultValue,
    onUpload: onUpload('[CanDownload][onUpload]'),
    canDownload: () => false,
  },
};

export const WithAntdForm: Story = {
  render: _props => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const [form] = Form.useForm();
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <Form form={form} initialValues={{ files: defaultValue }}>
        <Form.Item name='files' label='Файлы'>
          <UploadArea
            onUpload={(uploading: Attachment[], options: OnUploadOptions) => {
              uploading.forEach(f => options.setProgress(f.uuid, 100));
              return resolveFixture(uploading);
            }}
          />
        </Form.Item>
      </Form>
    );
  },
};

export const WithAntdFormRequired: Story = {
  render: _props => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const [form] = Form.useForm();
    React.useEffect(() => {
      form.validateFields();
    }, [form]);
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <Form form={form}>
        <Form.Item
          name='files'
          rules={[{ required: true, message: 'Поле обязательно для заполнения' }]}
          label='Файлы'
        >
          <UploadArea />
        </Form.Item>
      </Form>
    );
  },
};

export const Composition: Story = {
  args: {
    onChange: attachments => {
      console.log('[CanRemove][onChange]', attachments);
    },
    defaultValue,
    onUpload: onUpload('[CanRemove][onUpload]'),
    canRemove: () => false,
  },
  render: args => (
    <UploadButton.Root {...args}>
      <UploadButton.FilesList />
    </UploadButton.Root>
  ),
};

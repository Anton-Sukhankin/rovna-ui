import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { argTypes } from '@rovna-ui/tools';

import { UploadButton } from './UploadButton';
import docs from './docs.json';
import * as UploadAreaStory from './UploadArea.stories';

const meta: Meta<typeof UploadButton> = {
  title: 'Rovna UI/Upload/UploadButton',
  component: UploadButton,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

const Default: Story = {
  args: UploadAreaStory.Default.args,
};
const Disabled: Story = {
  args: UploadAreaStory.Disabled.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: /Загрузить файл/i })).toBeDisabled();
  },
};
const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};
const Children: Story = {
  args: {
    children: 'Кастомный текст',
  },
};
const Extensions: Story = UploadAreaStory.Extensions;
const Multiple: Story = UploadAreaStory.Multiple;
const GetFileBefore: Story = UploadAreaStory.GetAttachmentBefore;
const CanClick: Story = UploadAreaStory.CanClick;
const OnItemClick: Story = UploadAreaStory.OnItemClick;
const GetFileAfter: Story = UploadAreaStory.GetAttachmentAfter;
const GetAttachmentActions: Story = UploadAreaStory.GetAttachmentActions;
const WithAntdForm: Story = UploadAreaStory.WithAntdForm;
const WithAntdFormRequired: Story = UploadAreaStory.WithAntdFormRequired;
const Composition: Story = UploadAreaStory.Composition;

export {
  Default,
  Disabled,
  Extensions,
  Multiple,
  FullWidth,
  Children,
  CanClick,
  OnItemClick,
  GetFileBefore,
  GetFileAfter,
  GetAttachmentActions,
  WithAntdForm,
  WithAntdFormRequired,
  Composition,
};

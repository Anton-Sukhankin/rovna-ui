import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { flatten } from '@rovna-ui/utils';
import { Button, DropdownItem } from '@rovna-ui/components/primitives';
import { Box } from '@rovna-ui/grid';
import { argTypes } from '@rovna-ui/tools';
import { Bank, Lock } from '@rovna-ui/icons';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import {
  pendingFixture,
  rejectFixture,
  resolveFixture,
  retryFixture,
  timeoutFixture,
  unauthorizedFixture,
} from '@rovna-internal/components/stories/asyncFixtures';

import { Tree } from './Tree';
import { projects } from './__fixtures__/projects';
import { TreeProps, TreeRef } from './types';
import docs from './docs.json';
import { TreeData } from './core';

const meta: Meta<typeof Tree> = {
  title: 'Rovna UI/Tree/Tree',
  component: Tree,
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

const print = <T,>(value: T) => JSON.stringify(value, null, 2);

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого.", { exact: false }));
    await waitFor(() => expect(args.onNodeClick).toHaveBeenCalled());
  },
  args: {
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onNodeClick: fn(),
    onSearch: payload => {
      console.log('[onSearch]', payload);
    },
    onCheck: payload => {
      console.log('[Default][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Default][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Default][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const KeyboardAccessibility: Story = {
  args: {
    onChange: fn(),
    onCheck: fn(),
    onExpand: fn(),
    onNodeClick: fn(),
    onNodeExpand: fn(),
    onSearch: fn(),
    onSelect: fn(),
    defaultNodes: [
      {
        key: 'documents',
        value: 'Документы',
        children: [{ key: 'report', value: 'Отчет' }],
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tree = canvas.getByRole('tree');
    const checkbox = within(tree).getByRole('checkbox', {
      name: 'Выбрать узел «Документы»',
    });
    const expandButton = within(tree).getByRole('button', {
      name: 'Развернуть узел «Документы»',
    });

    checkbox.focus();
    await userEvent.keyboard(' ');
    await expect(checkbox).toBeChecked();
    expandButton.focus();
    await userEvent.keyboard('{Enter}');
    await expect(expandButton).toHaveAttribute('aria-expanded', 'true');
    await expect(within(tree).getAllByRole('treeitem')).toHaveLength(2);
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'Кастомный плейсхолдер',
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onSearch: payload => {
      console.log('[onSearch]', payload);
    },
    onCheck: payload => {
      console.log('[Default][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Default][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Default][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const Ellipsis: Story = {
  args: {
    ellipsis: false,
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onSearch: payload => {
      console.log('[onSearch]', payload);
    },
    onCheck: payload => {
      console.log('[Default][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Default][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Default][onChange]', print(payload));
    },
    defaultNodes: [
      {
        key: 'Алхимово',
        value:
          "Это пример текста для проверки отображения компонента. Он помогает оценить перенос строк, отступы и доступную ширину содержимого. Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.",
        children: [
          {
            key: 'Алхимово 2 очередь',
            value: '2 очередь',
            children: [
              { key: 'АЛХ_2 оч_10 ж.д', value: 'АЛХ_2 оч_10 ж.д' },
              { key: 'АЛХ_2 оч_11 ж.д', value: 'АЛХ_2 оч_11 ж.д' },
              { key: 'АЛХ_2 оч_12 ж.д', value: 'АЛХ_2 оч_12 ж.д' },
              { key: 'АЛХ_2 оч_13 ж.д', value: 'АЛХ_2 оч_13 ж.д' },
            ],
          },
          {
            key: 'Алхимово 3 очередь',
            value: '3 очередь',
            children: [
              { key: 'АЛХ_3 оч_10 ж.д', value: 'АЛХ_3 оч_10 ж.д' },
              { key: 'АЛХ_3 оч_11 ж.д', value: 'АЛХ_3 оч_11 ж.д' },
              { key: 'АЛХ_3 оч_12 ж.д', value: 'АЛХ_3 оч_12 ж.д' },
              { key: 'АЛХ_3 оч_13 ж.д', value: 'АЛХ_3 оч_13 ж.д' },
              { key: 'АЛХ_3 оч_14 ж.д', value: 'АЛХ_3 оч_14 ж.д' },
              { key: 'АЛХ_3 оч_15 ж.д', value: 'АЛХ_3 оч_15 ж.д' },
              { key: 'АЛХ_3 оч_16 ж.д', value: 'АЛХ_3 оч_16 ж.д' },
              { key: 'АЛХ_3 оч_17 ж.д', value: 'АЛХ_3 оч_17 ж.д' },
            ],
          },
          {
            key: 'Алхимово 1 очередь',
            value: '1 очередь',
            children: [
              {
                key: 'Алхимово 3 фаза',
                value: '3 Фаза',
                children: [
                  { key: 'АЛХ_1 оч_10 ж.д', value: 'АЛХ_1 оч_10 ж.д' },
                  { key: 'АЛХ_1 оч_11 ж.д', value: 'АЛХ_1 оч_11 ж.д' },
                  { key: 'АЛХ_1 оч_12 ж.д', value: 'АЛХ_1 оч_12 ж.д' },
                  { key: 'АЛХ_1 оч_13 ж.д', value: 'АЛХ_1 оч_13 ж.д' },
                  { key: 'АЛХ_1 оч_14 ж.д', value: 'АЛХ_1 оч_14 ж.д' },
                  { key: 'АЛХ_1 оч_15 ж.д', value: 'АЛХ_1 оч_15 ж.д' },
                  { key: 'АЛХ_1 оч_16 ж.д', value: 'АЛХ_1 оч_16 ж.д' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export const Searchable: Story = {
  args: {
    searchable: false,
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[Searchable][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Searchable][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Searchable][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const Deletable: Story = {
  args: {
    deletable: true,
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[Deletable][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Deletable][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Deletable][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const Checkable: Story = {
  args: {
    checkable: false,
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[Checkable][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Checkable][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Checkable][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const Selectable: Story = {
  args: {
    selectable: false,
    onNodeExpand: payload => {
      console.log('[Selectable][onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[Selectable][onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[Selectable][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Selectable][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Selectable][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const ShowFiltersButton: Story = {
  args: {
    showFiltersButton: true,
    onNodeExpand: payload => {
      console.log('[Selectable][onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[Selectable][onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[Selectable][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Selectable][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Selectable][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const AutoExpand: Story = {
  args: {
    autoexpand: ['onsearch'],
    onNodeExpand: payload => {
      console.log('[Selectable][onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[Selectable][onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[Selectable][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Selectable][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Selectable][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const Filtering: Story = {
  args: {
    filtering: false,
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onSearch: payload => {
      console.log('[onSearch]', payload);
    },
    onCheck: payload => {
      console.log('[Default][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Default][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Default][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const FilteringAlgorithm: Story = {
  args: {
    filteringAlgorithm: 'includesStringAndChildren',
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onSearch: payload => {
      console.log('[onSearch]', payload);
    },
    onCheck: payload => {
      console.log('[Default][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Default][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Default][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const DefaultSelectedKey: Story = {
  args: {
    defaultSelectedKey: 'Алхимово',
    onNodeExpand: payload => {
      console.log('[Selectable][onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[Selectable][onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[Selectable][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Selectable][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Selectable][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const Pinnable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Компонент должен находиться во `flex` контейнере с ограниченной высотой (или 100vh) для корректного отображения скролла',
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ display: 'flex', height: '500px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    pinnable: true,
    defaultPinnedKeys: ['Алхимово'],
    nodeFieldToSortBy: "Название" as keyof TreeData,
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[Pinnable][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Pinnable][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Pinnable][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const isNodeCheckboxDisabled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getAllByRole('checkbox')[0];
    await expect(checkbox).toBeDisabled();
    await expect(getComputedStyle(checkbox).pointerEvents).toBe('none');
    await expect(checkbox).not.toBeChecked();
  },
  args: {
    isNodeCheckboxDisabled: () => true,
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[isNodeCheckboxDisabled][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[isNodeCheckboxDisabled][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[isNodeCheckboxDisabled][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const GetNodeCheckboxTooltipProps: Story = {
  args: {
    isNodeCheckboxDisabled: () => true,
    getNodeCheckboxTooltipProps: () => ({
      title: 'Нельзя выбрать согласованный проект',
    }),
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[GetNodeCheckboxTooltipProps][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[GetNodeCheckboxTooltipProps][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[GetNodeCheckboxTooltipProps][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const CanAddNode: Story = {
  args: {
    canAddNode: () => true,
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[CanAddNode][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[CanAddNode][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[CanAddNode][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const CanEditNode: Story = {
  args: {
    canEditNode: () => true,
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[CanEditNode][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[CanEditNode][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[CanEditNode][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const CanRemoveNode: Story = {
  args: {
    deletable: true,
    canRemoveNode: () => true,
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[CanRemoveNode][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[CanRemoveNode][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[CanRemoveNode][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const GetNodeCounter: Story = {
  args: {
    getNodeCounter: () => 156,
    onNodeExpand: payload => {
      console.log('[GetNodeNumber][onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[GetNodeNumber][onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[GetNodeNumber][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[GetNodeNumber][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[GetNodeNumber][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const GetNodeIconAfter: Story = {
  args: {
    getNodeIconAfter: () => <Lock color='gray500' />,
    getNodeActions: () => [
      { key: 'action_1', label: 'Действие 1' },
      { key: 'action_2', label: 'Действие 2' },
    ],
    pinnable: true,
    onNodeExpand: payload => {
      console.log('[GetNodeNumber][onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[GetNodeNumber][onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[GetNodeNumber][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[GetNodeNumber][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[GetNodeNumber][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const GetNodeStatusError: Story = {
  args: {
    getNodeStatus: () => 'error',
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[GetNodeStatus][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[GetNodeStatus][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[GetNodeStatus][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const GetNodeStatusWarning: Story = {
  args: {
    getNodeStatus: () => 'warning',
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[GetNodeStatusWarning][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[GetNodeStatusWarning][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[GetNodeStatusWarning][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const GetNodeStatusSuccess: Story = {
  args: {
    getNodeStatus: () => 'success',
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[GetNodeStatusSuccess][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[GetNodeStatusSuccess][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[GetNodeStatusSuccess][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const GetNodeStatusInfo: Story = {
  args: {
    getNodeStatus: () => 'info',
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[GetNodeStatusInfo][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[GetNodeStatusInfo][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[GetNodeStatusInfo][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const GetNodeActions: Story = {
  args: {
    getNodeActions: (_, options) =>
      Array.from<DropdownItem>([
        { key: 'action_1', label: 'Действие 1' },
        { key: 'action_2', label: 'Действие 2' },
      ]).concat(options.actions),
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[GetNodeActions][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[GetNodeActions][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[GetNodeActions][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const GetNodeBefore: Story = {
  args: {
    getNodeBefore: () => <Bank />,
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[GetNodeBefore][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[GetNodeBefore][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[GetNodeBefore][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const CanExpandNode: Story = {
  args: {
    canExpandNode: () => false,
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[canExpandNode][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[canExpandNode][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[canExpandNode][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const DefaultExpandedKeys: Story = {
  args: {
    defaultExpandedKeys: flatten(projects).map(node => node.key),
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[Default][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Default][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Default][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const DefaultCheckedKeys: Story = {
  args: {
    defaultExpandedKeys: flatten(projects).map(node => node.key),
    defaultCheckedKeys: flatten(projects).map(node => node.key),
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[Default][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Default][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Default][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const GetNodeStatusTooltipProps: Story = {
  args: {
    getNodeStatus: () => 'error',
    getNodeStatusTooltipProps: () => ({ title: 'Ошибка' }),
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[Editable][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Editable][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Editable][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const Container: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Компонент должен находиться во `flex` контейнере с ограниченной высотой (или 100vh) для корректного отображения скролла',
      },
    },
  },
  args: {
    defaultExpandedKeys: flatten(projects)
      .filter(node => Array.isArray(node.children))
      .map(node => node.key),
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[Container][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Container][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Container][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
  render: props => (
    <div style={{ display: 'flex', height: 'calc(100vh - 40px)', width: '400px' }}>
      <Tree {...props} />
    </div>
  ),
};

const MethodsCode = `
const MethodsTemplate = (props: TreeProps) => {
  const ref = React.useRef<TreeRef>(null);

  return (
    <Box $display='flex' $flexDirection='column' $gap={8}>
      <Button
        onClick={() => {
          ref?.current?.add?.('Алхимово', {
            key: 'new-node',
            value: 'Новый файл',
          });
        }}
      >
        Добавить
      </Button>
      <Button
        onClick={() => {
          ref?.current?.edit?.({
            key: 'Алхимово 1 очередь',
            value: 'Измененное Алхимово',
          });
        }}
      >
        Редактировать
      </Button>
      <Button
        onClick={() => {
          ref?.current?.remove?.('Алхимово 2 очередь');
        }}
      >
        Удалить
      </Button>
      <Tree {...props} ref={ref} />
    </Box>
  );
};
`;

const MethodsTemplate = (props: TreeProps) => {
  const ref = React.useRef<TreeRef>(null);

  return (
    <Box $display='flex' $flexDirection='column' $gap={8}>
      <Button
        onClick={() => {
          ref?.current?.add?.('Алхимово', {
            key: 'new-node',
            value: 'Новый файл',
          });
        }}
      >
        Добавить
      </Button>
      <Button
        onClick={() => {
          ref?.current?.edit?.({
            key: 'Алхимово 1 очередь',
            value: 'Измененное Алхимово',
          });
        }}
      >
        Редактировать
      </Button>
      <Button
        onClick={() => {
          ref?.current?.remove?.('Алхимово 2 очередь');
        }}
      >
        Удалить
      </Button>
      <Tree {...props} ref={ref} />
    </Box>
  );
};
export const Methods: Story = {
  parameters: {
    docs: {
      source: {
        code: MethodsCode,
      },
    },
  },
  args: {
    defaultNodes: projects,
    defaultExpandedKeys: ['Алхимово'],
  },
  render: MethodsTemplate,
};

export const LocalStorage: Story = {
  decorators: [
    Story => (
      <div style={{ display: 'flex', height: '500px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    localStorage: 'rovna-ui-tree-local-storage',
    pinnable: true,
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[LocalStorage][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[LocalStorage][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[LocalStorage][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const Footer: Story = {
  args: {
    footer: [
      <Button fullWidth key='1'>
        Отмена
      </Button>,
      <Button fullWidth key='2'>
        Принять
      </Button>,
    ],
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[Default][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Default][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Default][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const Draggable: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const treeItems = canvas.getAllByRole('treeitem');
    treeItems[0].focus();
    await userEvent.keyboard(' ');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard(' ');
    await waitFor(() => expect(args.onNodeDragEnd).toHaveBeenCalledTimes(1));
  },
  args: {
    draggable: true,
    onNodeDragEnd: fn(),
    onNodeExpand: payload => {
      console.log('[Draggable][onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[Draggable][onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[Draggable][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Draggable][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Draggable][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const CanDragNode: Story = {
  args: {
    draggable: true,
    canDragNode: node => node.key === 'Алхимово 1 очередь',
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[Default][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Default][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Default][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

export const CanDropNode: Story = {
  args: {
    draggable: true,
    canDropNode: node => node.key !== 'Алхимово 1 очередь',
    onNodeExpand: payload => {
      console.log('[onNodeExpand]', payload);
    },
    onSelect: payload => {
      console.log('[onSelect]', payload);
    },
    onCheck: payload => {
      console.log('[Default][onCheck]', print(payload));
    },
    onExpand: payload => {
      console.log('[Default][onExpand]', print(payload));
    },
    onChange: payload => {
      console.log('[Default][onChange]', print(payload));
    },
    defaultNodes: projects,
  },
};

const asyncTreeNodes = [
  { key: 'async-node-1', value: 'Узел 1', children: [] },
  { key: 'async-node-2', value: 'Узел 2', children: [] },
];

const asyncTreeArgs = {
  canExpandNode: () => true,
  onNodeExpand: (payload: unknown) => console.log('[onNodeExpand]', payload),
  onSelect: (payload: unknown) => console.log('[onSelect]', payload),
  onCheck: (payload: unknown) => console.log('[onCheck]', print(payload)),
  onExpand: (payload: unknown) => console.log('[onExpand]', print(payload)),
  onChange: (payload: unknown) => console.log('[onChange]', print(payload)),
  defaultNodes: asyncTreeNodes,
};

const childNodes = (node: TreeData) =>
  Array.from({ length: 5 }, (_, index) => ({
    key: `${node.key}-child-${index + 1}`,
    value: `Дочерний узел ${index + 1}`,
    ...(index === 2 ? { children: [] } : {}),
  }));

export const OnNodeChildrenRequest: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Свойство `onNodeChildrenRequest` должно возвращать `Promise`',
      },
    },
  },
  args: {
    ...asyncTreeArgs,
    onNodeChildrenRequest: node => resolveFixture(childNodes(node)),
  },
};

export const OnNodeChildrenRequestError: Story = {
  args: {
    ...asyncTreeArgs,
    onNodeChildrenRequest: () => rejectFixture(new Error('Локальная ошибка загрузки узлов')),
  },
};

export const OnNodeChildrenRequestEmpty: Story = {
  args: {
    ...asyncTreeArgs,
    onNodeChildrenRequest: () => resolveFixture([]),
  },
};

export const OnNodeChildrenRequestLoading: Story = {
  args: {
    ...asyncTreeArgs,
    onNodeChildrenRequest: () => pendingFixture(),
  },
};

export const OnNodeChildrenRequestUnauthorized: Story = {
  args: {
    ...asyncTreeArgs,
    onNodeChildrenRequest: () => unauthorizedFixture(),
  },
};

export const OnNodeChildrenRequestTimeout: Story = {
  args: {
    ...asyncTreeArgs,
    onNodeChildrenRequest: () => timeoutFixture(),
  },
};

export const OnNodeChildrenRequestRetry: Story = {
  args: {
    ...asyncTreeArgs,
    preload: ['oneveryexpand'],
    onNodeChildrenRequest: retryFixture(childNodes(asyncTreeNodes[0])),
  },
  parameters: {
    docs: {
      description: {
        story: 'Первое раскрытие завершается ошибкой, повторное раскрытие получает локальные данные.',
      },
    },
  },
};

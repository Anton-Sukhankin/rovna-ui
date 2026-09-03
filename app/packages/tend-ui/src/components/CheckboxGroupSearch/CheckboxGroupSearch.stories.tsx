import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { argTypes } from '@rovna-ui/tools';

import { Tag } from '@rovna-internal/components/primitives/Tag';
import { Box } from '@rovna-internal/components/grid';
import { Delete } from '@rovna-internal/components/icons/Delete';
import { getRussianAnimal } from '@rovna-internal/components/stories/mockData';

import { CheckboxGroupSearch } from './CheckboxGroupSearch';
import docs from './docs.json';

const data = (length = 10) =>
  Array.from({ length }).map((_, index) => {
    const name = getRussianAnimal(index);

    return {
      id: index + 1,
      name,
      description: `Описание варианта: ${name}`,
    };
  });

const meta: Meta<typeof CheckboxGroupSearch> = {
  title: 'Rovna UI/Main/Components/CheckboxGroupSearch',
  component: CheckboxGroupSearch,
  args: {
    placeholder: 'Поиск по вариантам',
  },
  argTypes: argTypes(docs),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: data().map(v => ({ value: v.id, label: v.name })),
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    options: data().map(v => ({ value: v.id, label: v.name })),
  },
};

export const Error: Story = {
  args: {
    error: true,
  },
};

export const OptionAfter: Story = {
  args: {
    optionAfter: <Delete />,
    options: data().map(v => ({ value: v.id, label: v.name })),
  },
};

export const OptionDescription: Story = {
  args: {
    optionDescription: option => `Это ${option.label}`,
    options: data().map(v => ({ value: v.id, label: v.name })),
  },
};

export const OptionRender1: Story = {
  args: {
    optionRender: v => <Tag>{v.label}</Tag>,
    options: data().map(v => ({ value: v.id, label: v.name })),
  },
};

const OptionRender2Code = `
<CheckboxGroupSearch
  optionRender={option => (
    <Box $display='flex' $alignItems='center' $justifyContent='space-between'>
      <Box>{option.label}</Box>
      <Delete />
    </Box>
  )}
/>
`;
export const OptionRender2: Story = {
  parameters: {
    docs: {
      source: {
        code: OptionRender2Code,
      },
    },
  },
  args: {
    optionRender: option => (
      <Box $display='flex' $alignItems='center' $justifyContent='space-between'>
        <Box>{option.label}</Box>
        <Delete />
      </Box>
    ),
    options: data().map(v => ({ value: v.id, label: v.name })),
  },
};

const ScrollableCode = `
<CheckboxGroupSearch scrollable={false} api='/api/example/' />
`;
export const Scrollable: Story = {
  parameters: {
    docs: {
      source: {
        code: ScrollableCode,
      },
    },
  },
  args: {
    scrollable: false,
    options: data().map(v => ({ value: v.id, label: v.name })),
  },
};

export const FrontendSearch: Story = {
  args: {
    filterOption: true,
    filterOptionProp: 'label',
    options: data().map(v => ({ value: v.id, label: v.name })),
  },
};

export const Virtual: Story = {
  args: {
    virtual: true,
    onChange: value => {
      console.log('[Virtual][onChange]', value);
    },
    options: data(1000).map(v => ({ value: v.id, label: v.name })),
  },
};

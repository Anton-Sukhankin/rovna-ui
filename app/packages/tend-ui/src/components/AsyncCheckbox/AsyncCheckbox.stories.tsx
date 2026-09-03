import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { ApiListResponse } from '@rovna-internal/components/types';
import { Button, Tag } from '@rovna-internal/components/primitives';
import { ApiFunctionPayload } from '@rovna-internal/components/hooks/useApi';
import { Box } from '@rovna-internal/components/grid';
import { Delete } from '@rovna-internal/components/icons/Delete';
import { getRussianAnimal, getRussianCompany } from '@rovna-internal/components/stories/mockData';
import {
  pendingFixture,
  rejectFixture,
  resolveFixture,
  retryFixture,
  timeoutFixture,
  unauthorizedFixture,
} from '@rovna-internal/components/stories/asyncFixtures';

import { AsyncCheckbox } from './AsyncCheckbox';

const data = Array.from({ length: 10 }).map((_, index) => {
  const name = getRussianAnimal(index);

  return {
    id: index + 1,
    name,
    description: `Описание варианта: ${name}`,
  };
});

type MockData = (typeof data)[number];

const paginatedApi = async (): Promise<ApiListResponse<MockData>> => ({
  count: data.length,
  results: data.slice(0, 5),
  next: async () => ({
    count: data.length,
    next: null,
    results: data.slice(5),
  }),
});

const apiFactory = () => {
  return {
    success: (options?: ApiFunctionPayload) => {
      const results = data.filter(v => {
        if (options?.params?.search) {
          return v.name.includes(options?.params?.search as string);
        }

        return true;
      });
      return resolveFixture({ results });
    },
    error: () => rejectFixture<ApiListResponse<MockData>>(new Error('Локальная ошибка')),
    empty: () => resolveFixture<ApiListResponse<MockData>>({ results: [] }),
  };
};

const meta: Meta<typeof AsyncCheckbox> = {
  title: 'Rovna UI/Main/Components/AsyncCheckbox',
  component: AsyncCheckbox,
  args: {
    placeholder: 'Поиск по вариантам',
  },
  parameters: {
    mockData: [
      {
        url: '/api/async-select/companies/',
        delay: 2000,
        method: 'GET',
        status: 200,
        response: {
          results: Array.from({ length: 30 }).map((_, index) => {
            const name = getRussianCompany(index);

            return {
              id: `company-${index + 1}`,
              name,
            };
          }),
        },
      },
      {
        url: '/api/async-select/animals/',
        delay: 2000,
        method: 'GET',
        status: 200,
        response: {
          next: '/api/async-select/companies/',
          results: Array.from({ length: 30 }).map((_, index) => {
            const name = getRussianAnimal(index);

            return {
              id: `animal-${index + 1}`,
              name,
            };
          }),
        },
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const RetryTemplate = (args: React.ComponentProps<typeof AsyncCheckbox>) => {
  const [key, setKey] = React.useState(0);

  return (
    <>
      <AsyncCheckbox {...args} key={key} />
      <Button onClick={() => setKey(value => value + 1)}>Пересоздать</Button>
    </>
  );
};

export const Api: Story = {
  args: {
    api: apiFactory().success,
  },
};

export const ApiEmpty: Story = {
  args: {
    api: apiFactory().empty,
  },
};

export const ApiError: Story = {
  args: {
    api: apiFactory().error,
  },
};

export const ApiLoading: Story = {
  args: { api: () => pendingFixture<ApiListResponse<MockData>>() },
};

export const ApiUnauthorized: Story = {
  args: { api: () => unauthorizedFixture<ApiListResponse<MockData>>() },
};

export const ApiTimeout: Story = {
  args: { api: () => timeoutFixture<ApiListResponse<MockData>>() },
};

export const ApiRetry: Story = {
  args: { api: retryFixture<ApiListResponse<MockData>>({ results: data }) },
  render: RetryTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Непредвиденная ошибка')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Пересоздать' }));
    await expect(await canvas.findByText(data[0].name)).toBeVisible();
  },
  parameters: {
    docs: {
      description: {
        story: 'Локальный callback отклоняет первую попытку и успешно отвечает при повторном монтировании.',
      },
    },
  },
};

export const OptionRender1: Story = {
  args: {
    optionRender: v => <Tag>{v.label}</Tag>,
    api: apiFactory().success,
  },
};

const OptionRender2Code = `
<AsyncCheckbox
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
    api: apiFactory().success,
  },
};

export const OptionAfter: Story = {
  args: {
    optionAfter: <Delete />,
    api: apiFactory().success,
  },
};

const ScrollableCode = `
<AsyncCheckbox scrollable={false} api='/api/example/' />
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
    api: apiFactory().success,
  },
};

export const FrontendSearch: Story = {
  args: {
    filterOption: true,
    filterOptionProp: 'label',
    api: apiFactory().success,
  },
};

export const Pagination: Story = {
  args: {
    pagination: true,
    api: paginatedApi,
  },
};

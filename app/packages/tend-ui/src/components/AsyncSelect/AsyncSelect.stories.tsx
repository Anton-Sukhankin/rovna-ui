import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { argTypes } from '@rovna-ui/tools';
import { action } from 'storybook/actions';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Box, Space } from '@rovna-internal/components/grid';
import { Button, Radio } from '@rovna-internal/components/primitives';
import { ApiListResponse } from '@rovna-internal/components/types';
import { ApiFunctionParams } from '@rovna-internal/components/hooks/useApi';
import { getRussianAnimal, getRussianCompany } from '@rovna-internal/components/stories/mockData';
import {
  pendingFixture,
  rejectFixture,
  resolveFixture,
  retryFixture,
  timeoutFixture,
  unauthorizedFixture,
} from '@rovna-internal/components/stories/asyncFixtures';

import { AsyncSelect } from './AsyncSelect';
import { AsyncSelectProps, AsyncSelectRef, Preload as PreloadType } from './types';
import docs from './docs.json';

const data = Array.from({ length: 30 }).map((_, index) => {
  const name = getRussianAnimal(index);

  return {
    id: `animal-${index + 1}`,
    name,
    description: `Описание варианта: ${name}`,
  };
});

type MockData = (typeof data)[number];

const apiFactory = () => {
  return {
    success: (options?: ApiFunctionParams) => {
      console.log('options', options);

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

const meta: Meta<typeof AsyncSelect<MockData>> = {
  title: 'Rovna UI/Main/Components/AsyncSelect',
  component: AsyncSelect,
  argTypes: argTypes(docs),
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

const Template = (args: AsyncSelectProps<MockData>) => {
  const [key, setKey] = React.useState(0);

  return (
    <Space wrap>
      <AsyncSelect {...args} key={key} />
      <Button
        onClick={() => {
          setKey(p => p + 1);
        }}
      >
        Пересоздать
      </Button>
    </Space>
  );
};

const ApiCode = `
<AsyncSelect api={fetchAnimals} />
<AsyncSelect api={{ fn: fetchAnimals }} />
`;
export const Api: Story = {
  args: {
    api: apiFactory().success,
  },
  render: Template,
  parameters: {
    docs: {
      source: {
        code: ApiCode,
      },
    },
  },
};

export const ApiSuccess: Story = {
  args: {
    api: apiFactory().success,
  },
  render: Template,
};

export const ApiError: Story = {
  args: {
    showSearch: true,
    api: apiFactory().error,
  },
  render: Template,
};

export const ApiEmpty: Story = {
  args: {
    api: apiFactory().empty,
  },
  render: Template,
};

export const ApiLoading: Story = {
  args: {
    api: () => pendingFixture<ApiListResponse<MockData>>(),
  },
  render: Template,
};

export const ApiUnauthorized: Story = {
  args: {
    api: () => unauthorizedFixture<ApiListResponse<MockData>>(),
  },
  render: Template,
};

export const ApiTimeout: Story = {
  args: {
    api: () => timeoutFixture<ApiListResponse<MockData>>(),
  },
  render: Template,
};

export const ApiRetry: Story = {
  args: {
    api: retryFixture<ApiListResponse<MockData>>({ results: data }),
  },
  render: Template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('combobox'));
    await waitFor(() => {
      const visibleError = page
        .getAllByText('Непредвиденная ошибка')
        .find(element => element.getClientRects().length > 0);
      expect(visibleError).toBeDefined();
    });
    await userEvent.click(canvas.getByRole('button', { name: 'Пересоздать' }));
    await userEvent.click(canvas.getByRole('combobox'));
    let visibleOption: HTMLElement | undefined;
    await waitFor(() => {
      visibleOption = page
        .getAllByTitle(data[0].name)
        .find(element => element.getClientRects().length > 0);
      expect(visibleOption).toBeDefined();
    });
    await userEvent.click(visibleOption!);
    await waitFor(() => {
      const selectedValue = canvas
        .getAllByTitle(data[0].name)
        .find(element => element.getClientRects().length > 0);
      expect(selectedValue).toBeDefined();
      expect(canvas.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Первая попытка завершается ошибкой. Кнопка «Пересоздать» повторяет запрос успешно.',
      },
    },
  },
};

export const Multiple: Story = {
  args: {
    api: apiFactory().success,
    mode: 'multiple',
  },
  render: Template,
};

export const Tags: Story = {
  args: {
    api: apiFactory().success,
    mode: 'tags',
  },
  render: Template,
};

export const BackendSearch: Story = {
  args: {
    showSearch: true,
    api: apiFactory().success,
  },
  render: Template,
};

export const FrontendSearch: Story = {
  args: {
    optionFilterProp: 'label',
    filterOption: true,
    showSearch: true,
    api: apiFactory().success,
  },
  render: Template,
};

export const BackendSearchMultiple: Story = {
  args: {
    mode: 'multiple',
    showSearch: true,
    api: apiFactory().success,
  },
  render: Template,
};

export const FrontendSearchMultiple: Story = {
  args: {
    mode: 'multiple',
    optionFilterProp: 'label',
    filterOption: true,
    showSearch: true,
    api: apiFactory().success,
  },
  render: Template,
};

const PreloadTemplate = (args: AsyncSelectProps<MockData>) => {
  const [preload, setPreload] = React.useState<PreloadType>('onopen');

  return (
    <Box $display='flex' $flexDirection='column' $gap={16}>
      <Space>
        <AsyncSelect {...args} key={preload} preload={[preload]} />
      </Space>
      <Space>
        <Radio.Group
          defaultValue={preload}
          onChange={v => {
            setPreload(v.target.value as PreloadType);
          }}
          options={[
            { label: 'При открытии', value: 'onopen' },
            { label: 'При загрузке', value: 'onmount' },
            { label: 'При потере фокуса', value: 'onblur' },
            { label: 'При каждом открытии', value: 'oneveryopen' },
            { label: 'При каждой потере фокуса', value: 'oneveryblur' },
          ]}
        />
      </Space>
    </Box>
  );
};

const PreloadCode = `
<AsyncSelect
  api='...'
  preload={[
    'onopen'
  ]}
/>
`;
export const Preload: Story = {
  args: {
    showSearch: true,
    preload: ['onopen'],
    api: apiFactory().success,
  },
  render: PreloadTemplate,
  parameters: {
    docs: {
      source: {
        code: PreloadCode,
      },
    },
  },
};

const OptionRenderCode = `
<AsyncSelect
  api={fetchAnimals}
  optionRender={value => '{value.data.description}, specie {value.data.name}'}
/>
`;
export const OptionRender: Story = {
  args: {
    optionRender: value => `${value.data.description}, specie ${value.data.name}`,
    api: apiFactory().success,
  },
  render: Template,
  parameters: {
    docs: {
      source: {
        code: OptionRenderCode,
      },
    },
  },
};

const DropdownRenderCode = `
<AsyncSelect
  api={fetchAnimals}
  dropdownRender={menu => {
    return (
      <Box>
        {menu}
        <Box $padding='10px 10px 0 10px'>
          <Button
            onClick={action('AsyncSelect extra action')}
            fullWidth
          >
            Нажми на меня
          </Button>
        </Box>
      </Box>
    );
  }}
/>
`;
export const DropdownRender: Story = {
  args: {
    api: apiFactory().success,
    dropdownRender: menu => {
      return (
        <Box>
          {menu}
          <Box $padding='10px 10px 0 10px'>
            <Button
              onClick={action('AsyncSelect extra action')}
              fullWidth
            >
              Нажми на меня
            </Button>
          </Box>
        </Box>
      );
    },
  },
  render: Template,
  parameters: {
    docs: {
      source: {
        code: DropdownRenderCode,
      },
    },
  },
};

const ImperativeRequestCode = `
const Example = () => {
  const ref = React.useRef<AsyncSelectRef>(null);
  return (
    <Space>
      <AsyncSelect ref={ref} api={fetchAnimals} />
      <Button
        onClick={() => {
          ref.current?.request();
        }}
      >
        Imperative request
      </Button>
    </Space>
  );
};
`;
const RequestTemplate = (args: AsyncSelectProps<MockData>) => {
  const ref = React.useRef<AsyncSelectRef>(null);

  return (
    <Space>
      <AsyncSelect {...args} ref={ref} />
      <Button
        onClick={() => {
          ref?.current?.request();
        }}
      >
        Выполнить запрос
      </Button>
    </Space>
  );
};

export const ImperativeRequest: Story = {
  args: {
    optionRender: value => `${value.data.description}, specie ${value.data.name}`,
    api: apiFactory().success,
  },
  render: RequestTemplate,
  parameters: {
    docs: {
      source: {
        code: ImperativeRequestCode,
      },
    },
  },
};

const CacheCode = `
<AsyncSelect api={{ url: '...', cache: { key: 'get-animals-api-unique-key' } }} />;
`;
export const Cache: Story = {
  args: {
    api: {
      url: '/api/async-select/animals/',
      cache: { key: 'get-animals-api-unique-key' },
    },
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story:
          'Нажмите `Remount` и откройте `Select` еще раз, данные будут загружены моментально из кэша',
      },
      source: {
        code: CacheCode,
      },
    },
  },
};

export const Pagination: Story = {
  args: {
    pagination: true,
    api: '/api/async-select/animals/',
  },
  render: Template,
};

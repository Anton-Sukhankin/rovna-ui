import React, { useCallback, useMemo, useState } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownProps,
  Input,
  isContextMenuItem,
} from '@rovna-ui/components/primitives';
import { useControllableState } from '@rovna-ui/hooks';
import { ChevronDown } from '@rovna-ui/icons/ChevronDown';
import { ChevronUp } from '@rovna-ui/icons/ChevronUp';
import { Text } from '@rovna-ui/typography';
import { Box } from '@rovna-ui/grid';
import {
  isDividerOption,
  isLabeledOption as isLabeledProjectOption,
} from '@rovna-ui/types';
import { useApi } from '@rovna-ui/components/hooks';
import { Spinner } from '@rovna-ui/primitives';
import { EmptyOverlay, ErrorOverlay, Skeleton } from '@rovna-ui/components/ui';

import { ProjectLabeledOption, ProjectProps } from './types';
import { mapProjectOptionToDropdownItem, mapProjectOptionToLabeledOption } from './utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _transform = (data: any): ProjectLabeledOption => ({
  value: data?.id,
  label: data?.name,
});

const skeleton: DropdownItem[] = [
  {
    key: '1',
    label: <Skeleton />,
  },
  {
    key: '2',
    label: <Skeleton />,
  },
  {
    key: '3',
    label: <Skeleton />,
  },
  {
    key: '4',
    label: <Skeleton />,
  },
];

const Project = ({
  api,
  options,
  transform = _transform,
  onChange,
  value,
  defaultValue,
  searchable,
  overlayStyle,
}: ProjectProps) => {
  const { loading, request, data, error } = useApi(api);

  const [open, setOpen] = React.useState(false);
  const [_value = [], _setValue] = useControllableState({
    value,
    defaultValue,
    onChange,
  });

  const checked = React.useMemo(
    () =>
      (_value || []).map(v =>
        isLabeledProjectOption(v) ? v.value.toString() : v.toString(),
      ),
    [_value],
  );

  const transformed = React.useMemo(() => {
    if (!data) return [];

    if (!options) return data.results.map(transform);
    const result = data.results.map(transform);
    const extra = mapProjectOptionToLabeledOption(options(result));

    return extra;
  }, [data, options, transform]);

  const items = React.useMemo(() => {
    if (loading) return skeleton;
    if (error)
      return [
        {
          key: 'rovna-ui-header-project-error',
          disabled: true,
          label: <ErrorOverlay />,
        },
      ];
    if (!data) return [];

    return mapProjectOptionToDropdownItem(transformed);
  }, [data, error, loading, transformed]);

  const [_search, _setSearch] = useState('');
  const searchedItems = useMemo(
    () =>
      items.filter(item =>
        isContextMenuItem(item)
          ? item.label?.toString().toLowerCase().includes(_search.toLowerCase())
          : true,
      ),
    [_search, items],
  );

  const content = React.useMemo(() => {
    if (!_value?.length) return 'Выберите проект';
    const v = _value[0];
    if (isLabeledProjectOption(v)) return v.label;
    const founding = transformed.find(item => {
      if (isDividerOption(item)) return false;

      return item.value === v;
    });
    if (!founding) return v;
    if (isDividerOption(founding)) return v;

    return founding.label;
  }, [_value, transformed]);

  React.useEffect(() => {
    request().catch(() => undefined);
  }, [api, request]);

  const icon = React.useMemo(() => {
    if (loading) return <Spinner color='white' size='xs' />;

    return open ? (
      <ChevronUp size={16} color='gray100' />
    ) : (
      <ChevronDown size={16} color='gray100' />
    );
  }, [loading, open]);

  const defaultSelectedKeys = React.useMemo(() => items.map(item => item.key), [items]);

  const searchDropdownRenderHandler = useCallback(
    (menu, searchValue, isEmpty) => (
      <Dropdown.Content display={'flex'} flexDirection={'column'} padding={'0 0 8px'}>
        <Input
          style={{ width: 'unset', margin: '16px 16px 8px' }}
          value={searchValue}
          onChange={e => _setSearch(e.target.value)}
          placeholder={'Поиск'}
          allowClear
        />
        {!isEmpty ? (
          React.cloneElement(
            menu as React.ReactElement<{
              style: React.CSSProperties;
            }>,
            {
              style: {
                boxShadow: 'none',
                borderRadius: 0,
                paddingTop: 0,
                paddingBottom: 0,
              },
            },
          )
        ) : (
          <EmptyOverlay />
        )}
      </Dropdown.Content>
    ),
    [],
  );

  const dropdownItemsProps: Partial<DropdownProps> = searchable
    ? {
        dropdownRender: menu =>
          searchDropdownRenderHandler(menu, _search, !searchedItems.length),
        items: searchedItems,
      }
    : { items };

  return (
    <Dropdown
      overlayStyle={{ minWidth: '256px', ...overlayStyle }}
      overlayClassName='rovna-ui-header-project-dropdown-overlay'
      onOpenChange={setOpen}
      trigger={['click']}
      selectedKeys={checked}
      // FIXME: Поправить типизацию
      defaultSelectedKeys={defaultSelectedKeys as string[]}
      onSelect={keys => {
        const [key] = keys;
        const option = transformed.find(option => {
          if (isDividerOption(option)) return false;
          if (isLabeledProjectOption(option)) return option.value.toString() === key;

          return option === key;
        });
        if (!option) return;
        _setValue([option]);
        _setSearch('');
      }}
      {...dropdownItemsProps}
    >
      <Box $display='flex' $alignItems='center' $gap={8} style={{ cursor: 'pointer' }}>
        <Text color='gray100'>{content}</Text>
        {icon}
      </Box>
    </Dropdown>
  );
};

export { Project };

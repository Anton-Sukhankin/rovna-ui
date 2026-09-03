import React from 'react';
import { VirtualItem, useVirtualizer } from '@tanstack/react-virtual';
import { Text } from '@rovna-ui/typography';
import { UNSTABLE_useControllableStateV2 as useControllableState } from '@rovna-ui/hooks';

import {
  Checkbox,
  CheckboxOptionType,
  CheckboxProps,
  CheckboxValueType,
} from '@rovna-internal/components/primitives/Checkbox';
import { Spinner } from '@rovna-internal/components/primitives/Spinner';
import { Search } from '@rovna-internal/components/components/Search';
import { Box } from '@rovna-internal/components/grid/Box';
import { useTheme } from '@rovna-internal/components/theme/Theme';
import { Scrollable } from '@rovna-internal/components/ui/Scrollable';
import { useFilterOption } from '@rovna-internal/components/hooks/useFilterOption';
import { useCallbackRef } from '@rovna-internal/components/hooks/useCallbackRef';
import { EmptyOverlay } from '@rovna-internal/components/ui/EmptyOverlay';
import { ErrorOverlay } from '@rovna-internal/components/ui/ErrorOverlay';

import { CheckboxGroupSearchProps } from './types';

const createVirtualRootStyle = (size: number): React.CSSProperties => ({
  height: `${size}px`,
  width: '100%',
  position: 'relative',
});
const createVirtualItemStyle = (vi: VirtualItem): React.CSSProperties => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: `${vi.size}px`,
  transform: `translateY(${vi.start}px)`,
});
const createKey = (item: CheckboxOptionType) => {
  if (typeof item.value !== 'boolean') return item.value;

  return item.id;
};

const CheckboxGroupSearch = ({
  optionAfter,
  optionDescription,
  placeholder,
  allowClear,
  showSearch = true,
  virtual = false,
  error = false,
  loading = false,
  filterOption = true,
  filterOptionProp = 'value',
  scrollable = true,
  optionRender,
  options,
  onSearch,
  onChange,
  value,
  onScroll,
  ...props
}: CheckboxGroupSearchProps) => {
  const theme = useTheme();
  const [selectedValues, setSelectedValues] = useControllableState({
    defaultValue: [],
    value,
    onChange,
  });
  const [search, setSearch] = React.useState('');

  const handleSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch?.(e.target.value);
      setSearch(e.target.value);
    },
    [onSearch],
  );

  const handleChange = React.useCallback<NonNullable<CheckboxProps['onChange']>>(
    e => {
      setSelectedValues((previousSelectedValues = []) => {
        const value = e.target.value as CheckboxValueType;
        const checked = e.target.checked as boolean;

        if (checked) {
          return [...previousSelectedValues, value];
        }

        return previousSelectedValues.filter(pValue => pValue !== value);
      });
    },
    [setSelectedValues],
  );

  const createLabel = useCallbackRef(
    (node: React.ReactNode, option: CheckboxOptionType) => {
      if (!optionAfter && !optionDescription) return node;

      const after = typeof optionAfter === 'function' ? optionAfter(option) : optionAfter;
      const description =
        typeof optionDescription === 'function'
          ? optionDescription(option)
          : optionDescription;

      return (
        <Box $display='flex' $alignItems='center'>
          {description ? (
            <Box $display='flex' $flexDirection='column'>
              {node}
              <Text size='small' color='gray650'>
                {description}
              </Text>
            </Box>
          ) : (
            node
          )}
          {after && (
            <Box $flex='1' $display='flex' $justifyContent='flex-end'>
              {after}
            </Box>
          )}
        </Box>
      );
    },
  );

  const _options = React.useMemo<CheckboxOptionType[]>(() => {
    if (!options) return [];

    return options.map(item => ({
      ...item,
      label: optionRender
        ? createLabel(optionRender(item), item)
        : createLabel(item.label, item),
    }));
  }, [createLabel, optionRender, options]);

  const filteredOptions = useFilterOption({
    search,
    filterOption,
    options: _options,
    filterOptionProp,
  });

  const ref = React.useRef<null>(null);
  const rowVirtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => ref.current,
    estimateSize: () => 24,
  });

  const component = React.useMemo(() => {
    if (virtual) {
      return (
        <Checkbox.Group
          style={createVirtualRootStyle(rowVirtualizer.getTotalSize())}
          fullWidth
          layout='vertical'
          {...props}
          value={selectedValues}
        >
          {rowVirtualizer.getVirtualItems().map(virtualItem => {
            const filteredOption = filteredOptions[virtualItem.index];

            return (
              <Checkbox
                style={createVirtualItemStyle(virtualItem)}
                key={createKey(filteredOption)}
                value={filteredOption.value}
                onChange={handleChange}
              >
                {filteredOption.label}
              </Checkbox>
            );
          })}
        </Checkbox.Group>
      );
    }

    return (
      <Checkbox.Group fullWidth layout='vertical' {...props} value={selectedValues}>
        {filteredOptions.map(filteredOption => (
          <Checkbox
            key={createKey(filteredOption)}
            value={filteredOption.value}
            onChange={handleChange}
          >
            {filteredOption.label}
          </Checkbox>
        ))}
      </Checkbox.Group>
    );
  }, [filteredOptions, handleChange, props, rowVirtualizer, selectedValues, virtual]);

  const content = React.useMemo(() => {
    if (filteredOptions.length) return component;
    if (loading) return null;
    if (error) return <ErrorOverlay />;
    if (!filteredOptions.length) return <EmptyOverlay />;

    return component;
  }, [component, error, filteredOptions.length, loading]);

  return (
    <Spinner color={theme.colors.blue600} size='small' loading={loading}>
      <Box $display='flex' $flexDirection='column' $gap={8}>
        {showSearch && (
          <Search
            onChange={handleSearch}
            allowClear={allowClear}
            placeholder={placeholder}
          />
        )}
        {scrollable ? (
          <Scrollable ref={ref} onScroll={onScroll}>
            {content}
          </Scrollable>
        ) : (
          content
        )}
      </Box>
    </Spinner>
  );
};

CheckboxGroupSearch.displayName = 'CheckboxGroupSearch';

export { CheckboxGroupSearch };

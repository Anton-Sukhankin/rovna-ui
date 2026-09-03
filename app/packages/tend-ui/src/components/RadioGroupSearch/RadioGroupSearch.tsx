import React from 'react';
import { VirtualItem, useVirtualizer } from '@tanstack/react-virtual';
import { Text } from '@rovna-ui/typography';

import { Radio } from '@rovna-internal/components/primitives/Radio';
import { Spinner } from '@rovna-internal/components/primitives/Spinner';
import { Search } from '@rovna-internal/components/components/Search';
import { Box } from '@rovna-internal/components/grid/Box';
import { useTheme } from '@rovna-internal/components/theme/Theme';
import { Scrollable } from '@rovna-internal/components/ui/Scrollable';
import { useFilterOption } from '@rovna-internal/components/hooks/useFilterOption';
import { useCallbackRef } from '@rovna-internal/components/hooks/useCallbackRef';
import { EmptyOverlay } from '@rovna-internal/components/ui/EmptyOverlay';
import { ErrorOverlay } from '@rovna-internal/components/ui/ErrorOverlay';

import {
  RadioGroupSearchProps,
  RadioGroupSearchOptionType as RadioOptionType,
} from './types';

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
const createKey = (item: RadioOptionType) => {
  if (typeof item.value !== 'boolean') return item.value;

  return item.id;
};

const RadioGroupSearch = ({
  optionAfter,
  optionDescription,
  placeholder,
  allowClear,
  virtual = false,
  error = false,
  loading = false,
  filterOption = true,
  filterOptionProp = 'value',
  showSearch = true,
  scrollable = true,
  optionRender,
  options,
  onSearch,
  onScroll,
  ...props
}: RadioGroupSearchProps) => {
  const theme = useTheme();
  const [search, setSearch] = React.useState('');

  const handleSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch?.(e.target.value);
      setSearch(e.target.value);
    },
    [onSearch],
  );

  const createLabel = useCallbackRef((node: React.ReactNode, option: RadioOptionType) => {
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
  });

  const _options = React.useMemo<RadioOptionType[]>(() => {
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
  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => ref.current,
    estimateSize: () => 24,
  });

  const component = React.useMemo(() => {
    if (virtual) {
      return (
        <Radio.Group
          style={createVirtualRootStyle(virtualizer.getTotalSize())}
          fullWidth
          layout='vertical'
          {...props}
        >
          {virtualizer.getVirtualItems().map(virtualItem => {
            const option = filteredOptions[virtualItem.index];

            return (
              <Radio
                style={createVirtualItemStyle(virtualItem)}
                key={createKey(option)}
                value={option.value}
                onChange={props?.onChange}
              >
                {option.label}
              </Radio>
            );
          })}
        </Radio.Group>
      );
    }

    return (
      <Radio.Group fullWidth layout='vertical' {...props} options={filteredOptions} />
    );
  }, [filteredOptions, props, virtual, virtualizer]);

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
            aria-label={placeholder ?? 'Поиск по вариантам'}
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

RadioGroupSearch.displayName = 'RadioGroupSearch';

export { RadioGroupSearch };

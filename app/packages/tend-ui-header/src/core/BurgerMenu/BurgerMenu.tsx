import React from 'react';
import { Dropdown } from '@rovna-ui/components/primitives';
import { Empty } from '@rovna-ui/primitives';
import { Apps as AppsIcon } from '@rovna-ui/icons/Apps';
import { Box, Divider } from '@rovna-ui/components/grid';
import { Text } from '@rovna-ui/typography';
import { UNSTABLE_useControllableStateV2 as useControllableState } from '@rovna-ui/hooks';
import chunk from 'lodash/chunk';

import { Button as BurgerButton } from '@rovna-internal/header/ui/Button';

import { Card, Preloader } from './components';
import {
  BurgerMenuGroupItemType,
  BurgerMenuItem,
  BurgerMenuItemType,
  BurgerMenuProps,
} from './types';

const BurgerMenu = ({
  open,
  defaultOpen = false,
  onOpenChange,
  mode = 'single',
  loading,
  error,
  disabled,
  items,
  defaultSelectedKeys,
  selectedKeys,
  onSelect,
  portionSize,
  preloaderVariant = 'samolet',
}: BurgerMenuProps) => {
  const [__open, __setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const [__selectedKeys, __setSelectedKeys] = useControllableState({
    value: selectedKeys,
    defaultValue: defaultSelectedKeys,
    onChange: onSelect,
  });

  const renderItem = React.useCallback(
    (item: BurgerMenuItemType) => {
      if ('type' in item && item.type === 'divider') {
        return <Divider color='gray150-transparent' margin={0} />;
      }

      return (
        <Box key={item.key} $display='flex' $flexDirection='column'>
          <Card
            key={item.key}
            selected={mode !== 'none' && __selectedKeys?.includes(item.key)}
            before={item.icon}
            onClick={() => {
              if (mode === 'none') {
                // В режиме 'none' просто устанавливаем выделение, onSelect вызовется автоматически
                __setSelectedKeys([item.key]);

                return;
              }

              __setSelectedKeys((previous = []) => {
                if (mode === 'single') return [item.key];

                if (previous.includes(item.key))
                  return previous.filter(v => v !== item.key);

                return [...previous, item.key];
              });
            }}
          >
            {item.label}
          </Card>
        </Box>
      );
    },
    [__selectedKeys, __setSelectedKeys, mode],
  );

  const renderGroup = React.useCallback(
    (item: BurgerMenuGroupItemType) => {
      return (
        <Box key={item.key} $display='flex' $flexDirection='column'>
          <Text style={{ padding: 8 }} strong>
            {item.label}
          </Text>
          {item.children?.map(service => (
            <Card
              key={service.key}
              selected={mode !== 'none' && __selectedKeys?.includes(service.key)}
              before={service.icon}
              onClick={() => {
                if (mode === 'none') {
                  // В режиме 'none' просто устанавливаем выделение, onSelect вызовется автоматически
                  __setSelectedKeys([service.key]);

                  return;
                }

                __setSelectedKeys((previous = []) => {
                  if (mode === 'single') return [service.key];

                  if (previous.includes(service.key))
                    return previous.filter(v => v !== service.key);

                  return [...previous, service.key];
                });
              }}
            >
              {service.label}
            </Card>
          ))}
        </Box>
      );
    },
    [__selectedKeys, __setSelectedKeys, mode],
  );

  const render = React.useCallback(
    (items: BurgerMenuItem[]) => {
      const allGroups = items.filter(item => 'type' in item && item.type === 'group');
      const others = items.filter(
        item => ('type' in item && item.type === 'divider') || !('type' in item),
      );

      return (
        <>
          {others.length > 0 && (
            <Box key='services' $display='flex' $flexDirection='column'>
              {others.map((item, index) => {
                if ('type' in item && item.type === 'divider') {
                  return <Divider key={index} color='gray150-transparent' margin={24} />;
                }

                return renderItem(item);
              })}
            </Box>
          )}
          {chunk(allGroups, portionSize).map((portion, index) => {
            return (
              <Box key={index} $display='flex' $gap={8}>
                {portion.map(renderGroup)}
              </Box>
            );
          })}
        </>
      );
    },
    [portionSize, renderGroup, renderItem],
  );

  const content = React.useMemo(() => {
    if (error) return <Empty variant='error' title='Произошла непредвиденная ошибка' />;
    if (loading) return <Preloader variant={preloaderVariant} />;

    return (
      <Box $display='flex' $flexDirection='column' $gap={24}>
        {render(items)}
      </Box>
    );
  }, [error, loading, render, items, preloaderVariant]);

  const dropdownRender = React.useCallback(
    () => <Dropdown.Content padding={24}>{content}</Dropdown.Content>,
    [content],
  );

  return (
    <Dropdown
      disabled={disabled}
      trigger={['click']}
      onOpenChange={__setOpen}
      dropdownRender={dropdownRender}
    >
      <BurgerButton
        aria-label='Открыть меню приложений'
        className='rovna-ui-burger-menu-button'
        disabled={disabled}
        selected={__open}
      >
        <AppsIcon size={24} color='gray0' />
      </BurgerButton>
    </Dropdown>
  );
};

BurgerMenu.displayName = 'BurgerMenu';

export { BurgerMenu };

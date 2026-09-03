import React from 'react';
import { Box } from '@rovna-ui/grid';
import { Text, Title } from '@rovna-ui/typography';
import { ArrowBack } from '@rovna-ui/icons/ArrowBack';
import { ChevronRight } from '@rovna-ui/icons/ChevronRight';
import { UNSTABLE_useControllableStateV2 as useControllableState } from '@rovna-ui/hooks';

import { Counter } from '../Counter';
import { Dot } from '../Dot';
import { Drawer } from '../Drawer';
import {
  Counter as CounterType,
  Dot as DotType,
  StackNavigationItem as NavigationItemType,
  StackNavigationProps,
} from './types';
import {
  isDividerStackNavigationItemType,
  isGroupStackNavigationItemType,
  isStackNavigationItemType,
  isSubStackNavigationItemType,
} from './utils';
import { NavigationItem } from './components/NavigationItem';
import { NavigationGroupItem } from './components/NavigationGroupItem';
import { NavigationList } from './components/NavigationList';
import { Root } from './styled';

const Badge = ({ badge }: { badge: DotType | CounterType }) => {
  switch (badge?.type) {
    case 'counter':
      return <Counter preset='blue' {...badge} />;
    case 'dot':
      return <Dot preset='blue' {...badge} />;

    default:
      return null;
  }
};

const StackNavigation = ({
  items,
  defaultSelectedKeys,
  selectedKeys,
  onSelect,
}: StackNavigationProps) => {
  const [stack, setStack] = React.useState<NavigationItemType[]>([]);
  const [__selectedKeys = [], __setSelectedKeys] = useControllableState<string[]>({
    value: selectedKeys,
    defaultValue: defaultSelectedKeys,
    onChange: onSelect,
  });

  const keys = stack.map(value => value.key).filter(Boolean) as string[];

  const push = React.useCallback((item: NavigationItemType) => {
    setStack(prevStack => [...prevStack, item]);
  }, []);

  const pop = React.useCallback(() => {
    setStack(prevStack => prevStack.slice(0, -1));
  }, []);

  const createHandler = React.useCallback(
    (item: NavigationItemType) => {
      return (domEvent: React.MouseEvent<HTMLElement>) => {
        if (!isDividerStackNavigationItemType(item)) {
          item?.onClick?.({ domEvent });
        }

        const hasChildren = 'children' in item;

        if (!hasChildren) {
          const add = [item.key] as string[];
          /**
           * С цель сохранить совместимость интерфейсов Menu из antd (Menu в antd собирает путь в реверсном порядке)
           * собирать путь нужно в обратном порядке
           */
          const path = stack
            .slice(0)
            .reverse()
            .map(v => v.key) as string[];

          __setSelectedKeys(add.concat(path));
          setStack([]);

          return;
        }

        push(item);
      };
    },
    [push, __setSelectedKeys, stack],
  );

  const isSelected = React.useCallback(
    (key = '') => __selectedKeys.includes(key),
    [__selectedKeys],
  );

  const last = stack[stack.length - 1];
  const title = last && !isDividerStackNavigationItemType(last) && last?.label;

  /**
   * Из-за сложной логики вложенности навигации
   * приходится проверять прошлого и следующего предка
   * чтобы понимать какое закругление нужно давать элементу
   */
  const borderRadius = React.useCallback(
    (previousSibling?: NavigationItemType, nextSibling?: NavigationItemType) => {
      const [, borderRadius] =
        (
          [
            [!previousSibling && !nextSibling, '16px'],
            [!previousSibling, '16px 16px 0 0'],
            [!previousSibling, '16px 16px 0 0'],
            [!nextSibling, '0 0 16px 16px'],
            [
              previousSibling && isGroupStackNavigationItemType(previousSibling),
              '16px 16px 0 0',
            ],
            [nextSibling && isGroupStackNavigationItemType(nextSibling), '0 0 16px 16px'],
          ] as const
        ).filter(([condition]) => !!condition)[0] || [];

      return borderRadius;
    },
    [],
  );

  const render = React.useCallback(
    (
      item: NavigationItemType,
      previousSibling?: NavigationItemType,
      nextSibling?: NavigationItemType,
    ) => {
      if (isGroupStackNavigationItemType(item)) {
        return (
          <React.Fragment key={item.key}>
            <NavigationGroupItem>
              <Text size='small' color='gray500'>
                {item.label}
              </Text>
              {item.children && (
                <NavigationList style={{ marginTop: '8px' }}>
                  {item.children.map((v, index, self) =>
                    render(v, self[index - 1], self[index + 1]),
                  )}
                </NavigationList>
              )}
            </NavigationGroupItem>
          </React.Fragment>
        );
      }

      if (isSubStackNavigationItemType(item))
        return (
          <React.Fragment key={item.key}>
            <NavigationItem
              onClick={createHandler(item)}
              borderRadius={borderRadius(previousSibling, nextSibling)}
            >
              <Box
                className='rovna-ui-stack-navigation-item-content'
                $display='flex'
                $alignItems='center'
                $gap={8}
                $width='100%'
              >
                {item.icon}
                <Text
                  color={isSelected(item.key) ? 'blue600' : undefined}
                  style={{ flex: '1' }}
                >
                  {item.label}
                </Text>
                {item.badge && <Badge badge={item.badge} />}
                <ChevronRight size={24} color='gray200' />
              </Box>
            </NavigationItem>
            {item.children && (
              <Drawer.Root
                fullscreen={{ offset: '0px' }}
                backgroundColor='gray50'
                open={keys.includes(item.key || '')}
              >
                <Drawer.Header>
                  <Box $display='flex' $alignItems='center' $gap={8} $width='100%'>
                    <ArrowBack onClick={pop} size={24} />
                    <Title margin={0} level='h6'>
                      {title}
                    </Title>
                  </Box>
                </Drawer.Header>
                <Drawer.Body>
                  <NavigationList>
                    {item.children.map((v, index, self) =>
                      render(v, self[index - 1], self[index + 1]),
                    )}
                  </NavigationList>
                </Drawer.Body>
              </Drawer.Root>
            )}
          </React.Fragment>
        );

      if (isStackNavigationItemType(item)) {
        return (
          <NavigationItem
            key={item.key}
            borderRadius={borderRadius(previousSibling, nextSibling)}
            onClick={createHandler(item)}
          >
            <Box
              className='rovna-ui-stack-navigation-item-content'
              $display='flex'
              $alignItems='center'
              $gap={8}
              $width='100%'
            >
              {item.icon}
              <Text
                color={isSelected(item.key) ? 'blue600' : undefined}
                style={{ flex: '1' }}
              >
                {item.label}
              </Text>
              {item.badge && <Badge badge={item.badge} />}
            </Box>
          </NavigationItem>
        );
      }

      return null;
    },
    [createHandler, isSelected, keys, pop, title, borderRadius],
  );

  return (
    <Root className='rovna-ui-stack-navigation-root'>
      {(items || []).map((item, index, self) =>
        render(item, self[index - 1], self[index + 1]),
      )}
    </Root>
  );
};

StackNavigation.displayName = 'StackNavigation';

export { StackNavigation };

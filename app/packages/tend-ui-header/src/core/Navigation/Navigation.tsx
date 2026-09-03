import React from 'react';
import AntConfigProvider from 'antd-core/es/config-provider';
import { useTheme } from '@rovna-ui/theme';
import { Box } from '@rovna-ui/grid';
import { Dot } from '@rovna-ui/components/ui';
import { Counter } from '@rovna-ui/components/primitives';
import { ChevronDown } from '@rovna-ui/icons/ChevronDown';
import { ChevronUp } from '@rovna-ui/icons/ChevronUp';
import type { ItemType as RcItemType } from 'rc-menu/lib/interface';
import merge from 'lodash/merge';

import { Root } from './styled';
import { Counter as CounterType, Dot as DotType, NavigationItem } from '../types';
import { NavigationProps, NavigationStylingSchema } from './types';

const Label: React.FC<{ after?: React.ReactNode; badge?: DotType | CounterType }> = ({
  after,
  children,
  badge,
}) => {
  switch (badge?.type) {
    case 'dot': {
      return (
        <Box
          as='span'
          $display='flex'
          $alignItems='center'
          $justifyContent='space-between'
          $gap={4}
        >
          <span className='rovna-ui-menu-item-label'>{children}</span>
          <Dot color='blue700' />
          {after}
        </Box>
      );
    }
    case 'counter': {
      return (
        <Box
          as='span'
          $display='flex'
          $alignItems='center'
          $justifyContent='space-between'
          $gap={4}
        >
          <span className='rovna-ui-menu-item-label'>{children}</span>
          <Counter backgroundColor='blue700' color='white800-transparent' {...badge} />
          {after}
        </Box>
      );
    }

    default:
      return (
        <Box
          as='span'
          $display='flex'
          $alignItems='center'
          $justifyContent='space-between'
          $gap={4}
        >
          <span className='rovna-ui-menu-item-label'>{children}</span>
          {after}
        </Box>
      );
  }
};

const traverse = (menu: NavigationItem, openedKeys: string[]): RcItemType => {
  if (!menu) return menu;
  if ('type' in menu) return menu;
  if ('children' in menu) {
    const { badge } = menu;
    const isOpened = openedKeys.includes(menu.key);
    const after = isOpened ? <ChevronUp /> : <ChevronDown />;

    return {
      ...menu,
      popupOffset: [-8, 0],
      label: (
        <Label after={after} badge={badge}>
          {menu.label}
        </Label>
      ),
      children: menu.children?.map(menu => traverse(menu, openedKeys)),
    };
  }

  const { badge } = menu;

  return {
    ...menu,
    label: <Label badge={badge}>{menu.label}</Label>,
  };
};

/**
 * @internal Не для публичного использования
 * TODO: Переписать на свою реализацию, antd очень ограничен
 */
const Navigation = ({
  items = [],
  defaultSelectedKeys,
  selectedKeys,
  onSelect,
  styling,
}: React.PropsWithChildren<NavigationProps>) => {
  const theme = useTheme();
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const _styling = React.useMemo<NavigationStylingSchema>(
    () =>
      merge<NavigationStylingSchema, NavigationStylingSchema | undefined>(
        {
          tabDefaultBg: theme.colors.blue600,
          tabActiveBg: theme.colors.blue700,
          tabHoverBg: theme.colors['gray100-transparent'],
          tabPressedBg: theme.colors['gray200-transparent'],
          tabActiveHoverBg: theme.colors.blue800,
          tabActivePressedBg: theme.colors.blue800,

          tabDefaultIcon: '',
          tabHoverIcon: '',

          defaultText: theme.colors.gray0,
          hoverText: theme.colors.gray0,
          pressedText: theme.colors.gray0,
          activeText: theme.colors.gray0,
          activeHoverText: theme.colors.gray0,
          activePressedText: theme.colors.gray0,
        },
        styling,
      ),
    [styling, theme.colors],
  );

  const [openedKeys, setOpenedKeys] = React.useState<string[]>([]);
  const overflowedIndicator = React.useMemo(() => {
    const isOpened = openedKeys.includes('rc-menu-more');

    return (
      <Box as='span' $display='flex' $alignItems='center' $gap={4}>
        <span className='rovna-ui-menu-item-label'>Ещё</span>
        {isOpened ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </Box>
    );
  }, [openedKeys]);

  const handleOpenChange = React.useCallback((path: string[]) => {
    setOpenedKeys(path);
  }, []);

  const handleSelect = React.useCallback(
    (info: { keyPath: string[] }) => {
      onSelect?.(info.keyPath);
    },
    [onSelect],
  );

  React.useLayoutEffect(() => {
    const syncPopupReferences = () => {
      rootRef.current
        ?.querySelectorAll<HTMLElement>('[data-menu-id][aria-haspopup="true"]')
        .forEach(item => {
          const fallbackId = `${item.dataset.menuId}-popup`;
          const controlledId = item.getAttribute('aria-controls') || fallbackId;
          const popupExists = Boolean(document.getElementById(controlledId));

          if (item.getAttribute('aria-expanded') === 'true' && popupExists) {
            item.setAttribute('aria-controls', controlledId);
          } else if (!popupExists) {
            item.removeAttribute('aria-controls');
          }
        });
    };
    const syncHiddenOverflowItems = () => {
      rootRef.current
        ?.querySelectorAll<HTMLElement>('.rovna-ui-menu-overflow-item')
        .forEach(item => {
          if (item.getAttribute('aria-hidden') === 'true') {
            item.setAttribute('inert', '');
            item.dataset.tendUiOverflowInert = 'true';
          } else if (item.dataset.tendUiOverflowInert === 'true') {
            item.removeAttribute('inert');
            delete item.dataset.tendUiOverflowInert;
          }
        });
    };
    const syncAccessibility = () => {
      syncPopupReferences();
      syncHiddenOverflowItems();
    };
    const observer = new MutationObserver(syncAccessibility);
    observer.observe(document.body, {
      attributeFilter: ['aria-controls', 'aria-expanded', 'aria-hidden'],
      attributes: true,
      childList: true,
      subtree: true,
    });
    syncAccessibility();

    return () => observer.disconnect();
  }, []);

  return (
    <AntConfigProvider
      theme={{
        components: {
          Menu: {
            colorBgContainer: 'transparent',
            itemHeight: 28,
            itemHoverBg: theme.colors['gray50-transparent'],
            itemActiveBg: theme.colors['gray50-transparent'],
            itemSelectedBg: theme.colors['gray50-transparent'],
            itemMarginBlock: 0,
            itemMarginInline: 0,
            subMenuItemBorderRadius: 0,
            horizontalItemBorderRadius: 16,
            groupTitleFontSize: 12,
            groupTitleLineHeight: '16px',
            groupTitleColor: theme.colors.gray650,
            activeBarHeight: 0,
          },
        },
      }}
    >
      <div ref={rootRef} style={{ display: 'contents' }}>
        <Root
          $theme={theme}
          $styling={_styling}
          defaultSelectedKeys={defaultSelectedKeys}
          selectedKeys={selectedKeys}
          mode='horizontal'
          expandIcon={null}
          items={items.map(item => traverse(item, openedKeys))}
          onSelect={handleSelect}
          overflowedIndicator={overflowedIndicator}
          onOpenChange={handleOpenChange}
          triggerSubMenuAction='click'
        />
      </div>
    </AntConfigProvider>
  );
};

Navigation.displayName = 'Header.Navigation';

export { Navigation };

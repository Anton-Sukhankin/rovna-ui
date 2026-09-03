import React from 'react';
import { ChevronDown } from '@rovna-ui/icons/ChevronDown';
import { ChevronUp } from '@rovna-ui/icons/ChevronUp';

import { useTheme } from '@rovna-internal/components/theme/Theme';
import { Box } from '@rovna-internal/components/grid/Box';
import { Badge } from '@rovna-internal/components/primitives/Badge';

import { BadgeType, MenuItemType, MenuProps, MenuRef } from './types';
import { Root } from './styled';

const Label: React.FC<{ after?: React.ReactNode; badge?: BadgeType }> = ({
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
          {children}
          {after}
          <Badge preset='blue' />
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
          {children}
          {after}
          <Badge preset='blue' {...badge} />
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
          {children}
          {after}
        </Box>
      );
  }
};

const traverse = (menu: MenuItemType, openedKeys: string[]): MenuItemType => {
  if (!menu) return menu;
  if ('type' in menu) return menu;
  if ('children' in menu) {
    const { badge } = menu;
    const isOpened = openedKeys.includes(menu.key);
    const after = isOpened ? <ChevronUp /> : <ChevronDown />;

    return {
      ...menu,
      label: (
        <Label after={after} badge={badge}>
          {menu.label}
        </Label>
      ),
      children: menu.children.map(menu => traverse(menu, openedKeys)),
    };
  }

  const { badge } = menu;

  return {
    ...menu,
    label: <Label badge={badge}>{menu.label}</Label>,
  };
};

const useMenus = (menus: MenuItemType[], openedKeys: string[]) => {
  return React.useMemo(
    () => menus.map(menu => traverse(menu, openedKeys)),
    [menus, openedKeys],
  );
};

/**
 * @internal Не для публичного использования
 */
const Menu = React.forwardRef<MenuRef, MenuProps>(
  ({ items = [], trigger = 'click', ...props }, ref) => {
    const theme = useTheme();
    const [openedKeys, setOpenedKeys] = React.useState<string[]>([]);
    const menus = useMenus(items, openedKeys);
    const overflowedIndicator = React.useMemo(() => {
      const isOpened = openedKeys.includes('rc-menu-more');

      return (
        <Box as='span' $display='flex' $alignItems='center' $gap={4}>
          Еще
          {isOpened ? <ChevronUp /> : <ChevronDown />}
        </Box>
      );
    }, [openedKeys]);

    const handleOpenChange = React.useCallback((path: string[]) => {
      setOpenedKeys(path);
    }, []);

    return (
      <Root
        overflowedIndicator={overflowedIndicator}
        {...props}
        ref={ref}
        $theme={theme}
        items={menus}
        mode='horizontal'
        expandIcon={null}
        onOpenChange={handleOpenChange}
        triggerSubMenuAction={trigger}
      />
    );
  },
);

Menu.displayName = 'Menu';

export { Menu };

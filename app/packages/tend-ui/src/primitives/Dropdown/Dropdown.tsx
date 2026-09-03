import React from 'react';
import { isString } from '@rovna-ui/utils/isString';
import { ChevronRight } from '@rovna-ui/icons/ChevronRight';
import { useControllableState } from '@rovna-ui/hooks';
import { Done } from '@rovna-ui/icons/Done';

import { Root, Content as _Content } from './styled';
import { DropdownItem, DropdownProps, DropdownRef, isContextMenuItem } from './types';

type MenuProps = NonNullable<DropdownProps['menu']>;
type MenuClickHandler = NonNullable<MenuProps['onClick']>;
type Item = NonNullable<MenuProps['items']>[0];

const flatten = (items: DropdownItem[]): DropdownItem[] => {
  return items.flatMap(item => {
    if ('children' in item) return [item, ...flatten(item.children || [])];

    return item;
  });
};

const Content: React.FC<{
  padding?: React.CSSProperties['padding'];
  width?: React.CSSProperties['width'];
  display?: React.CSSProperties['display'];
  flexDirection?: React.CSSProperties['flexDirection'];
}> = ({ children, width, padding = '16px', display, flexDirection }) => (
  <_Content
    className='rovna-ui-dropdown-content'
    $display={display}
    $flexDirection={flexDirection}
    $padding={padding}
    $width={width}
  >
    {children}
  </_Content>
);

const BaseDropdown = React.forwardRef<DropdownRef, DropdownProps>(
  (
    {
      mode = 'single',
      children,
      content,
      dropdownRender,
      menu,
      selectedKeys,
      defaultSelectedKeys,
      onSelect,
      items,
      onClick,
      ...props
    },
    ref,
  ) => {
    const state = React.useMemo<Record<string, boolean>>(
      () =>
        flatten(items || []).reduce<Record<string, boolean>>((result, cv) => {
          if (!isContextMenuItem(cv)) return result;
          result[cv.key] = !!cv.selectable;

          return result;
        }, {}),
      [items],
    );

    const [_selectedKeys, setSelectedKeys] = useControllableState<string[]>({
      defaultValue: defaultSelectedKeys,
      value: selectedKeys,
      onChange: onSelect,
    });

    const child = isString(children) ? <span>{children}</span> : children;

    const _dropdownRender = React.useCallback(
      (node: React.ReactNode) => {
        if (dropdownRender) return dropdownRender(node);
        if (content) return <Content>{content}</Content>;

        return node;
      },
      [content, dropdownRender],
    );

    const isSelected = React.useCallback(
      (key: string) => _selectedKeys?.includes(key),
      [_selectedKeys],
    );

    const handleClick = React.useCallback<MenuClickHandler>(
      info => {
        onClick?.(info.keyPath);
        const key = info.key;
        const isSelectable = state[key];
        if (!isSelectable) return;
        if (mode === 'single') {
          if (_selectedKeys?.includes(key)) {
            setSelectedKeys([]);
          } else {
            setSelectedKeys([key]);
          }
        } else {
          if (_selectedKeys?.includes(key)) {
            setSelectedKeys(p => p?.filter(v => v !== key));
          } else {
            setSelectedKeys(p => [...(p || []), key]);
          }
        }
      },
      [_selectedKeys, mode, onClick, setSelectedKeys, state],
    );

    const _items = React.useMemo(() => {
      function traverse(item: DropdownItem): Item {
        if (isContextMenuItem(item)) {
          return {
            ...item,
            itemIcon: isSelected(item.key) ? (
              <Done style={{ marginLeft: '8px' }} size={16} color='blue600' />
            ) : null,
          };
        }

        if ('children' in item) {
          return {
            ...item,
            children: item.children?.map(traverse),
          };
        }

        return item;
      }

      return items?.map(traverse);
    }, [isSelected, items]);

    const _menu = React.useMemo(
      () => ({
        expandIcon: <ChevronRight />,
        items: _items,
        onClick: handleClick,
        ...menu,
      }),
      [_items, handleClick, menu],
    );

    return (
      <Root {...props} ref={ref} dropdownRender={_dropdownRender} menu={_menu}>
        {child}
      </Root>
    );
  },
);

/**
 * TODO: Должен быть ContextMenu компонент
 */
export const Dropdown = Object.assign(BaseDropdown, {
  displayName: 'Dropdown',
  Content,
});

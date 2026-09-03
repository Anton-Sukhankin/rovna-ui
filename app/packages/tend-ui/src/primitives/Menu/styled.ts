import React from 'react';
import Menu, { MenuProps } from 'antd-core/es/menu';
import styled, { DefaultTheme } from 'styled-components';

import { MenuRef } from './types';

type RootProps = { $theme: DefaultTheme };
export const Root = styled(Menu)<RootProps>`
  &.rovna-ui-menu-light.rovna-ui-menu-horizontal > .rovna-ui-menu-item-selected,
  &.rovna-ui-menu-light
    > .rovna-ui-menu.rovna-ui-menu-horizontal
    > .rovna-ui-menu-item-selected,
  &.rovna-ui-menu-light.rovna-ui-menu-horizontal > .rovna-ui-menu-submenu-selected,
  &.rovna-ui-menu-light
    > .rovna-ui-menu.rovna-ui-menu-horizontal
    > .rovna-ui-menu-submenu-selected {
    background: ${props => props.$theme.colors.blue100};
  }

  &.rovna-ui-menu-horizontal {
    height: 32px;
    line-height: 1;
    border-bottom: none;
    .rovna-ui-menu-item,
    .rovna-ui-menu-submenu {
      padding: 6px 12px;
      display: flex;
      align-items: center;
      gap: 8px;

      &:first-child {
        margin-right: 4px;
      }
      &:last-child {
        margin-left: 4px;
      }
      &:not(:first-child):not(:last-child) {
        margin-left: 4px;
        margin-right: 4px;
      }

      /*
        Antd вешает стили из меню на span рядом с классом .anticon. Переопределяем
      */
      .rovna-ui-menu-item .rovna-ui-menu-item-icon + .rovna-ui-badge-root,
      .rovna-ui-menu-submenu-title .rovna-ui-menu-item-icon + .rovna-ui-badge-root,
      .rovna-ui-menu-item .anticon + .rovna-ui-badge-root,
      .rovna-ui-menu-submenu-title .anticon + .rovna-ui-badge-root {
        margin-inline-start: 0px;
      }
    }
  }
` as (
  props: MenuProps &
    RootProps & {
      ref?: React.ForwardedRef<MenuRef>;
    },
) => React.ReactElement;

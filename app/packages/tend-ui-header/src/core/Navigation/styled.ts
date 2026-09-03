import React from 'react';
import Menu, { MenuProps } from 'antd-core/es/menu';
import styled, { DefaultTheme, css } from 'styled-components';

import { NavigationStylingSchema } from './types';

const colorized = (color?: string) => {
  if (!color) return;
  if (color?.includes('gradient'))
    return css`
      background: ${color};
      background-clip: text;
      -webkit-text-fill-color: transparent;
    `;

  return css`
    color: ${color};
  `;
};

type RootProps = { $theme: DefaultTheme; $styling: NavigationStylingSchema };
export const Root = styled(Menu)<RootProps>`
  &.rovna-ui-menu-horizontal {
    min-width: 0;
    flex: auto;
    margin-right: 275px;

    height: 24px;
    line-height: 1;
    border-bottom: none;

    .rovna-ui-menu-item,
    .rovna-ui-menu-submenu {
      padding: 2px 8px;
      display: flex;
      align-items: center;
      gap: 8px;

      /* Стили на пункт меню с children еще "Еще" */
      .rovna-ui-menu-submenu-title {
        color: ${props => props.$styling.defaultText};
      }
      &:not(.rovna-ui-menu-item-selected, .rovna-ui-menu-submenu-selected) {
        background: ${props => props.$styling.tabDefaultBg};
        .rovna-ui-menu-item-label {
          ${props => colorized(props.$styling.defaultText)};

          > a {
            color: inherit;
          }
        }
        .rovna-ui-icon-root {
          color: ${props => props.$styling.tabDefaultIcon};
        }
      }

      &:hover {
        .rovna-ui-menu-item-label {
          -webkit-text-fill-color: unset;
          color: ${props => props.$styling.hoverText};
        }
        .rovna-ui-icon-root {
          color: ${props => props.$styling.tabHoverIcon};
        }

        /* Стили на пункт меню с children еще "Еще" */
        .rovna-ui-menu-submenu-title {
          color: ${props => props.$styling.hoverText} !important;
        }

        background: ${props => props.$styling.tabHoverBg};
      }

      &.rovna-ui-menu-item-selected,
      &.rovna-ui-menu-submenu-selected {
        color: ${props => props.$styling.activeText};

        .rovna-ui-menu-item-label,
        .rovna-ui-menu-submenu-title {
          color: ${props => props.$styling.activeText};
          -webkit-text-fill-color: unset;

          > a {
            color: inherit;
          }
        }
        background: ${props => props.$styling.tabActiveBg};

        &:hover {
          background: ${props => props.$styling.tabActiveHoverBg};
        }
      }

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

    /* Пункт меню без children hover */
    .rovna-ui-menu-overflow-item.rovna-ui-menu-item-active {
      .rovna-ui-dot-dot {
        background: ${props => props.$theme.colors['white700-transparent']};
      }
      .rovna-ui-counter-counter {
        color: ${props => props.$theme.colors.blue700};
        background: ${props => props.$theme.colors['white700-transparent']};
      }
    }
    /* Пункт меню без children selected */
    .rovna-ui-menu-overflow-item.rovna-ui-menu-item-selected {
      .rovna-ui-dot-dot {
        background: ${props => props.$theme.colors['white700-transparent']};
      }
      .rovna-ui-counter-counter {
        color: ${props => props.$theme.colors.blue700};
        background: ${props => props.$theme.colors['white700-transparent']};
      }
    }
    /* Пункт меню с children hover */
    .rovna-ui-menu-overflow-item.rovna-ui-menu-submenu-active {
      .rovna-ui-dot-dot {
        background: ${props => props.$theme.colors['white700-transparent']};
      }
      .rovna-ui-counter-counter {
        color: ${props => props.$theme.colors.blue700};
        background: ${props => props.$theme.colors['white700-transparent']};
      }
    }
    /* Пункт меню с children selected */
    .rovna-ui-menu-overflow-item.rovna-ui-menu-submenu-selected {
      .rovna-ui-dot-dot {
        background: ${props => props.$theme.colors['white700-transparent']};
      }
      .rovna-ui-counter-counter {
        color: ${props => props.$theme.colors.blue700};
        background: ${props => props.$theme.colors['white700-transparent']};
      }
    }
  }
` as (props: MenuProps & RootProps) => React.ReactElement;

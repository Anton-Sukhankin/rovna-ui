import React from 'react';
import AntTable, { TableProps as AntTableProps } from 'antd-core/es/table';
import styled, { DefaultTheme, css } from 'styled-components';

import { TableRef } from './types';

type RootProps = {
  $theme: DefaultTheme;
  $size: 'large' | 'medium' | 'small';
  $pointer: boolean;
};

export const Root = styled(AntTable).attrs({
  $sizes: {
    large: css`
      /* Отступы контента */
      &.rovna-ui-table-wrapper .rovna-ui-table .rovna-ui-table-tbody > tr > td {
        padding: 20px 12px;
      }
      /* Шрифты заголовка */
      &.rovna-ui-table-wrapper .rovna-ui-table-thead > tr > th,
      &.rovna-ui-table-wrapper .rovna-ui-table-thead > tr > td {
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
      }
      /* Шрифты контента */
      &.rovna-ui-table-wrapper .rovna-ui-table-tbody > tr > td {
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
      }
    `,
    medium: css`
      /* Отступы контента */
      &.rovna-ui-table-wrapper .rovna-ui-table .rovna-ui-table-tbody > tr > td {
        padding: 12px;
      }
      /* Шрифты заголовка */
      &.rovna-ui-table-wrapper .rovna-ui-table-thead > tr > th,
      &.rovna-ui-table-wrapper .rovna-ui-table-thead > tr > td {
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
      }
      /* Шрифты контента */
      &.rovna-ui-table-wrapper .rovna-ui-table-tbody > tr > td {
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
      }
    `,
    small: css`
      /* Отступы хедера */
      &.rovna-ui-table-wrapper
        .rovna-ui-table.rovna-ui-table-small
        .rovna-ui-table-tbody
        > tr
        > td {
        padding: 10px 12px;
      }
      /* Шрифты заголовка */
      &.rovna-ui-table-wrapper .rovna-ui-table-thead > tr > th,
      &.rovna-ui-table-wrapper .rovna-ui-table-thead > tr > td {
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
      }
      /* Шрифты контента */
      &.rovna-ui-table-wrapper .rovna-ui-table-tbody > tr > td {
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
      }
    `,
  },
})<RootProps>`
  &.rovna-ui-table-wrapper .rovna-ui-table-summary {
    background-color: ${props => props.$theme.colors.gray50};
  }

  /* Боковая линия при закреплении столбцов слева */
  &.rovna-ui-table-wrapper
    .rovna-ui-table-ping-left
    .rovna-ui-table-cell-fix-left-first::after,
  &.rovna-ui-table-wrapper
    .rovna-ui-table-ping-left
    .rovna-ui-table-cell-fix-left-last::after {
    border-left: 1px solid ${props => props.$theme.colors.gray150};
  }

  /* Вертикальное выравнивание */
  &.rovna-ui-table-wrapper .rovna-ui-table-cell,
  &.rovna-ui-table-wrapper .rovna-ui-table-thead > tr > th,
  &.rovna-ui-table-wrapper .rovna-ui-table-tbody > tr > th,
  &.rovna-ui-table-wrapper .rovna-ui-table-tbody > tr > td,
  &.rovna-ui-table-wrapper tfoot > tr > th,
  &.rovna-ui-table-wrapper tfoot > tr > td {
    vertical-align: top;
  }
  /* Подсветка строка */
  .rovna-ui-table-row-error {
    .rovna-ui-table-cell {
      background-color: ${props => props.$theme.colors.red100};
      &.rovna-ui-table-cell-row-hover {
        background-color: ${props => props.$theme.colors.red200};
      }
    }
  }
  .rovna-ui-table-row-warning {
    .rovna-ui-table-cell {
      background-color: ${props => props.$theme.colors.gold100};
      &.rovna-ui-table-cell-row-hover {
        background-color: ${props => props.$theme.colors.gold200};
      }
    }
  }
  .rovna-ui-table-row-success {
    .rovna-ui-table-cell {
      background-color: ${props => props.$theme.colors.green100};
      &.rovna-ui-table-cell-row-hover {
        background-color: ${props => props.$theme.colors.green200};
      }
    }
  }

  &.rovna-ui-table-wrapper {
    width: 100%;
    max-width: 100%;
    min-width: 0;

    .rovna-ui-table-container,
    .rovna-ui-table-content {
      max-width: 100%;
    }

    .rovna-ui-table-content {
      overflow-x: auto;
    }

    /* Removing header mini-border */
    .rovna-ui-table-thead
      > tr
      > th:not(:last-child):not(.rovna-ui-table-selection-column):not(
        .rovna-ui-table-row-expand-icon-cell
      ):not([colspan])::before,
    .rovna-ui-table-thead
      > tr
      > td:not(:last-child):not(.rovna-ui-table-selection-column):not(
        .rovna-ui-table-row-expand-icon-cell
      ):not([colspan])::before {
      content: none;
    }

    .rovna-ui-table-row-expand-icon {
      border-radius: 4px;
      border-color: ${props => props.$theme.colors.gray200};
    }
    .rovna-ui-table-column-title {
      flex: 0;
    }
    .rovna-ui-table-column-sorters,
    .rovna-ui-table-filter-column {
      justify-content: flex-start;
      gap: 4px;
      .anticon {
        font-size: 16px;
      }
    }
    .rovna-ui-table-filter-trigger {
      margin-inline: 0px;
    }
    ${props =>
      props.$pointer &&
      css`
        .rovna-ui-table-row {
          cursor: pointer;
        }
      `};
  }
  ${props => props.$sizes[props.$size]}
` as <T>(
  props: RootProps &
    AntTableProps<T> & {
      ref?: React.ForwardedRef<TableRef>;
    },
) => React.ReactElement;

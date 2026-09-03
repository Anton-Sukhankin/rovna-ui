import AntPagination from 'antd-core/es/pagination';
import styled, { DefaultTheme, css } from 'styled-components';

export const PaginationButton = styled.span.attrs({
  $variant: {
    medium: '32px',
    small: '24px',
  },
})<{ $size: 'small' | 'medium' }>`
  display: inline-block;
  width: ${props => props.$variant[props.$size]};
  height: ${props => props.$variant[props.$size]};
  border-radius: 8px;

  &:hover {
    color: ${props => props.theme.colors.blue500};
    background-color: ${props => props.theme.colors.blue50};
  }

  &:active {
    background-color: ${props => props.theme.colors.blue100};
    color: ${props => props.theme.colors.blue700};
  }
`;

export const Root = styled(AntPagination)<{
  $theme: DefaultTheme;
  $singlePage?: boolean;
}>`
  &.rovna-ui-pagination {
    display: flex;

    .rovna-ui-pagination-total-text {
      display: flex;
      align-items: center;
      color: ${props => props.$theme.colors.gray900};
      font-size: 14px;
      margin-right: 16px;
      padding-right: 16px;
      position: relative;
      white-space: nowrap;

      &::after {
        content: '';
        display: block;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 20px;
        background: #e5e8eb;
        ${({ $singlePage }) => $singlePage && 'display: none;'}
      }
    }

    .rovna-ui-pagination-options {
      width: 100%;
      display: inline-flex;
      flex-direction: row-reverse;
    }

    .rovna-ui-pagination-options-quick-jumper {
      margin-right: auto;
    }

    .rovna-ui-pagination-options-size-changer {
      display: inline-flex;
      align-items: center;
      vertical-align: middle;
      margin-left: auto;

      &::before {
        content: 'показывать по';
        margin-right: 8px;
        color: #888;
        color: ${props => props.$theme.colors.gray900};
        font-size: 14px;
        white-space: nowrap;
      }

      .rovna-ui-select-arrow {
        display: none;
      }

      .rovna-ui-select-selector {
        position: relative;

        &::after {
          content: '';
          display: block;
          position: absolute;
          right: 8px;
          top: 50%;
          width: 16px;
          height: 16px;
          transform: translateY(-50%);
          background: url("data:image/svg+xml,%3Csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M4.19526%206.52876C4.45561%206.26841%204.87772%206.26841%205.13807%206.52876L8%209.39069L10.8619%206.52876C11.1223%206.26841%2011.5444%206.26841%2011.8047%206.52876C12.0651%206.78911%2012.0651%207.21122%2011.8047%207.47157L8.4714%2010.8049C8.21106%2011.0652%207.78894%2011.0652%207.5286%2010.8049L4.19526%207.47157C3.93491%207.21122%203.93491%206.78911%204.19526%206.52876Z'%20fill='%238E919A'/%3E%3C/svg%3E")
            no-repeat center/contain;
          pointer-events: none;
          visibility: visible;
          transition: transform 0.2s;
        }
      }
    }

    .rovna-ui-select.rovna-ui-select-open .rovna-ui-select-selector::after {
      transform: translateY(-50%) rotate(180deg);
    }

    .rovna-ui-pagination-item {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .rovna-ui-pagination-item:not(.rovna-ui-pagination-item-active) {
      &:hover {
        a {
          color: ${props => props.$theme.colors.blue500};
        }
      }

      &:active {
        background-color: ${props => props.$theme.colors.blue100};
        a {
          color: ${props => props.$theme.colors.blue700};
        }
      }
    }

    .rovna-ui-pagination-item-active {
      a {
        font-weight: 400;
        color: white;
      }

      &:hover {
        border-color: ${props => props.$theme.colors.blue600};

        a {
          color: white;
        }
      }
    }

    ${({ $singlePage }) =>
      $singlePage &&
      css`
        .rovna-ui-pagination-item,
        .rovna-ui-pagination-prev,
        .rovna-ui-pagination-next,
        .rovna-ui-pagination-jump-next,
        .rovna-ui-pagination-jump-prev,
        .rovna-ui-pagination-options-quick-jumper {
          display: none !important;
        }
      `}
  }
`;

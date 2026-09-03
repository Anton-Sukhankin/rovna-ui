import styled, { DefaultTheme, css } from 'styled-components';
import AntTabs from 'antd-core/es/tabs';

import { withInjectedClassName } from '@rovna-internal/components/hocs/withInjectedClassName';

export const Root = styled(withInjectedClassName(AntTabs, 'popupClassName'))<{
  $customMoreIcon?: boolean;
  $theme: DefaultTheme;
}>`
  /* Component styling */
  .rovna-ui-tabs-ink-bar {
    border-radius: 16px 16px 0 0;
  }

  ${props =>
    !props.$customMoreIcon &&
    css`
      &&& {
        .rovna-ui-tabs-nav-more[aria-expanded='true'] {
          color: ${props.$theme.colors.blue600};

          .anticon {
            transform: rotate(180deg);
          }

          &:before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            border-radius: 16px 16px 0 0;
            background-color: ${props.$theme.colors.blue600};
          }
        }
      }
    `}

  .rovna-ui-tabs-nav .rovna-ui-tabs-tab {
    font-weight: 400;
  }

  /* Dropdown styling */
  &.rovna-ui-tabs-dropdown {
    .rovna-ui-tabs-dropdown-menu-item {
      padding: 10px 16px;

      &:not(.rovna-ui-tabs-dropdown-menu-item-disabled):hover {
        background: ${props => props.$theme.colors.blue100};
      }
    }

    .rovna-ui-tabs-dropdown-menu {
      padding: 0;
    }
  }
`;

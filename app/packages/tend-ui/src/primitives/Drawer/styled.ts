import AntDrawer from 'antd-core/es/drawer';
import styled, { DefaultTheme } from 'styled-components';

import { scrollbar } from '@rovna-internal/components/styling/mixins';
import { withInjectedClassName } from '@rovna-internal/components/hocs/withInjectedClassName';

export const Root = styled(withInjectedClassName(AntDrawer, 'rootClassName'))<{
  $theme: DefaultTheme;
}>`
  &.rovna-ui-drawer {
    .rovna-ui-drawer-content {
      &.rovna-ui-drawer-header-shadow {
        .rovna-ui-drawer-header {
          box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
        }
      }
      &.rovna-ui-drawer-footer-shadow {
        .rovna-ui-drawer-footer {
          box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
        }
      }
    }
    .rovna-ui-drawer-body {
      ${scrollbar}
    }
    .rovna-ui-drawer-header-title {
      align-items: flex-start;
      flex-direction: row-reverse;
    }
    .rovna-ui-drawer-close {
      margin-inline-end: 0px;
      border-radius: 6px;
      padding: 4px;
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      &:hover:not(:disabled) {
        cursor: pointer;
        color: ${props => props.$theme.colors.gray900};
        background: ${props => props.$theme.colors['gray100-transparent']};
      }
      &:active:not(:disabled) {
        color: ${props => props.$theme.colors.gray900};
        background: ${props => props.$theme.colors['gray150-transparent']};
      }
      &:disabled {
        cursor: not-allowed;
        color: ${props => props.$theme.colors.gray400};
        background-color: ${props => props.$theme.colors.gray50};
      }
    }
    /* При инжектировании табов в заголовок дровера неправильно высчитывается высота и длинна
    и они перестают работать */
    .rovna-ui-drawer-title {
      overflow-x: auto;
      padding-bottom: 5px;
      margin-bottom: -5px;
    }
  }
`;

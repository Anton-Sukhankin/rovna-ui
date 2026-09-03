import React from 'react';
import AntConfigProvider from 'antd-core/es/config-provider';
import { Language } from '@rovna-ui/locale';
import { createGlobalStyle, css } from 'styled-components';
import { ApiClient } from '@rovna-ui/api';
import { AxiosInstance } from 'axios';
import { colors } from '@rovna-ui/tokens/samolet';

import { createAntdTheme } from '@rovna-internal/components/theme/utils';

import { SamoletTheme } from './SamoletTheme';
import { ConfigProvider } from './ConfigProvider';
import { Theme } from './Theme';

const styles = css`
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      scroll-behavior: auto !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  @media (forced-colors: active) {
    :where(
        button,
        [role='button'],
        input,
        select,
        textarea,
        [tabindex]:not([tabindex='-1'])
      ):focus-visible {
      outline: 2px solid CanvasText;
      outline-offset: 2px;
    }
  }

  /* Menu */
  .rovna-ui-menu-submenu-popup .rovna-ui-menu-vertical.rovna-ui-menu-sub {
    padding: 8px 0;
  }

  /* Dialog */
  // TODO: remove after upgrading antd-core >=5.24.1
  .rovna-ui-modal-mask {
    pointer-events: auto !important;
  }

  .rovna-ui-modal-confirm {
    .rovna-ui-modal-close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
    }
    &.rovna-ui-modal-confirm-image {
      .rovna-ui-modal-confirm-body {
        flex-direction: column;
        align-items: center;

        & > .anticon {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 24px;
          margin-inline-end: 0px;
          font-size: 48px;
          border-radius: 50%;
          width: 80px;
          height: 80px;
        }
      }
    }
    &.rovna-ui-modal-confirm-image-cover {
      .rovna-ui-modal-content {
        padding: 0px;
      }
      .rovna-ui-modal-confirm-paragraph {
        padding: 0 32px;
      }
    }
    &.rovna-ui-modal-confirm-info .rovna-ui-modal-confirm-body > .rovna-ui-icon-root {
      color: ${colors.blue600};
    }
    &.rovna-ui-modal-confirm-success .rovna-ui-modal-confirm-body > .rovna-ui-icon-root {
      color: ${colors.green500};
    }
    &.rovna-ui-modal-confirm-warning .rovna-ui-modal-confirm-body > .rovna-ui-icon-root {
      color: ${colors.gold600};
    }
    &.rovna-ui-modal-confirm-error .rovna-ui-modal-confirm-body > .rovna-ui-icon-root {
      color: ${colors.red600};
    }
    &.rovna-ui-modal-confirm-info,
    &.rovna-ui-modal-confirm-success,
    &.rovna-ui-modal-confirm-warning,
    &.rovna-ui-modal-confirm-error {
      .rovna-ui-modal-confirm-title {
        margin-top: 12px;
      }
      .rovna-ui-modal-confirm-body {
        & > .anticon {
          font-size: 40px;
        }
      }
    }

    .rovna-ui-modal-confirm-body-has-title > .anticon {
      margin-top: 0px;
    }

    .rovna-ui-modal-confirm-paragraph {
      /* 24px иконка закрытия + 12px отступ */
      margin-right: 36px;
      gap: 12px;
    }
  }

  /* Toast */
  .rovna-ui-notification
    .rovna-ui-notification-notice
    .rovna-ui-notification-notice-with-icon {
    .rovna-ui-notification-notice-message {
      font-family: 'Museo Sans Cyrl', sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;

      margin-inline-start: 42px;
      margin-bottom: 0;
    }

    .rovna-ui-notification-notice-description {
      font-family: 'Museo Sans Cyrl', sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;

      margin-inline-start: 42px;
      margin-inline-end: 42px;
      min-height: 12px;
    }
  }

  /* Dropdown */
  .rovna-ui-dropdown .rovna-ui-dropdown-menu .rovna-ui-dropdown-menu-item-divider,
  .rovna-ui-dropdown-menu-submenu
    .rovna-ui-dropdown-menu
    .rovna-ui-dropdown-menu-item-divider,
  .rovna-ui-dropdown .rovna-ui-dropdown-menu .rovna-ui-dropdown-menu-submenu-title-divider,
  .rovna-ui-dropdown-menu-submenu
    .rovna-ui-dropdown-menu
    .rovna-ui-dropdown-menu-submenu-title-divider {
    margin-left: 16px;
    margin-right: 16px;
  }

  .rovna-ui-dropdown .rovna-ui-dropdown-menu .rovna-ui-dropdown-menu-item-icon,
  .rovna-ui-dropdown-menu-submenu .rovna-ui-dropdown-menu .rovna-ui-dropdown-menu-item-icon {
    font-size: 16px;
  }

  /* Notifications */
  /* Workaround for Chrome animation flickering */
  .rovna-ui-notification-stack > .rovna-ui-notification-notice-wrapper {
    transition: all 0.3s, backdrop-filter 0s, opacity 0s;
  }

  .rovna-ui-notification .rovna-ui-notification-notice {
    .rovna-ui-notification-notice-close {
      inset-inline-end: 12px;
      padding: 2px;
      width: unset;
      height: unset;
      &:hover {
        background-color: transparent;
      }
    }

    .rovna-ui-notification-notice-icon {
      padding: 2px;
    }

    /* Neutral icon */
    &.rovna-ui-notification-notice-neutral .rovna-ui-notification-notice-icon {
      &.rovna-ui-notification-notice-icon-info {
        color: ${colors.gray400};
      }
    }

    &.rovna-ui-notification-notice-loading .rovna-ui-notification-notice-icon {
      color: ${colors.gray400};
    }
  }

  /* Dropdown */
  .rovna-ui-dropdown .rovna-ui-dropdown-menu,
  .rovna-ui-dropdown-menu-submenu .rovna-ui-dropdown-menu {
    overflow: hidden;
    padding: 8px 0;
  }

  /* Header "Project" dropdown */
  .rovna-ui-header-project-dropdown-overlay.rovna-ui-dropdown .rovna-ui-dropdown-menu,
  .rovna-ui-header-project-dropdown-overlay.rovna-ui-dropdown-menu-submenu
    .rovna-ui-dropdown-menu {
    max-height: 245px;
    overflow: auto;
  }

  .rovna-ui-dropdown .rovna-ui-dropdown-menu .rovna-ui-dropdown-menu-item,
  .rovna-ui-dropdown-menu-submenu .rovna-ui-dropdown-menu .rovna-ui-dropdown-menu-item,
  .rovna-ui-dropdown .rovna-ui-dropdown-menu .rovna-ui-dropdown-menu-submenu-title,
  .rovna-ui-dropdown-menu-submenu
    .rovna-ui-dropdown-menu
    .rovna-ui-dropdown-menu-submenu-title {
    border-radius: 0px;
    padding: 4px 16px;
  }

  .rovna-ui-dropdown .rovna-ui-dropdown-menu .rovna-ui-dropdown-menu-item-group-list,
  .rovna-ui-dropdown-menu-submenu
    .rovna-ui-dropdown-menu
    .rovna-ui-dropdown-menu-item-group-list {
    margin: 0px;
  }

  .rovna-ui-dropdown .rovna-ui-dropdown-menu .rovna-ui-dropdown-menu-item-group-title,
  .rovna-ui-dropdown-menu-submenu
    .rovna-ui-dropdown-menu
    .rovna-ui-dropdown-menu-item-group-title {
    padding: 4px 16px;
    font-size: 12px;
  }

  .rovna-ui-dropdown .rovna-ui-dropdown-menu .rovna-ui-dropdown-menu-item-divider,
  .rovna-ui-dropdown-menu-submenu
    .rovna-ui-dropdown-menu
    .rovna-ui-dropdown-menu-item-divider,
  .rovna-ui-dropdown .rovna-ui-dropdown-menu .rovna-ui-dropdown-menu-submenu-title-divider,
  .rovna-ui-dropdown-menu-submenu
    .rovna-ui-dropdown-menu
    .rovna-ui-dropdown-menu-submenu-title-divider {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  /* Tooltip */
  .rovna-ui-tooltip {
    .rovna-ui-tooltip-arrow::before {
      clip-path: polygon(
        1.6568542494923806px 100%,
        50% 1.6568542494923806px,
        14.34314575050762px 100%,
        1.6568542494923806px 100%
      );
    }
  }
`;

const GlobalStyles = createGlobalStyle`${styles}`;

type RovnaUIProps = {
  lang?: 'ru' | 'en';
  theme?: 'samolet' | 'global';
  client?: AxiosInstance;
};

const RovnaUI = ({
  lang = 'ru',
  theme = 'samolet',
  client,
  children,
}: React.PropsWithChildren<RovnaUIProps>) => {
  return (
    <ApiClient client={client}>
      <Theme theme={theme}>
        <GlobalStyles />
        <Language language={lang}>
          <ConfigProvider>{children}</ConfigProvider>
        </Language>
      </Theme>
    </ApiClient>
  );
};

RovnaUI.init = (theme = SamoletTheme) => {
  AntConfigProvider.config({
    prefixCls: 'rovna-ui',
    theme: createAntdTheme(theme),
  });
};

export { RovnaUI };

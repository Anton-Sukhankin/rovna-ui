import React from 'react';
import { AxiosInstance } from 'axios';
import AntConfigProvider from 'antd-core/es/config-provider';
import { createGlobalStyle, css } from 'styled-components';
import { Language } from '@rovna-ui/locale';
import { ApiClient } from '@rovna-ui/api';
import { colors } from '@rovna-ui/tokens/samolet';

import { createAntdTheme } from './utils';
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
  .rovna-ui-modal-confirm {
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

    .rovna-ui-modal-confirm-paragraph {
      gap: 12px;
    }
  }

  /* Toast */
  .rovna-ui-notification
    .rovna-ui-notification-notice
    .rovna-ui-notification-notice-with-icon {
    .rovna-ui-notification-notice-message {
      font-family: Museo Sans Cyrl;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;

      margin-inline-start: 42px;
      margin-bottom: 0;
    }

    .rovna-ui-notification-notice-description {
      font-family: Museo Sans Cyrl;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;

      margin-inline-start: 42px;
      margin-inline-end: 42px;
      min-height: 12px;
    }
  }

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

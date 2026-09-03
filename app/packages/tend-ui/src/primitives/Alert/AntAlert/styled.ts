import AntAlert from 'antd-core/es/alert';
import styled, { DefaultTheme, css } from 'styled-components';

export const Root = styled(AntAlert)<{
  $border: boolean;
  $theme: DefaultTheme;
  $type: 'success' | 'info' | 'warning' | 'error' | 'neutral' | 'loading';
}>`
  ${props =>
    (props.$type === 'neutral' || props.$type === 'loading') &&
    css`
      &&& {
        border-color: ${props.$theme.colors.gray200};
        background-color: ${props.$theme.colors.gray50};

        .rovna-ui-alert-icon {
          color: ${props.$theme.colors.gray400};
        }
      }
    `};

  ${props =>
    !props.$border &&
    css`
      &&& {
        border: none;
      }
    `}

  &.rovna-ui-alert {
    padding: 16px 24px;
  }

  &.rovna-ui-alert-with-description {
    .rovna-ui-alert-message {
      font-weight: 600;
    }

    .rovna-ui-alert-icon {
      align-self: flex-start;
    }
  }

  .rovna-ui-alert-icon {
    align-self: flex-start;
    font-size: 20px;
  }
`;

export const Footer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

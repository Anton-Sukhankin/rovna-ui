import React from 'react';
import styled, { css } from 'styled-components';
import { margin } from '@rovna-ui/styling';

import { Spinner as _Spinner } from '../Spinner';
import { ButtonStylingSchema } from './types';

type ButtonRootProps = {
  $fullWidth: boolean;
  $skeleton: boolean;
  $danger: boolean;
  $disabled: boolean;
  $variant: 'primary' | 'secondary' | 'ghost' | 'link';
  $size: 'large' | 'medium' | 'small';
  $preset: 'default' | 'danger' | 'accent';
  $shape: 'default' | 'iconOnly' | 'iconLeft' | 'iconRight' | 'noPadding';
  $tag: React.ElementType;
  $styling: ButtonStylingSchema;
};

const variants = {
  skeleton: css<ButtonRootProps>`
    pointer-events: none;
    background-color: ${props => props.theme.colors['gray50-transparent']};
  `,
  primary: {
    disabled: css<ButtonRootProps>`
      cursor: not-allowed;
      color: ${props => props.theme.colors.gray500};
      background-color: ${props => props.theme.colors['gray50-transparent']};
    `,
    presets: {
      default: css<ButtonRootProps>`
        color: ${props => props.theme.colors.gray0};
        background: ${props => props.theme.colors.blue600};

        &:focus-visible {
          outline: ${props => props.theme.colors.blue700} solid 2px;
        }
        &:hover:not(:disabled) {
          cursor: pointer;
          background: ${props => props.theme.colors.blue700};
        }
        &:active:not(:disabled) {
          background: ${props => props.theme.colors.blue800};
        }
        &:disabled {
          cursor: not-allowed;
          color: ${props => props.theme.colors.gray500};
          background-color: ${props => props.theme.colors['gray50-transparent']};
        }
      `,
      danger: css<ButtonRootProps>`
        color: ${props => props.theme.colors.gray0};
        background: ${props => props.theme.colors.red600};

        &:focus-visible {
          outline: ${props => props.theme.colors.red700} solid 2px;
        }
        &:hover:not(:disabled) {
          cursor: pointer;
          background: ${props => props.theme.colors.red700};
        }
        &:active:not(:disabled) {
          background: ${props => props.theme.colors.red800};
        }
        &:disabled {
          cursor: not-allowed;
          color: ${props => props.theme.colors.gray500};
          background-color: ${props => props.theme.colors['gray50-transparent']};
        }
      `,
      accent: css<ButtonRootProps>`
        color: ${props => props.$styling.buttonOnAccent.primaryDefaultText};
        background: ${props => props.theme.colors.gray0};

        &:focus-visible {
          outline: ${props => props.theme.colors.gray0} solid 2px;
        }
        &:hover:not(:disabled) {
          cursor: pointer;
          background: ${props => props.theme.colors.gray50};
        }
        &:active:not(:disabled) {
          background: ${props => props.theme.colors.gray100};
        }
        &:disabled {
          cursor: not-allowed;
          color: ${props => props.theme.colors['white700-transparent']};
          background-color: ${props => props.theme.colors['white100-transparent']};
        }
      `,
    },
  },
  secondary: {
    disabled: css<ButtonRootProps>`
      cursor: not-allowed;
      color: ${props => props.theme.colors.gray400};
      background-color: ${props => props.theme.colors.gray50};
    `,
    presets: {
      default: css<ButtonRootProps>`
        color: ${props => props.theme.colors.gray900};
        background: ${props => props.theme.colors.gray0};
        border-color: ${props => props.theme.colors.gray200};
        border-width: 1px;
        border-style: solid;

        &:focus-visible {
          outline: ${props => props.theme.colors['gray350-transparent']} solid 2px;
        }
        &:hover:not(:disabled) {
          cursor: pointer;
          color: ${props => props.theme.colors.gray900};
          background: ${props => props.theme.colors['gray50-transparent']};
          border-color: ${props => props.theme.colors.gray400};
        }
        &:active:not(:disabled) {
          color: ${props => props.theme.colors.gray900};
          background: ${props => props.theme.colors['gray100-transparent']};
          border-color: ${props => props.theme.colors.gray500};
        }
        &:disabled {
          cursor: not-allowed;
          color: ${props => props.theme.colors.gray500};
          background-color: ${props => props.theme.colors['gray50-transparent']};
          border-color: transparent;
        }
      `,
      danger: css<ButtonRootProps>`
        color: ${props => props.theme.colors.red600};
        background: ${props => props.theme.colors.red100};

        &:focus-visible {
          outline: ${props => props.theme.colors.red700} solid 2px;
        }
        &:hover:not(:disabled) {
          cursor: pointer;
          color: ${props => props.theme.colors.red500};
          background: ${props => props.theme.colors.red50};
        }
        &:active:not(:disabled) {
          color: ${props => props.theme.colors.red700};
          background: ${props => props.theme.colors.red200};
        }
        &:disabled {
          cursor: not-allowed;
          color: ${props => props.theme.colors.gray400};
          border: 1px solid ${props => props.theme.colors.gray200};
          background-color: ${props => props.theme.colors.gray50};
        }
      `,
      accent: css<ButtonRootProps>`
        color: ${props => props.theme.colors.blue600};
        background: ${props => props.theme.colors.gray0};

        &:focus-visible {
          outline: ${props => props.theme.colors.blue600} solid 2px;
        }
        &:hover:not(:disabled) {
          cursor: pointer;
          background: ${props => props.theme.colors.gray50};
        }
        &:active:not(:disabled) {
          background: ${props => props.theme.colors.gray100};
        }
        &:disabled {
          cursor: not-allowed;
          color: ${props => props.theme.colors['white700-transparent']};
          background-color: ${props => props.theme.colors['white100-transparent']};
        }
      `,
    },
  },
  ghost: {
    disabled: css<ButtonRootProps>`
      cursor: not-allowed;
      color: ${props => props.theme.colors.gray500};
    `,
    presets: {
      default: css<ButtonRootProps>`
        color: ${props => props.theme.colors.blue600};
        background: transparent;

        &:focus-visible {
          outline: ${props => props.theme.colors.blue700} solid 2px;
        }
        &:hover:not(:disabled) {
          cursor: pointer;
          color: ${props => props.theme.colors.blue700};
          background: ${props => props.theme.colors['blue50-transparent']};
        }
        &:active:not(:disabled) {
          color: ${props => props.theme.colors.blue800};
          background: ${props => props.theme.colors['blue100-transparent']};
        }
        &:disabled {
          cursor: not-allowed;
          color: ${props => props.theme.colors.gray500};
        }
      `,
      danger: css<ButtonRootProps>`
        color: ${props => props.theme.colors.red600};
        background: transparent;

        &:focus-visible {
          outline: ${props => props.theme.colors.red700} solid 2px;
        }
        &:hover:not(:disabled) {
          cursor: pointer;
          color: ${props => props.theme.colors.red700};
          background: ${props => props.theme.colors['red50-transparent']};
        }
        &:active:not(:disabled) {
          color: ${props => props.theme.colors.red800};
          background: ${props => props.theme.colors['red200-transparent']};
        }
        &:disabled {
          cursor: not-allowed;
          color: ${props => props.theme.colors.gray500};
        }
      `,
      accent: css<ButtonRootProps>`
        color: ${props => props.$styling.buttonOnAccent.ghostDefaultText};
        background: transparent;

        &:focus-visible {
          outline: ${props => props.theme.colors.gray0} solid 2px;
        }
        &:hover:not(:disabled) {
          cursor: pointer;
          color: ${props => props.$styling.buttonOnAccent.ghostHoverText};
          background: ${props => props.theme.colors['white100-transparent']};
        }
        &:active:not(:disabled) {
          color: ${props => props.$styling.buttonOnAccent.ghostPressedText};
          background: ${props => props.theme.colors['white150-transparent']};
        }
        &:disabled {
          cursor: not-allowed;
          color: ${props => props.$styling.buttonOnAccent.ghostDisabledText};
        }
      `,
    },
  },
  link: {
    disabled: css<ButtonRootProps>`
      cursor: not-allowed;
      color: ${props => props.theme.colors.gray500};
    `,
    presets: {
      default: css<ButtonRootProps>`
        color: ${props => props.theme.colors.blue600};
        background: transparent;

        &:focus-visible {
          outline: none;
          background-color: ${props => props.theme.colors['blue150-transparent']};
        }
        &:hover:not(:disabled) {
          cursor: pointer;
          color: ${props => props.theme.colors.blue700};
        }
        &:active:not(:disabled) {
          color: ${props => props.theme.colors.blue800};
        }
        &:disabled {
          cursor: not-allowed;
          color: ${props => props.theme.colors.gray500};
        }
      `,
      danger: css<ButtonRootProps>`
        color: ${props => props.theme.colors.red600};
        background: transparent;

        &:focus-visible {
          outline: none;
          background-color: ${props => props.theme.colors['red150-transparent']};
        }
        &:hover:not(:disabled) {
          cursor: pointer;
          color: ${props => props.theme.colors.red700};
        }
        &:active:not(:disabled) {
          color: ${props => props.theme.colors.red800};
        }
        &:disabled {
          cursor: not-allowed;
          color: ${props => props.theme.colors.gray500};
        }
      `,
      accent: css<ButtonRootProps>`
        color: ${props => props.theme.colors.gray0};
        background: transparent;

        &:focus-visible {
          outline: ${props => props.theme.colors.gray0} solid 2px;
        }
        &:hover:not(:disabled) {
          cursor: pointer;
          color: ${props => props.theme.colors.gray100};
        }
        &:active:not(:disabled) {
          color: ${props => props.theme.colors.gray150};
        }
        &:disabled {
          cursor: not-allowed;
          color: ${props => props.theme.colors['white700-transparent']};
        }
      `,
    },
  },
};

export const Root = styled.button.attrs({
  $sizes: {
    large: {
      default: css`
        border-radius: 10px;
        padding: 10px 20px;
      `,
      iconOnly: css`
        border-radius: 10px;
        padding: 12px;
      `,
      iconLeft: css`
        border-radius: 10px;
        padding: 10px 20px 10px 16px;
      `,
      iconRight: css`
        border-radius: 10px;
        padding: 10px 16px 10px 20px;
      `,
      noPadding: css`
        border-radius: 10px;
        padding: 0px;
      `,
    },
    medium: {
      default: css`
        border-radius: 8px;
        padding: 6px 16px;
      `,
      iconOnly: css`
        border-radius: 8px;
        padding: 8px;
      `,
      iconLeft: css`
        border-radius: 8px;
        padding: 6px 16px 6px 12px;
      `,
      iconRight: css`
        border-radius: 8px;
        padding: 6px 12px 6px 16px;
      `,
      noPadding: css`
        border-radius: 8px;
        padding: 0px;
      `,
    },
    small: {
      default: css`
        border-radius: 6px;
        padding: 2px 12px;
      `,
      iconOnly: css`
        border-radius: 6px;
        padding: 4px;
      `,
      iconLeft: css`
        border-radius: 6px;
        padding: 2px 12px 2px 8px;
      `,
      iconRight: css`
        border-radius: 6px;
        padding: 2px 8px 2px 12px;
      `,
      noPadding: css`
        border-radius: 6px;
        padding: 0px;
      `,
    },
  },
})<ButtonRootProps>`
  /* Reset */
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
  text-decoration: none;

  /* Font */
  font-family: ${props => props.theme.fonts.museo};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;

  /* Shape */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  outline-offset: 2px;
  height: max-content;

  /* Animation */
  transition: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-property: background, color, border;

  ${props =>
    props.$fullWidth &&
    css`
      width: 100%;
    `}
  ${props => props.$sizes[props.$size][props.$shape]};
  ${props => {
    const isButton = props.$tag === 'button';

    if (props.$skeleton) return variants.skeleton;
    if (props.$danger) return variants[props.$variant].presets.danger;
    if (props.$disabled && !isButton) return variants[props.$variant].disabled;

    return variants[props.$variant].presets[props.$preset];
  }};
  ${margin};

  /* FIXME: Удалить anticon класс после переезда полностью на внутренние иконки */
  .anticon,
  .rovna-ui-icon-root {
    font-size: 16px;
  }

  /* Компенсируем border 1px у кнопок secondary так как border-box не срабатывает по какой-то причине */
  &:where(.rovna-ui-button-variant-secondary.rovna-ui-button-size-large):not(
      .rovna-ui-button-has-before,
      .rovna-ui-button-has-after
    ) {
    padding: calc(10px - 1px) 20px;
  }
  &:where(.rovna-ui-button-variant-secondary.rovna-ui-button-size-medium):not(
      .rovna-ui-button-has-before,
      .rovna-ui-button-has-after
    ) {
    padding: calc(6px - 1px) 16px;
  }
  &:where(.rovna-ui-button-variant-secondary.rovna-ui-button-size-small):not(
      .rovna-ui-button-has-before,
      .rovna-ui-button-has-after
    ) {
    padding: calc(2px - 1px) 16px;
  }

  /* Компенсируем border 1px у кнопок secondary так как border-box не срабатывает по какой-то причине */
  /* для только иконочных кнопок */
  &:where(
      .rovna-ui-button-variant-secondary.rovna-ui-button-size-large.rovna-ui-button-icon-only
    ) {
    padding: calc(12px - 1px);
  }
  &:where(
      .rovna-ui-button-variant-secondary.rovna-ui-button-size-medium.rovna-ui-button-icon-only
    ) {
    padding: calc(8px - 1px);
  }
  &:where(
      .rovna-ui-button-variant-secondary.rovna-ui-button-size-small.rovna-ui-button-icon-only
    ) {
    padding: calc(4px - 1px);
  }

  /* Компенсируем border 1px у кнопок secondary так как border-box не срабатывает по какой-то причине */
  &:where(
      .rovna-ui-button-variant-secondary.rovna-ui-button-size-large.rovna-ui-button-has-before,
      .rovna-ui-button-variant-secondary.rovna-ui-button-size-large.rovna-ui-button-has-after
    ):not(.rovna-ui-button-icon-only) {
    padding: calc(10px - 1px) 20px calc(10px - 1px) 16px;
  }
  &:where(
      .rovna-ui-button-variant-secondary.rovna-ui-button-size-medium.rovna-ui-button-has-before,
      .rovna-ui-button-variant-secondary.rovna-ui-button-size-medium.rovna-ui-button-has-after
    ):not(.rovna-ui-button-icon-only) {
    padding: calc(6px - 1px) 16px calc(6px - 1px) 12px;
  }
  &:where(
      .rovna-ui-button-variant-secondary.rovna-ui-button-size-small.rovna-ui-button-has-before,
      .rovna-ui-button-variant-secondary.rovna-ui-button-size-small.rovna-ui-button-has-after
    ):not(.rovna-ui-button-icon-only) {
    padding: calc(2px - 1px) 12px calc(2px - 1px) 8px;
  }
`;
export const Spinner = styled(_Spinner)`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const Hidden = styled.span`
  display: inline-flex;
  opacity: 0;
`;
export const SpinnerContainer = styled.span`
  display: inline-flex;
  position: relative;
`;

import React from 'react';
import styled, { DefaultTheme, css } from 'styled-components';
import Select, {
  SelectProps as AntSelectProps,
  BaseOptionType,
  DefaultOptionType,
} from 'antd-core/es/select';
import { ChevronDown } from '@rovna-ui/icons/ChevronDown';

import { withInjectedClassName } from '@rovna-internal/components/hocs/withInjectedClassName';

import { SelectRef } from './types';

export const ArrowIcon = styled(ChevronDown)<{ $open: boolean; $disabled?: boolean }>`
  ${props =>
    props.$disabled &&
    css`
      cursor: not-allowed;
      pointer-events: none;
    `}
  transform: ${props => (props.$open ? 'rotate(180deg)' : 'rotate(0)')};
`;

type RootProps = {
  $theme: DefaultTheme;
  $multi?: boolean;
  $fullWidth?: boolean;
  $width?: string;
};

export const Root = styled(withInjectedClassName(Select, 'popupClassName'))<RootProps>`
  &.rovna-ui-select {
    ${({ $fullWidth = false, $width = '256px' }) => {
      if ($fullWidth)
        return css`
          width: 100%;
        `;

      return css`
        width: ${$width};
      `;
    }}

    /* Single Small */
     &.rovna-ui-select-single.rovna-ui-select-sm {
      .rovna-ui-select-selection-search {
        padding-right: 16px;
      }
      &:not(.rovna-ui-select-customize-input) {
        .rovna-ui-select-selector {
          /* Side padding */
          padding: 0 8px;
        }
      }
    }

    /* Single Medium */
    &.rovna-ui-select-single:not(.rovna-ui-select-lg):not(.rovna-ui-select-sm) {
      .rovna-ui-select-selection-search {
        padding-right: 32px;
      }
      &:not(.rovna-ui-select-customize-input) {
        .rovna-ui-select-selector {
          /* Side padding */
          padding: 0 8px;
          .rovna-ui-select-selection-search {
            /* Compensate left side padding */
            inset-inline-start: 7px;
          }
        }
      }
    }

    /* Single Large */
    &.rovna-ui-select-single.rovna-ui-select-lg:not(.rovna-ui-select-customize-input) {
      .rovna-ui-select-selection-search {
        padding-right: 32px;
      }
      .rovna-ui-select-selector {
        padding: 4px 12px;
      }
    }

    /* Aligning icons and fix icon-margin */
    .rovna-ui-select-selection-placeholder {
      display: inline-flex;
      align-items: center;
      color: ${props => props.$theme.colors.gray650};

      & > .anticon {
        margin-right: 8px;
      }
    }

    /* Multiple select */
    &.rovna-ui-select-multiple {
      .rovna-ui-select-selection-search {
        margin-right: 20px;
      }
      .rovna-ui-select-selection-item {
        color: ${props => props.$theme.colors.gray900};
        font-size: 12px;
        height: 16px;

        .rovna-ui-select-selection-item-content {
          line-height: initial;
        }
      }
    }

    /* Offsetting the clear icon to the left */
    .rovna-ui-select-clear {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inset-inline-end: 30px;
    }
  }

  /* Dropdown styles */
  &.rovna-ui-select-dropdown {
    padding: 12px 0;

    .rc-virtual-list-scrollbar-vertical {
      background: ${props => props.$theme.colors.gray50};
      border-radius: 16px;
      margin-right: 4px;
      visibility: visible !important;
    }

    .rc-virtual-list-scrollbar-thumb {
      background: ${props => props.$theme.colors.gray150} !important;
    }

    .rovna-ui-select-item {
      border-radius: 0;
      ${props =>
        props.$multi &&
        css`
          display: flex;
          flex-direction: row-reverse;
          gap: 12px;
        `}
    }

    .rovna-ui-select-item-option-selected {
      &:not(.rovna-ui-select-item-option-disabled) {
        &:hover {
          background-color: ${props => props.$theme.colors.gray50};
        }
      }
    }
  }
  /*
    TODO: A bit messy workaround, probably might be a better solution
    https://github.com/styled-components/styled-components/issues/1803
  */
` as <
  ValueType,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>(
  props: AntSelectProps<ValueType, OptionType> &
    React.AriaAttributes &
    RootProps & {
      ref?: React.ForwardedRef<SelectRef>;
    },
) => React.ReactElement;

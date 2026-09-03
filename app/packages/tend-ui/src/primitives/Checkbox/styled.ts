import AntCheckbox from 'antd-core/es/checkbox/Checkbox';
import AntCheckboxGroup from 'antd-core/es/checkbox/Group';
import React from 'react';
import styled, { css } from 'styled-components';

export const Root = styled(AntCheckbox)`
  /* Aligning checkbox and label to the start */
  .rovna-ui-checkbox {
    align-self: flex-start;
  }
  .rovna-ui-checkbox-indeterminate .rovna-ui-checkbox-inner:after {
    border-radius: 2px;
  }
`;

export const GroupRoot = styled(AntCheckboxGroup)<
  React.AriaAttributes & {
    role?: React.AriaRole;
    $fullWidth: boolean;
    $layout: 'horizontal' | 'vertical';
  }
>`
  &.rovna-ui-checkbox-group {
    .rovna-ui-checkbox + span {
      overflow-wrap: anywhere;
    }
  }

  ${props => {
    if (props.$layout === 'horizontal')
      return css`
        column-gap: 16px;
      `;

    return css`
      flex-direction: column;
      row-gap: 8px;
    `;
  }}
  ${props =>
    props.$fullWidth &&
    css`
      &.rovna-ui-checkbox-group {
        width: 100%;
        .rovna-ui-checkbox + span {
          display: inline-block;
          width: 100%;
        }
      }
    `};
`;

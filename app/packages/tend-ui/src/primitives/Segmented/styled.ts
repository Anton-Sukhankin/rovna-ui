import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import AntSegmented, {
  SegmentedProps as AntSegmentedProps,
} from 'antd-core/es/segmented';

export const Root = styled(AntSegmented)<{ $theme: DefaultTheme }>`
  &.rovna-ui-segmented {
    padding: 4px;
    border: 1px solid ${props => props.$theme.colors.gray200};

    .rovna-ui-segmented-item-label {
      min-height: 20px;
      line-height: 20px;
    }
  }
` as (
  props: AntSegmentedProps & {
    $theme: DefaultTheme;
  },
) => React.ReactElement;

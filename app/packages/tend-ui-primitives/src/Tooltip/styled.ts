import AntTooltip from 'antd-core/es/tooltip';
import styled, { css } from 'styled-components';
import { withInjectedClassName } from '@rovna-ui/factories';

export const Root = styled(withInjectedClassName(AntTooltip, 'overlayClassName'))<{
  $lineBreak?: boolean;
}>`
  &.rovna-ui-tooltip {
    .rovna-ui-tooltip-arrow::before {
      clip-path: polygon(
        1.6568542494923806px 100%,
        50% 1.6568542494923806px,
        14.34314575050762px 100%,
        1.6568542494923806px 100%
      );
    }

    .rovna-ui-tooltip-inner {
      padding: 8px;
      ${props =>
        props.$lineBreak &&
        css`
          white-space: pre-line;
        `}
    }
  }
`;

import AntSpace from 'antd-core/es/space';
import styled, { css } from 'styled-components';

export const Root = styled(AntSpace)<{
  $fullWidth?: boolean;
  $grow?: 'first' | 'last';
}>`
  ${props =>
    props.$fullWidth &&
    css`
      width: 100%;
    `}

  ${props => {
    switch (props.$grow) {
      case 'first':
        return css`
          .rovna-ui-space-item:first-child {
            margin-right: auto;
          }
        `;
      case 'last':
        return css`
          .rovna-ui-space-item:last-child {
            margin-left: auto;
          }
        `;

      default:
        return;
    }
  }}
`;

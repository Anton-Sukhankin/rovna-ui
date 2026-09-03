import styled from 'styled-components';
import { Box } from '@rovna-ui/grid';

export const Root = styled(Box)`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;

  .rovna-ui-icon-root {
    font-size: 20px;
    color: ${props => props.theme.colors.gray0};
  }
`;

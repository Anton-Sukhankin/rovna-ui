import { Margin, Padding, margin, padding } from '@rovna-ui/styling';
import Flex from 'antd-core/es/flex';
import styled from 'styled-components';

export const Root = styled(Flex)<Padding & Margin>`
  ${padding};
  ${margin};
`;

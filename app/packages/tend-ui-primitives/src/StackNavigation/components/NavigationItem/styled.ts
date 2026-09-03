import { BorderRadius, borderRadius } from '@rovna-ui/styling';
import styled from 'styled-components';

export const Root = styled.li<BorderRadius>`
  box-sizing: border-box;
  list-style: none;
  margin: 0;

  display: flex;
  align-items: center;
  padding: 14px 16px;
  background-color: ${props => props.theme.colors.gray0};

  &:not(:last-child):not(:has(+ .rovna-ui-stack-navigation-item-group)) {
    border-bottom: 1px solid ${props => props.theme.colors.gray100};
  }

  ${borderRadius};
`;

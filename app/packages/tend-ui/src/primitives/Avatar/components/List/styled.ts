import styled from 'styled-components';

export const Root = styled.span`
  display: inline-flex;

  & > span:not(:first-child) {
    margin-left: -8px;
  }
`;

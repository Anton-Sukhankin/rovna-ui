import React from 'react';
import styled from 'styled-components';
import { ChevronDown } from '@rovna-ui/icons/ChevronDown';

const Wrapper = styled.span`
  /* TODO: Move to a token */
  font-size: 14px;

  display: inline-flex;
  align-items: center;
`;

export const More: React.FC = ({ children = 'Ещë' }) => {
  return (
    <Wrapper>
      {children}
      <ChevronDown />
    </Wrapper>
  );
};

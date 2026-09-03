import styled from 'styled-components';

export const Root = styled.div`
  display: inline-flex;

  .rovna-ui-button {
    &:not(:first-child):not(:last-child) {
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
      border-left-width: 0.5px;
      border-right-width: 0.5px;
    }
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right-width: 0.5px;
    }
    &:last-child {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
      border-left-width: 0.5px;
    }
  }
`;

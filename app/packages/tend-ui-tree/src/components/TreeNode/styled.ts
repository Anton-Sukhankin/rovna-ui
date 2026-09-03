import styled from 'styled-components';
import { MaxHeight, maxHeight } from '@rovna-ui/styling';

export const Root = styled.div<MaxHeight>`
  box-sizing: border-box;
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-property: background, color;
  ${maxHeight};

  &.rovna-ui-tree-node-content-selected:not(.rovna-ui-tree-node-content-hovered) {
    cursor: pointer;
    background-color: ${props => props.theme.colors.blue100};
  }
  &.rovna-ui-tree-node-content-hovered:not(.rovna-ui-tree-node-content-selected) {
    cursor: pointer;
    background-color: ${props => props.theme.colors.gray50};
  }
  &.rovna-ui-tree-node-content-selected.rovna-ui-tree-node-content-hovered {
    cursor: pointer;
    background-color: ${props => props.theme.colors.blue200};
  }
  &.rovna-ui-tree-node-content-error:not(.rovna-ui-tree-node-content-hovered) {
    cursor: pointer;
    background-color: ${props => props.theme.colors.red100};
  }
  &.rovna-ui-tree-node-content-error.rovna-ui-tree-node-content-hovered {
    cursor: pointer;
    background-color: ${props => props.theme.colors.red200};
  }
`;

export const Button = styled.button`
  cursor: pointer;
  display: flex;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
`;

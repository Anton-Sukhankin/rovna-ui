import styled from 'styled-components';

export const Root = styled.div<{ $disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 24px 20px 24px;

  border-style: dashed;
  border-radius: 12px;
  border-width: 1px;

  &.rovna-ui-upload-drop-area-disabled {
    background-color: ${props => props.theme.colors.gray50};
    border-color: ${props => props.theme.colors.gray200};
  }
  &:not(.rovna-ui-upload-drop-area-disabled) {
    background-color: ${props => props.theme.colors.gray0};
    border-color: ${props => props.theme.colors.gray200};
    &:hover {
      cursor: pointer;
      background-color: ${props => props.theme.colors.blue50};
      border-color: ${props => props.theme.colors.blue700};
    }
  }

  transition: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-property: background, color, border;

  &[aria-invalid='true'] {
    border-color: ${props => props.theme.colors.red600};
  }
`;

export const DragOverlay = styled.div`
  box-sizing: border-box;
`;

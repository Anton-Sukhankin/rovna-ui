import styled, { css } from 'styled-components';
import { margin } from '@rovna-ui/styling';
import { Resizer } from '@rovna-ui/icons/Resizer';

export const ResizerIcon = styled(Resizer)`
  pointer-events: none;
  position: absolute;
  bottom: 3px;
  right: 3px;
  z-index: 500;
`;

export const Container = styled.div<{ $fullWidth?: boolean }>`
  ${props =>
    props.$fullWidth &&
    css`
      width: 100%;
    `}

  position: relative;

  textarea {
    &::-webkit-resizer {
      display: none;
    }
  }

  .rovna-ui-input-textarea-show-count {
    .rovna-ui-input-data-count {
      bottom: -18px;
      color: ${props => props.theme.colors.gray650};
      font-size: 12px;
    }
  }

  ${margin};
`;

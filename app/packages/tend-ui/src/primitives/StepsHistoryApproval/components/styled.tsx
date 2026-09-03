import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Paragraph, Text } from '@rovna-ui/typography';
import { Button } from '@rovna-ui/primitives';

import { Box } from '@rovna-internal/components/grid/Box';

export const CopyContainer = styled(Box)`
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    color: ${props => props.theme.colors.blue700};
  }

  &:hover svg {
    cursor: pointer;
  }
  .approval-user-container:hover & svg {
    opacity: 1;
  }
`;

export const CustomAvatar = styled.div<{
  $theme: DefaultTheme;
  $position: React.CSSProperties['position'];
}>`
  width: 16px;
  height: 16px;
  position: ${props => props.$position};
  display: flex;
  justify-content: center;
  align-items: center;
  left: 27px;
  background-color: ${props => props.$theme.colors.blue200};
  border-radius: 100px;
  border: 1px solid ${props => props.$theme.colors.gray0};
  bottom: 0;
  cursor: pointer;
`;

export const StyledParagraph = styled(Paragraph)<{ $theme: DefaultTheme }>`
  background-color: ${props => props.$theme.colors.gray25};
  padding: 16px;
`;

export const StyledButton = styled(Button)`
  padding-top: 0;
` as typeof Button;

export const StyledText = styled(Text)`
  cursor: pointer;
`;

export const ApprovalUserContainer = styled(Box)`
  min-height: 60px;
`;

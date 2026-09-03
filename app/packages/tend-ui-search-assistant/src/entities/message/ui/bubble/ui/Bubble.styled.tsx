import { colors } from '@rovna-ui/tokens/samolet';
import styled, { css } from 'styled-components';
import { Text } from '@rovna-ui/components/typography';

import type { SenderType } from '@search-assistant/entities/message/api/types';

export const Bubble = styled.div<{ sender: SenderType }>`
  display: flex;
  flex-direction: column;
  grid-gap: 12px;
  position: relative;
  padding: 12px 14px 8px 14px;
  border-radius: 12px;
  transition: border-radius 0.25s ease-in-out;

  background-color: ${colors.gray50};

  :last-of-type {
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 0;
  }

  ${({ sender }) =>
    sender === 'user' &&
    css`
      background-color: ${colors.blue600};

      :last-of-type {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 12px;
      }
    `}
`;

export const Footer = styled.div`
  display: flex;
  user-select: none;
  align-items: center;
  justify-content: end;
`;

export const FeedbackContainer = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 8px;
`;

export const Time = styled(Text)`
  opacity: 0.7;
  // FIXME:
  // https://github.com/microsoft/TypeScript/issues/36800
  // https://github.com/Microsoft/TypeScript/issues/30858
` as typeof Text;

export const MessageText = styled.div<{ sender: SenderType }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

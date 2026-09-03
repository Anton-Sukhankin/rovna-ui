import React from 'react';

import { Bubbles } from '@search-assistant/widgets/bubbles';
import { MessageInput } from '@search-assistant/features/message-input';

import * as Styled from './Chat.styled';

export const Chat = () => (
  <Styled.Container>
    <Bubbles />
    <MessageInput />
  </Styled.Container>
);

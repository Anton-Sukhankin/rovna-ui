import React from 'react';

import type { SenderType } from '@search-assistant/entities/message/api/types';

import * as Styled from './Avatar.styled';
import { ServiceAvatar } from './ServiceAvatar';
import { UserAvatar } from './UserAvatar';

type AvatarProps = {
  sender: SenderType;
};

export const Avatar = ({ sender }: AvatarProps) => (
  <Styled.Container>
    {(sender === 'bot' || sender === 'opensearch') && <ServiceAvatar />}
    {sender === 'user' && <UserAvatar />}
  </Styled.Container>
);

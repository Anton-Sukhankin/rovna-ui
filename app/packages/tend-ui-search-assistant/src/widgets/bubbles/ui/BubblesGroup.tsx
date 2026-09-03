import { Box } from '@rovna-ui/components/grid';
import React from 'react';

import type {
  AnswerType,
  MessageType,
  SenderType,
} from '@search-assistant/entities/message/api/types';
import { Bubble } from '@search-assistant/entities/message/ui/bubble';
import { Avatar } from '@search-assistant/entities/user/ui/avatar';

type SenderGroupProps = {
  sender: SenderType;
  messages: Array<MessageType | AnswerType>;
};

export const BubblesGroup = ({ messages, sender }: SenderGroupProps) => {
  const isBotSender = sender === 'bot' || sender === 'opensearch';

  return (
    <Box
      data-sender={sender}
      $display={'flex'}
      $alignItems={'flex-end'}
      $justifyContent={'flex-start'}
      $flexDirection={isBotSender ? 'row' : 'row-reverse'}
      $gap={8}
    >
      <Avatar sender={sender} />
      <Box
        $display={'flex'}
        $alignItems={isBotSender ? 'flex-start' : 'flex-end'}
        $flexDirection={'column'}
        $maxWidth={isBotSender ? '100%' : '60%'}
        $gap={6}
      >
        {messages.map((message, index) => (
          <Bubble key={`bubble-${sender}-${message.timestamp}-${index}`} {...message} />
        ))}
      </Box>
    </Box>
  );
};

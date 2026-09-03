import { Link, Text } from '@rovna-ui/components/typography';
import React, { memo, useLayoutEffect, useRef } from 'react';

import type { MessageType } from '@search-assistant/entities/message/api/types';
import { FeedbackReactionButton } from '@search-assistant/features/feedback-reaction-button';

import { formatTime, setHtml } from '../lib/utils';
import * as Styled from './Bubble.styled';

type BubbleProps = MessageType & {
  id?: number;
  reaction?: boolean | null;
};

export const Bubble = memo(
  ({ text, timestamp, sender, link, id, reaction }: BubbleProps) => {
    const messageRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      const message = messageRef.current;
      if (message) setHtml(message, text);
    }, [text]);

    const likeInitReaction = reaction === true ? true : undefined;
    const dislikeInitReaction = reaction === false ? true : undefined;

    const isBotSender = sender === 'bot' || sender === 'opensearch';

    return (
      <Styled.Bubble sender={sender}>
        <Styled.MessageText sender={sender}>
          <Text
            color={isBotSender ? 'gray900' : 'gray0'}
            ref={messageRef}
            key={`bubble-message-${timestamp}`}
            wordBreak='break-word'
            whiteSpace='pre-wrap'
          />
          {link && (
            <Link href={link} target='_blank'>
              {sender === 'bot' ? 'Подробное описание' : 'Статья'}
            </Link>
          )}
        </Styled.MessageText>
        <Styled.Footer>
          {sender === 'bot' && id && (
            <Styled.FeedbackContainer>
              <FeedbackReactionButton
                reactionType={'like'}
                initState={likeInitReaction}
                answerId={id}
              />
              <FeedbackReactionButton
                reactionType={'dislike'}
                initState={dislikeInitReaction}
                answerId={id}
              />
            </Styled.FeedbackContainer>
          )}
          <Styled.Time size='small' color={isBotSender ? 'gray650' : 'gray0'}>
            {formatTime(timestamp)}
          </Styled.Time>
        </Styled.Footer>
      </Styled.Bubble>
    );
  },
);

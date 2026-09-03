import React, { useMemo } from 'react';

import { BubblesGroup } from '@search-assistant/widgets/bubbles/ui/BubblesGroup';
import type {
  AnswerType,
  MessageTransaction,
  MessageType,
} from '@search-assistant/entities/message/api/types';

type BubbleTransactionGroupProps = {
  transaction: MessageTransaction;
};

export const BubbleTransactionGroup = ({ transaction }: BubbleTransactionGroupProps) => {
  const { responses } = transaction;

  const requestMessages: MessageType[] = useMemo(
    () => [
      {
        sender: 'user',
        text: transaction.question,
        timestamp: Date.parse(transaction.question_time),
      },
    ],
    [transaction.question, transaction.question_time],
  );

  const responseMessages: AnswerType[] = useMemo(
    () =>
      responses.map(item => ({
        id: item.id,
        sender: item.sender || 'bot',
        text: item.text,
        timestamp: Date.parse(item.answer_time),
        reaction: item.reaction,
      })),
    [responses],
  );

  return (
    <>
      <BubblesGroup
        key={`bubbles-group-request-${transaction.id}`}
        sender={'user'}
        messages={requestMessages}
      />
      {!!responseMessages.length && (
        <BubblesGroup
          key={`bubbles-group-response-${transaction.id}`}
          sender={'bot'}
          messages={responseMessages}
        />
      )}
    </>
  );
};

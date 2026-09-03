import React, { useMemo } from 'react';

import { useStore } from '@search-assistant/app/store/hooks';
import { MessageHistoryLoader } from '@search-assistant/features/message-history-loader';

import { useScrollEffects } from '../hooks';
import { groupMessages } from '../lib/utils';
import { BubblesDateHistoryGroup } from './bubbles-date-history-group';
import { BubblesDateGroup } from './BubblesDateGroup';
import * as Styled from './Bubbles.styled';

export const Bubbles = () => {
  const { messages, history } = useStore('messages', 'history');
  const groupedMessages = useMemo(() => groupMessages(messages), [messages]);

  const { scrollableRef, bubblesRef, chatInnerRef, guardRef } =
    useScrollEffects(messages);

  const currentMessages = useMemo(() => {
    return Object.entries(groupedMessages).map(([date, groups]) => (
      <BubblesDateGroup key={`bubbles-date-group-${date}`} date={date} groups={groups} />
    ));
  }, [groupedMessages]);

  const historyMessages = useMemo(() => {
    return Object.entries(history).map(([date, transactions]) => (
      <BubblesDateHistoryGroup
        key={`bubbles-date-history-group-${date}`}
        date={date}
        transactions={transactions}
      />
    ));
  }, [history]);

  return (
    <Styled.Bubbles>
      <Styled.Scrollable ref={scrollableRef}>
        <Styled.Inner ref={chatInnerRef}>
          <Styled.BubblesContainer ref={bubblesRef}>
            <MessageHistoryLoader scrollableContainerRef={scrollableRef} />
            {historyMessages}
            {currentMessages}
          </Styled.BubblesContainer>
          <div ref={guardRef} />
        </Styled.Inner>
      </Styled.Scrollable>
    </Styled.Bubbles>
  );
};

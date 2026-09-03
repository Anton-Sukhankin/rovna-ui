import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';

import { useMessagesHistoryQuery } from '@search-assistant/entities/message/api/hooks';
import { store } from '@search-assistant/app/store';

export const useMessagesHistory = (
  scrollableContainerRef?: React.RefObject<HTMLDivElement>,
) => {
  const [showHistory, setShowHistory] = useState(false);
  const { fetchPrevDayMessages, hasPreviousDay, historyFetching, historyMessages } =
    useMessagesHistoryQuery();

  const fetchPrevDayMessagesHandler = useCallback(async () => {
    if (!showHistory) setShowHistory(true);
    else await fetchPrevDayMessages();
  }, [fetchPrevDayMessages, showHistory]);

  const prevHeightValue = useRef(0);

  useLayoutEffect(() => {
    const scrollable = scrollableContainerRef?.current;

    if (showHistory && historyMessages && historyMessages?.length > 0) {
      store.dispatch('history_transactions/add', historyMessages);

      if (scrollable) {
        requestAnimationFrame(() => {
          scrollable.scrollTop = scrollable.scrollHeight - prevHeightValue.current;
        });
      }
    }

    return () => {
      if (scrollable) {
        prevHeightValue.current = scrollable.scrollHeight;
      }
    };
  }, [historyMessages, scrollableContainerRef, showHistory]);

  return {
    fetchPrevDayMessagesHandler,
    historyFetching,
    hasPreviousDay,
    showHistory,
  };
};

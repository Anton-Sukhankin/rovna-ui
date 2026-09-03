import React, { useCallback, useMemo } from 'react';
import { Dislike, Like } from '@rovna-ui/icons';

import { useStore } from '@search-assistant/app/store/hooks';
import { FeedbackToggleButton } from '@search-assistant/shared/ui/feedback-toggle-button';
import { useSendFeedbackMutation } from '@search-assistant/entities/message/api/hooks';

export const FeedbackReactionButton = ({
  answerId,
  initState,
  reactionType,
}: {
  answerId: number;
  initState?: boolean;
  reactionType: 'like' | 'dislike';
}) => {
  const { feedbacks } = useStore('feedbacks');
  const { sendFeedback } = useSendFeedbackMutation();

  const isLikeButton = reactionType === 'like';

  const selected = useMemo(() => {
    if (initState !== undefined && feedbacks[answerId] === undefined) {
      return initState;
    }

    return feedbacks[answerId] === isLikeButton;
  }, [answerId, feedbacks, initState, isLikeButton]);

  const handleToggleButton = useCallback(() => {
    const reaction = selected ? null : isLikeButton;

    sendFeedback({ answerId, reaction });
  }, [selected, isLikeButton, sendFeedback, answerId]);

  return (
    <FeedbackToggleButton selected={selected} onSelectedChange={handleToggleButton}>
      {isLikeButton ? (
        <Like style={{ fontSize: '16px' }} />
      ) : (
        <Dislike style={{ fontSize: '16px' }} />
      )}
    </FeedbackToggleButton>
  );
};

import { useMutation } from '@tanstack/react-query';

import { post } from '@search-assistant/shared/api';
import { useStore } from '@search-assistant/app/store/hooks';

import { urls } from '../consts';
import { FeedbackType } from '../types';

export const useSendFeedbackMutation = () => {
  const { dispatch, feedbacks } = useStore('feedbacks');

  const { mutate } = useMutation({
    mutationFn: ({ answerId, reaction }: FeedbackType) =>
      post(urls.feedback, { answer_id: answerId, reaction }),
    onMutate: (feedback: FeedbackType) => {
      const prevValue = {
        answerId: feedback.answerId,
        reaction: feedbacks[feedback.answerId],
      };

      dispatch('feedback', feedback);

      return prevValue;
    },
    onError: (error, variables, context) => {
      dispatch('feedback', context);
    },
  });

  return {
    sendFeedback: mutate,
  };
};

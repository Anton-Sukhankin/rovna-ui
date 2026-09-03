import { useMutation } from '@tanstack/react-query';

import { post } from '@search-assistant/shared/api';
import { store } from '@search-assistant/app/store';

import { urls } from '../consts';
import type { AnswerType } from '../types';

export const useSendMessageMutation = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (question: string) =>
      post<Array<AnswerType>>(urls.answer, { question, source: 'pro' }),
    onMutate: (question: string) => {
      store.dispatch('messages/add', {
        sender: 'user',
        text: question,
        timestamp: Date.now(),
      });
    },
    onSuccess: (data: AnswerType[]) => {
      let index = 0;

      const addMessage = () => {
        if (index < data.length) {
          const message = data[index];
          store.dispatch('messages/add', {
            ...message,
            timestamp: Date.now(),
            originalDatetime: message.datetime,
          });
          index++;
        } else {
          clearInterval(intervalId);
        }
      };

      const intervalId = setInterval(addMessage, 500);
    },
  });

  return { performSendMessage: mutate, isSending: isLoading };
};

// @ts-expect-error module
import { StoreonModule } from 'storeon';

import {
  AnswerType,
  FeedbackType,
  MessageTransaction,
  MessageType,
} from '@search-assistant/entities/message/api/types';

export interface MessagesState {
  history: Record<string, MessageTransaction[]>;
  messages: Array<MessageType | AnswerType>;
  feedbacks: {
    [answerId: number]: boolean | null;
  };
}

export interface MessagesEvents {
  'messages/add': MessageType | AnswerType;
  'history_transactions/add': MessageTransaction[];
  feedback: FeedbackType;
}

const initialMessage: MessageType = {
  text: `Привет! Это Поиск.\nЯ здесь, чтобы помочь вам разобраться в сервисе Самолет. Задайте вопрос, а я постараюсь помочь.`,
  sender: 'bot',
  timestamp: Date.now(),
};

export const messagesModule: StoreonModule<MessagesState, MessagesEvents> = store => {
  store.on('@init', () => ({ messages: [initialMessage], history: {}, feedbacks: {} }));
  store.on('messages/add', (state, message) => ({
    messages: state.messages.concat(message),
  }));

  store.on('history_transactions/add', (state, history_transactions) => {
    const dateString = new Date(history_transactions[0].question_time)
      .toISOString()
      .split('T')[0];

    return {
      history: {
        [dateString]: history_transactions,
        ...state.history,
      },
    };
  });

  store.on('feedback', (state, feedback) => ({
    feedbacks: { ...state.feedbacks, [feedback.answerId]: feedback.reaction },
  }));
};

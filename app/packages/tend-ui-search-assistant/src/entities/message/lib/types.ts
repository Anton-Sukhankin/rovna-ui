import type {
  AnswerType,
  MessageType,
  SenderType,
} from '@search-assistant/entities/message/api/types';

export type BubblesGroupType = {
  sender: SenderType;
  timestamp: number;
  messages: Array<MessageType | AnswerType>;
};

export type BubblesDateGroupType = {
  [date: string]: Array<BubblesGroupType>;
};

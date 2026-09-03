export type SenderType = 'bot' | 'opensearch' | 'user';

export type MessageType = {
  text: string;
  link?: string;
  sender: SenderType;
  timestamp: number;
  originalDatetime?: string;
};

export type AnswerType = MessageType & {
  id: number;
  reaction?: boolean | null;
  datetime?: string;
};

export type FeedbackType = {
  answerId: number;
  reaction: boolean | null;
};

export type TransactionResponse = {
  id: number;
  text: string;
  link: string;
  answer_time: string;
  reaction: boolean | null;
  created_at?: string;
  sender?: SenderType;
};

export type MessageTransaction = {
  id: number;
  profile_id: number;
  question: string;
  question_time: string;
  source: string;
  responses: TransactionResponse[];
  created_at?: string;
};

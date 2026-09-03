// @ts-expect-error module
import * as storeon from 'storeon';

import { type MessagesEvents, type MessagesState, messagesModule } from './messages';
import { type GeneralEvents, type GeneralState, generalModule } from './general';

export type State = GeneralState & MessagesState;
export type Events = GeneralEvents & MessagesEvents;

export const store = storeon.createStoreon<State, Events>([
  generalModule,
  messagesModule,
]);

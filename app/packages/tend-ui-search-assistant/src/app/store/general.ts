// @ts-expect-error module
import { StoreonModule } from 'storeon';

export interface GeneralState {
  open: boolean;
}

export interface GeneralEvents {
  'general/open': undefined;
}

export const generalModule: StoreonModule<GeneralState, GeneralEvents> = store => {
  store.on('@init', () => ({ open: false }));
  store.on('general/open', state => ({ open: !state.open }));
};

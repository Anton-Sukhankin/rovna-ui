import { contextFactory } from '@rovna-ui/factories';

import { Language } from '../types';

export const [LanguageContext, useLanguageContext] = contextFactory<Language>(
  'LanguageContext',
  'ru',
);

import React from 'react';
import { extract } from '@rovna-ui/utils';

import { ru } from '../messages/ru';
import { en } from '../messages/en';
import { useLanguage } from './useLanguage';

export const useTranslation = () => {
  const lang = useLanguage('useTranslation');
  const schema = { ru, en }[lang];

  return React.useCallback((path: string[]) => extract(schema, path) as string, [schema]);
};

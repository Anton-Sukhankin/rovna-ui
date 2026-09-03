import ruRU from 'antd-core/locale/ru_RU';
import enUS from 'antd-core/locale/en_US';

import { useLanguage } from './useLanguage';

export const useLocale = () => {
  const language = useLanguage('useLocale');

  return {
    ru: ruRU,
    en: enUS,
  }[language];
};

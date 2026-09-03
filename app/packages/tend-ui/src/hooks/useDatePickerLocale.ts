import React from 'react';
import { PickerLocale } from 'antd-core/es/date-picker/generatePicker';
import { useLanguage } from '@rovna-ui/locale';
import ru_RU from 'antd-core/es/date-picker/locale/ru_RU';
import en_US from 'antd-core/es/date-picker/locale/en_US';

export const useDatePickerLocale = (locale?: PickerLocale) => {
  const lang = useLanguage('useDatePickerLocale');

  return React.useMemo(() => {
    const defaultLocale = locale ?? { ru: ru_RU, en: en_US }[lang];

    return {
      ...defaultLocale,
      lang: {
        monthFormat: 'MMMM',
        ...defaultLocale.lang,
      },
    };
  }, [lang, locale]);
};

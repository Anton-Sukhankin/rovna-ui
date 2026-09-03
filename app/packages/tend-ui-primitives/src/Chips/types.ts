import React from 'react';

export type ChipsRef = HTMLDivElement;
export type ChipsRawOption = string | number;
export type ChipsLabeledOption = { label: React.ReactNode; value: ChipsRawOption };
export type ChipsOption = ChipsRawOption | ChipsLabeledOption;
export type ChipsProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> & {
  /**
   * Режим работы (множественный/одиночный)
   */
  mode?: 'single' | 'multiple';
  /**
   * Значение опций
   */
  value?: ChipsOption[];
  /**
   * Опции по умолчанию. Устанавливается при первом `mounting`'е
   */
  defaultValue?: ChipsOption[];
  /**
   * Опции
   */
  options: ChipsOption[];
  /**
   * Вызывается при изменении выбранных опцияй
   */
  onChange?: (options: ChipsOption[]) => void;
};

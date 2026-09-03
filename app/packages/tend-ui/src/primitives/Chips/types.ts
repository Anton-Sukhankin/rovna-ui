import React from 'react';

export type ChipsRef = HTMLDivElement;
export type ChipsRawOption = string | number;
export type ChipsLabeledOption = { label: React.ReactNode; value: ChipsRawOption };
export type ChipsOption = ChipsRawOption | ChipsLabeledOption;
export type ChipsProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> & {
  value?: ChipsOption[];
  options: ChipsOption[];
  onChange?: (option: ChipsOption, options: ChipsOption[]) => void;
};

import React from 'react';

export type DividerOption = { type: 'divider' };
export type RawOption = string | number;
export type LabeledOption = { label: React.ReactNode; value: RawOption };
export type Option = RawOption | LabeledOption | DividerOption;

export const isLabeledOption = (value: Option): value is LabeledOption => {
  return typeof value === 'object';
};

export const isRawOption = (value: Option): value is RawOption => {
  return typeof value !== 'object';
};

export const isDividerOption = (value: Option): value is DividerOption => {
  return typeof value === 'object' && 'type' in value;
};

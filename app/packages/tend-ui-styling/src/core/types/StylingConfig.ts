import { CSSProperties } from 'styled-components';

type CSSNames = keyof CSSProperties;

type BooleanPropertyConfig = {
  type: 'boolean';
  properties: Partial<Record<CSSNames, string>>;
};
type StringPropertyConfig = {
  type: 'string';
  properties: CSSNames[];
};
type StringOrNumberPropertyConfig = {
  type: 'string | number';
  properties: CSSNames[];
  transform?: (value: string | number) => string;
};

export type StylingConfig<K extends string> = Record<
  K,
  BooleanPropertyConfig | StringPropertyConfig | StringOrNumberPropertyConfig
>;

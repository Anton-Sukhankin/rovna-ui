export interface StringifyOptions {
  arrayFormat?: 'comma' | string;
  [key: string]: unknown;
}

export type StringifiableValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number | boolean | null | undefined>;

export type StringifiableRecord = Record<string, StringifiableValue>;

export declare function stringify(input?: StringifiableRecord, options?: StringifyOptions): string;

declare const queryString: {
  stringify: typeof stringify;
};

export default queryString;

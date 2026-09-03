import { InputProps, InputRef } from '@rovna-internal/components/primitives/Input';

export type SearchRef = InputRef;
export type SearchProps = Omit<InputProps, 'prefix'> & {
  onSearch?: (search: string) => void;
};

import { InputNumberProps } from '@rovna-ui/components/primitives';

// FIXME: Исправить дженерик
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InputNumberFilter = InputNumberProps<any> & {
  component: 'input-number';
};

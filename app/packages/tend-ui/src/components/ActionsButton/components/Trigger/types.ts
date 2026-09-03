import { ButtonProps } from '@rovna-internal/components/primitives/Button';

export type TriggerProps = Omit<ButtonProps<'button'>, 'before' | 'after'>;

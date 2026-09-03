import { ToggleButtonProps } from '@rovna-internal/components/primitives/ToggleButton';

export type View = 'list' | 'table';
export type ViewButtonProps = ToggleButtonProps & {
  onViewChange?: (view: View) => void;
};

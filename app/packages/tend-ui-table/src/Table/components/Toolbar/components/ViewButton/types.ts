import { ToggleButtonProps } from '@rovna-ui/primitives';

export type View = 'list' | 'table';
export type ViewButtonProps = ToggleButtonProps & {
  onViewChange?: (view: View) => void;
};

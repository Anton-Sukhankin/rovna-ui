import { TooltipProps } from '@rovna-internal/components/primitives/Tooltip';
import { ToggleButtonProps } from '@rovna-internal/components/primitives/ToggleButton';

export type SortersButtonProps = ToggleButtonProps & {
  tooltip?: TooltipProps;
};

import { ColumnPosition } from '@rovna-internal/components/components/ColumnsSettings/types';

export type PinningButtonProps = {
  disabled?: boolean;
  pinned?: boolean;
  onClick?: () => void;
  onChange?: (position: ColumnPosition) => void;
};

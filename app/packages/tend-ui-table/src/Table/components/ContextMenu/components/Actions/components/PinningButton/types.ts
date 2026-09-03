export type PinningButtonProps = {
  disabled?: boolean;
  pinned?: boolean;
  onClick?: () => void;
  onChange?: (position: 'left' | 'right' | 'none') => void;
};

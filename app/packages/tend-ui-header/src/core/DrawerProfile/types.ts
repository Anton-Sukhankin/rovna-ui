import { ProfileMenuItem } from '@rovna-ui/components/components';
import { AvatarProps } from '@rovna-ui/components/primitives';

export type DrawerProfileProps = {
  title?: string;
  description?: string;
  avatar?: AvatarProps;
  open?: boolean;
  items?: ProfileMenuItem[];
  onClose?: () => void;
  onLogout?: () => void;
};

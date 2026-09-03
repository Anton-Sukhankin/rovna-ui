import { SamoletProfile } from '@rovna-ui/types';
import { ProfileMenuItem } from '@rovna-ui/components/components';

export type MobileProfileProps = {
  open?: boolean;
  onClose?: () => void;
  user?: SamoletProfile;
  items?: ProfileMenuItem[] | ((items: ProfileMenuItem[]) => ProfileMenuItem[]);
  onLogout?: () => void;
};

import { SamoletProfile } from '@rovna-ui/types';
import { ProfileItem } from '@rovna-ui/components/components';

export type ProfileProps = {
  user?: SamoletProfile;
  items?: ProfileItem[] | ((items: ProfileItem[]) => ProfileItem[]);
  onLogout?: () => void;
};

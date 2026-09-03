import { SamoletProfile, Stand } from '@rovna-ui/types';

import { ProfileProps } from '@rovna-internal/header/SamoletHeader/components/desktop';
import { NavigationProps } from '@rovna-internal/header/core';

export type MobileBurgerMenuProps = {
  stand: Stand;
  authenticated?: boolean;
  navigation?: NavigationProps;
  profile?: Pick<ProfileProps, 'items'>;
  user?: SamoletProfile;
  onLogout?: () => void;
};

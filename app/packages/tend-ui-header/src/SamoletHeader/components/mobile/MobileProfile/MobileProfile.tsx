import React from 'react';
import { sha1 } from 'js-sha1';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Logout } from '@rovna-ui/icons/Logout';
import { User } from '@rovna-ui/icons/User';
import { ProfileMenuItem } from '@rovna-ui/components/components';

import { DrawerProfile } from '@rovna-internal/header/core/DrawerProfile';
import { useRole } from '@rovna-internal/header/SamoletHeader/hooks/useRole';
import { getSamoletHeaderRuntimeConfig } from '@rovna-internal/header/consts';

import { MobileProfileProps } from './types';

const MobileProfile = ({ open, onClose, user, items, onLogout }: MobileProfileProps) => {
  const t = useTranslation();
  const { isEmployee } = useRole(user);
  const { avatarBaseUrl, profileUrl } = getSamoletHeaderRuntimeConfig();

  const _items = React.useMemo(() => {
    const defaultItems = [
      isEmployee && profileUrl && {
        key: 'profile-menu-item-profile',
        label: t(['widgets', 'Layout', 'Profile', 'profile']),
        icon: <User color='gray500' />,
        onClick: () => {
          window.open(profileUrl, '_blank');
        },
      },
      {
        key: 'profile-menu-item-logout',
        label: t(['widgets', 'Layout', 'Profile', 'logout']),
        icon: <Logout color='gray500' />,
        onClick: onLogout,
      },
    ].filter(Boolean) as ProfileMenuItem[];

    return typeof items === 'function'
      ? items(defaultItems)
      : (items || []).concat(defaultItems);
  }, [isEmployee, items, onLogout, profileUrl, t]);

  const source =
    user && avatarBaseUrl
      ? new URL(`media/${sha1(user.username)}.jpg`, avatarBaseUrl)
      : undefined;

  return (
    <DrawerProfile
      open={open}
      onClose={onClose}
      items={_items}
      avatar={{ src: source?.href }}
      title={[user?.firstName, user?.lastName].filter(Boolean).join(' ')}
      description={user?.email}
    />
  );
};

MobileProfile.displayName = 'SamoletHeader.MobileProfile';

export { MobileProfile };

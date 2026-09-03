import React from 'react';
import { sha1 } from 'js-sha1';
import groupBy from 'lodash/groupBy';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Logout } from '@rovna-ui/icons/Logout';
import { User } from '@rovna-ui/icons/User';

import { ProfileItem, Profile as _Profile } from '@rovna-internal/components/components/Profile';
import { useLayoutContext } from '@rovna-internal/components/widgets/Layout/contexts';

import { ProfileProps } from './types';
import { MenuDefaultAction } from './consts';

const isDefaultItem = (item: ProfileItem) => {
  return (
    [MenuDefaultAction.Logout, MenuDefaultAction.Profile] as (
      | string
      | number
      | undefined
    )[]
  ).includes(item?.key);
};

const Profile = ({
  avatar,
  avatarBaseUrl,
  profileUrl,
  logoutUrl = '/accounts/logout/',
  items = [],
  defaultItems,
  ...props
}: ProfileProps) => {
  const t = useTranslation();
  const { profile } = useLayoutContext();

  const _avatar = React.useMemo(() => {
    if (avatar || !profile || !avatarBaseUrl) return avatar;

    const source = new URL(`media/${sha1(profile.username)}.jpg`, avatarBaseUrl);

    return { src: source.href };
  }, [avatar, avatarBaseUrl, profile]);

  const _defaultItems = React.useMemo<ProfileItem[]>(() => {
    const dict = groupBy(items, 'key');

    const defaults: ProfileItem[] = [
      ...(profileUrl
        ? [
            {
              key: MenuDefaultAction.Profile,
              label: t(['widgets', 'Layout', 'Profile', 'profile']),
              icon: <User />,
              onClick: () => {
                window.open(profileUrl, '_blank');
              },
            },
          ]
        : []),
      {
        key: MenuDefaultAction.Logout,
        label: t(['widgets', 'Layout', 'Profile', 'logout']),
        icon: <Logout />,
        onClick: () => {
          window.location.replace(logoutUrl);
        },
      },
    ];

    const result = defaults.map(defaultItem => {
      const overwritten =
        defaultItem.key === undefined ? undefined : dict[defaultItem.key]?.[0];

      return { ...defaultItem, ...overwritten };
    });

    return defaultItems ? defaultItems(result) : result;
  }, [defaultItems, items, logoutUrl, profileUrl, t]);

  return (
    <_Profile
      items={React.useMemo(
        () => items.filter(item => !isDefaultItem(item)).concat(_defaultItems),
        [_defaultItems, items],
      )}
      avatar={_avatar}
      title={[profile?.firstName, profile?.lastName].filter(Boolean).join(' ')}
      description={profile?.email}
      {...props}
    />
  );
};

Profile.displayName = 'Layout.Header.Profile';
Profile.MenuDefaultAction = MenuDefaultAction;

export { Profile };

import React from 'react';
import { Image, Skeleton } from '@rovna-ui/components/ui';
import { Apps } from '@rovna-ui/icons/Apps';
import { StackNavigation } from '@rovna-ui/primitives';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';

import { useSamoletServices } from '@rovna-internal/header/SamoletHeader/hooks/useSamoletServices';
import type { SamoletService } from '@rovna-internal/header/SamoletHeader/hooks/types';
import { NavigationItem } from '@rovna-internal/header/core/types';
import { DrawerBurgerMenu } from '@rovna-internal/header/core/DrawerBurgerMenu';
import {
  getSamoletHeaderRuntimeConfig,
  getSamoletHeaderUrl,
} from '@rovna-internal/header/consts';

import { MobileProfile } from '../MobileProfile';
import { MobileBurgerMenuProps } from './types';

const preloader: NavigationItem[] = Array.from({ length: 10 }).map(() => ({
  key: '1',
  label: <Skeleton height={15} width={100} backgroundColor='#e6e6e6' />,
  type: 'group',
  children: [
    { key: '2', label: <Skeleton height={50} backgroundColor='#e6e6e6' /> },
    { key: '3', label: <Skeleton height={50} backgroundColor='#e6e6e6' /> },
    { key: '4', label: <Skeleton height={50} backgroundColor='#e6e6e6' /> },
  ],
}));

export const MobileBurgerMenu = ({
  authenticated,
  stand,
  navigation,
  profile,
  user,
  onLogout,
}: MobileBurgerMenuProps) => {
  const { data, loading, request, available } = useSamoletServices(stand);
  const { serviceIconBaseUrl } = getSamoletHeaderRuntimeConfig();
  const analyticsUrl = getSamoletHeaderUrl('analytics', stand);
  const supportUrl = getSamoletHeaderUrl('support', stand);
  const t = useTranslation();

  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  const src = React.useCallback((service: SamoletService) => {
    if (!serviceIconBaseUrl) return service.icon.file;

    const color = service.isActive ? 'blue600' : 'gray400';
    return `${serviceIconBaseUrl.replace(/\/$/, '')}/${service.tuiIconName}-${color}.svg`;
  }, [serviceIconBaseUrl]);

  const services = React.useMemo<NavigationItem[]>(() => {
    const empty: NavigationItem[] = [];

    if (!data) return empty;

    const services = data.categories.map<NavigationItem>(service => {
      return {
        key: service.name,
        label: service.name,
        type: 'group',
        children: service.services.map<NavigationItem>(service => ({
          key: service.id.toString(),
          label: service.name,
          icon: <Image width={20} src={src(service)} alt={service.name} />,
          onClick: () => {
            window.open(service.link, '_blank');
          },
        })),
      } as NavigationItem;
    });

    return services;
  }, [data, src]);

  const closeProfileMenu = React.useCallback(() => {
    setIsProfileOpen(false);
  }, []);

  const items = React.useMemo(
    () =>
      [
        authenticated && analyticsUrl && {
          key: 'analytics',
          label: t(['widgets', 'Layout', 'Header', 'analytics']),
          onClick: () => {
            window.open(analyticsUrl, '_blank');
          },
        },
        authenticated && supportUrl && {
          key: 'support',
          label: t(['widgets', 'Layout', 'Header', 'info']),
          onClick: () => {
            const linkUrl = new URL(supportUrl);
            linkUrl.searchParams.append('auth', 'true');

            window.open(linkUrl.href, '_blank');
          },
        },
        authenticated && {
          key: 'profile',
          label: 'Профиль',
          onClick: () => {
            setIsProfileOpen(true);
          },
        },
      ].filter(Boolean) as NavigationItem[],
    [analyticsUrl, authenticated, supportUrl, t],
  );

  return (
    <DrawerBurgerMenu
      title='Меню'
      header={
        authenticated && available && (
          <StackNavigation
            items={[
              {
                key: 'services',
                icon: <Apps size={20} color='blue600' />,
                label: 'Все сервисы',
                onClick: () => {
                  request();
                },
                children: loading ? preloader : services,
              },
            ]}
          />
        )
      }
      footer={
        <>
          {items.length > 0 && <StackNavigation items={items} />}
          {authenticated && (
            <MobileProfile
              {...profile}
              user={user}
              open={isProfileOpen}
              onLogout={onLogout}
              onClose={closeProfileMenu}
            />
          )}
        </>
      }
      navigation={navigation}
    />
  );
};

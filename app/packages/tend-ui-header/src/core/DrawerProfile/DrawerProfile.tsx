import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Logout } from '@rovna-ui/icons/Logout';
import { Drawer, StackNavigation } from '@rovna-ui/primitives';
import { Text, Title } from '@rovna-ui/typography';
import { Avatar } from '@rovna-ui/components/primitives';
import { Box } from '@rovna-ui/grid';
import { ProfileMenuItem } from '@rovna-ui/components/components';

import { DrawerProfileProps } from './types';

/**
 * Внутренний компонент для нужд дизайн системы
 */
export const DrawerProfile = ({
  open,
  onClose,
  title,
  description,
  avatar,
  items,
  onLogout,
}: DrawerProfileProps) => {
  const t = useTranslation();
  const fullname = [title, description].filter(Boolean).join(' ');

  return (
    <Drawer.Root
      fullscreen={{ offset: '0px' }}
      backgroundColor='gray50'
      open={open}
      onClose={onClose}
    >
      <Drawer.Header>
        <Box $display='flex' $alignItems='center' $gap={8}>
          <Drawer.CloseButton />
          <Title margin='0' level='h6'>
            Профиль
          </Title>
        </Box>
      </Drawer.Header>
      <Drawer.Body>
        <Box $mb={32} $display='flex' $flexDirection='column' $alignItems='center'>
          <Avatar
            alt={fullname}
            {...avatar}
            size='xl'
            bordered
            UNSTABLE_styling={{ borderColor: 'blue600' }}
          />
          {title && (
            <Text strong size='large'>
              {title}
            </Text>
          )}
          {description && (
            <Text color='gray500' size='small'>
              {description}
            </Text>
          )}
        </Box>
        <StackNavigation
          items={React.useMemo<ProfileMenuItem[]>(() => {
            if (items) return items;

            const defaultItems: ProfileMenuItem[] = [
              {
                key: 'profile-menu-item-logout',
                label: t(['widgets', 'Layout', 'Profile', 'logout']),
                icon: <Logout color='gray500' />,
                onClick: onLogout,
              },
            ];

            return defaultItems;
          }, [items, onLogout, t])}
        />
      </Drawer.Body>
    </Drawer.Root>
  );
};

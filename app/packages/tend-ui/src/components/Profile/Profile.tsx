import React from 'react';

import { Avatar } from '@rovna-internal/components/primitives/Avatar';
import { Dropdown } from '@rovna-internal/components/primitives/Dropdown';
import { Box } from '@rovna-internal/components/grid/Box';
import { Text } from '@rovna-internal/components/typography/Text';

import { ProfileMenuItem, ProfileProps } from './types';

const overlayStyle: React.CSSProperties = { minWidth: '256px' };

const Profile = ({ title, description, items, avatar }: ProfileProps) => {
  const menu = React.useMemo<{ items: ProfileMenuItem[] }>(() => {
    const node: ProfileMenuItem = {
      disabled: true,
      key: 'profile-avatar-menu-item',
      label: (
        <Box $display='flex' $alignItems='center' $gap={12}>
          <Avatar {...avatar} size='medium' />
          <Box $display='flex' $flexDirection='column'>
            <Text size='large'>{title}</Text>
            <Text size='small' color='gray500'>
              {description}
            </Text>
          </Box>
        </Box>
      ),
    };

    const divider: ProfileMenuItem = {
      type: 'divider',
    };

    if (!items || !items.length)
      return {
        items: [node],
      };

    const nodes: ProfileMenuItem[] = [node, divider];
    const result = nodes.concat(items);

    return {
      items: result,
    };
  }, [avatar, description, items, title]);

  return (
    <Dropdown items={menu.items} trigger={['click']} overlayStyle={overlayStyle}>
      <Avatar {...avatar} size='small' pointer />
    </Dropdown>
  );
};

Profile.displayName = 'Profile';

export { Profile };

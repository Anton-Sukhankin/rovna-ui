import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Notification } from '@rovna-ui/icons/Notification';

import { Tooltip } from '@rovna-internal/components/primitives/Tooltip';
import { ToggleButton } from '@rovna-internal/components/primitives/ToggleButton';

import { NotificationsButtonProps } from './types';

const NotificationsButton = (props: NotificationsButtonProps) => {
  const t = useTranslation();

  return (
    <Tooltip title={t(['widgets', 'Layout', 'Header', 'notifications'])}>
      <ToggleButton {...props}>
        <Notification color='gray900' size={20} />
      </ToggleButton>
    </Tooltip>
  );
};

NotificationsButton.displayName = 'Layout.Header.NotificationsButton';

export { NotificationsButton };

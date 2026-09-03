import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Chat as _Chat } from '@rovna-ui/icons/Chat';

import { Tooltip } from '@rovna-internal/components/primitives/Tooltip';
import { ToggleButton } from '@rovna-internal/components/primitives/ToggleButton';

import { ChatButtonProps } from './types';

const ChatButton = (props: ChatButtonProps) => {
  const t = useTranslation();

  return (
    <Tooltip title={t(['widgets', 'Layout', 'Header', 'chat'])}>
      <ToggleButton {...props}>
        <_Chat color='gray900' size={20} />
      </ToggleButton>
    </Tooltip>
  );
};

ChatButton.displayName = 'Layout.Header.ChatButton';

export { ChatButton };

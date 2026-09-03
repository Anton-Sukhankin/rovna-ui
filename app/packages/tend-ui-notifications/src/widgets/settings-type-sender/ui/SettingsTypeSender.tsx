import { Box } from '@rovna-ui/components/grid';
import { Text } from '@rovna-ui/components/typography';
import React, { useCallback } from 'react';
import { Checkbox } from '@rovna-ui/components/primitives';

import type {
  NotificationTypeSenderEntity,
  NotificationTypeSenderType,
} from '@notifications/api/types';
import { NotificationTypeSenders } from '@notifications/shared/consts/senders-types';

import { useTypeSenderEntries } from '../hooks/useSettingsParams';

export const SettingsTypeSender = () => {
  const { typeSenderEntries, changeSettings } = useTypeSenderEntries();

  const onCheck = useCallback(
    (event, senderType: NotificationTypeSenderType) => {
      changeSettings('sender_types', senderType, event.target.checked);
    },
    [changeSettings],
  );

  return (
    <Box $display='flex' $flexDirection='column' $gap={12}>
      <Text size={'medium'} fontWeight={600}>
        Способ
      </Text>
      <Box $display='flex' $flexDirection='column' $gap={8}>
        {typeSenderEntries?.map((option: NotificationTypeSenderEntity) => (
          <Box key={`type-sender-${option.type}`}>
            <Checkbox onChange={e => onCheck(e, option.type)} checked={option.is_active}>
              {NotificationTypeSenders[option.type]}
            </Checkbox>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

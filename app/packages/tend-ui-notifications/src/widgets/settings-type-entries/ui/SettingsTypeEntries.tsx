import React, { useCallback } from 'react';
import { Box } from '@rovna-ui/components/grid';
import { Text } from '@rovna-ui/components/typography';
import { Checkbox } from '@rovna-ui/components/primitives';

import type { NotificationType } from '@notifications/api/types';
import { notificationsTypesName } from '@notifications/shared/consts/notifications-types';

import { useTypeEntries } from '../hooks/useTypeEntries';

export const SettingsTypeEntries = () => {
  const { typeEntries, changeSettings } = useTypeEntries();

  const onCheck = useCallback(
    (event, senderType: NotificationType) => {
      changeSettings('notification_types', senderType, event.target.checked);
    },
    [changeSettings],
  );

  return (
    <Box $display='flex' $flexDirection='column' $gap={12}>
      <Text size={'medium'} fontWeight={600}>
        Тип
      </Text>
      <Box $display='flex' $flexDirection='column' $gap={8}>
        {typeEntries?.map(option => (
          <Box key={`notification-types-${option.type}`}>
            <Checkbox onChange={e => onCheck(e, option.type)} checked={option.is_active}>
              {notificationsTypesName[option.type]}
            </Checkbox>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

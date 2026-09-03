import { Box } from '@rovna-ui/components/grid';
import { Button } from '@rovna-ui/components/primitives';
import React from 'react';

import { useSaveSettingsState } from '@notifications/app/store/hooks';
import { SaveSettingsButton } from '@notifications/features/save-settings';
import { useConfirmCancelSavingCallback } from '@notifications/screens/service-settings';

export const SettingsActions = () => {
  const handleCancel = useConfirmCancelSavingCallback();
  const { isSavedSettings } = useSaveSettingsState();

  if (isSavedSettings) return null;

  return (
    <Box $display='flex' $justifyContent='flex-end' $gap={8} $width={'100%'} $mt={'auto'}>
      <Button variant='secondary' onClick={handleCancel}>
        Отменить
      </Button>
      <SaveSettingsButton />
    </Box>
  );
};

import { Box } from '@rovna-ui/components/grid';
import { ChevronLeft } from '@rovna-ui/components/icons';
import { Button } from '@rovna-ui/components/primitives';
import { Title } from '@rovna-ui/components/typography';
import React, { useCallback, useMemo } from 'react';

import {
  useCurrentModule,
  useSaveSettingsState,
  useScreen,
} from '@notifications/app/store/hooks';
import { useConfirmApplySavingCallback } from '@notifications/screens/service-settings';
import { screens_names } from '@notifications/shared/consts/screens-names';

export const DrawerTitle = () => {
  const { screen, setScreen } = useScreen();
  const { currentModule } = useCurrentModule();
  const { isSavedSettings } = useSaveSettingsState();
  const confirmSaving = useConfirmApplySavingCallback();

  const handleMain = useCallback(() => {
    const targetScreen = screen === 'service-settings' ? 'services' : 'list';

    screen === 'service-settings' && !isSavedSettings
      ? confirmSaving()
      : setScreen(targetScreen);
  }, [confirmSaving, screen, setScreen, isSavedSettings]);

  const titleText = useMemo(
    () =>
      screen &&
      (screen === 'service-settings'
        ? screens_names[screen] + (currentModule && ' ' + currentModule.name)
        : screens_names[screen]),
    [currentModule, screen],
  );

  return (
    <>
      <Box $display={'flex'} $gap={12}>
        {screen !== 'list' && (
          <Button
            size='small'
            variant='ghost'
            before={<ChevronLeft />}
            onClick={handleMain}
          />
        )}
        <Title level='h5' margin={0}>
          {titleText}
        </Title>
      </Box>
    </>
  );
};

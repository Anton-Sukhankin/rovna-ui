import { Button } from '@rovna-ui/components/primitives';
import React, { useCallback } from 'react';

import { useScreen } from '@notifications/app/store/hooks';
import type { Screen } from '@notifications/app/store/types';

import { getScreenProps } from '../lib/utils';

type SetViewButtonProps = {
  nextScreen: Screen | null;
};

export const SetScreenButton = ({ nextScreen }: SetViewButtonProps) => {
  const { setScreen } = useScreen();
  const handleClick = useCallback(() => setScreen(nextScreen), [setScreen, nextScreen]);

  const viewProps = getScreenProps(nextScreen);

  return <Button onClick={handleClick} {...viewProps} />;
};

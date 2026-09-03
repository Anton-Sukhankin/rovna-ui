import { Save } from '@rovna-ui/components/icons';
import { Button, Tooltip } from '@rovna-ui/components/primitives';
import React, { useCallback, useState } from 'react';

import { SavePresetModal } from './SavePresetModal';

export const SavePresetButton = () => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <Tooltip overlay='Сохранить фильтр'>
        <Button variant='secondary' before={<Save />} onClick={() => setOpen(true)} />
      </Tooltip>
      <SavePresetModal open={open} close={handleClose} />
    </>
  );
};

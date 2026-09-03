import { Button } from '@rovna-ui/components/primitives';
import React, { useCallback } from 'react';

import { useRestoreMutation } from '@notifications/api/hooks';

type RestoreDeletedButtonProps = {
  ids: number[];
  onSuccess: () => void;
};

export const RestoreDeletedButton = ({ ids, onSuccess }: RestoreDeletedButtonProps) => {
  const { performRestore } = useRestoreMutation();

  const handleRestore = useCallback(() => {
    performRestore(ids, { onSuccess });
  }, [performRestore, ids, onSuccess]);

  return (
    <Button size='small' onClick={handleRestore}>
      Отменить
    </Button>
  );
};

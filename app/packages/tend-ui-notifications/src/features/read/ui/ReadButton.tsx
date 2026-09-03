import { Button } from '@rovna-ui/components/primitives';
import React, { useCallback } from 'react';

import { useReadMutation } from '@notifications/api/hooks';

type ReadButtonProps = {
  id: number;
  onClick?: () => void;
};

export const ReadButton = ({ id, onClick }: ReadButtonProps) => {
  const { performRead } = useReadMutation();

  const handleClick = useCallback(() => {
    performRead([id]);
    onClick?.();
  }, [onClick, performRead, id]);

  return (
    <Button variant='link' size='small' padding={false} onClick={handleClick}>
      Прочитать
    </Button>
  );
};

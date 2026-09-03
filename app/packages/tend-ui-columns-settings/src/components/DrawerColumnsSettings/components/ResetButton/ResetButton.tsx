import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Button } from '@rovna-ui/primitives';

import { ResetButtonProps } from './types';

const ResetButton = ({ children, ...props }: ResetButtonProps) => {
  const t = useTranslation();
  const content = children ?? t(['components', 'ColumnsSettings', 'reset']);

  return (
    <Button size='small' variant='link' {...props}>
      {content}
    </Button>
  );
};

ResetButton.displayName = 'ColumnsSettings.ResetButton';

export { ResetButton };

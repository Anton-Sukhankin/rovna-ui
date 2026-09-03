import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';

import { Button } from './styled';
import { ResetButtonProps } from './types';

export const ResetButton = ({ ...props }: ResetButtonProps) => {
  const t = useTranslation();

  return (
    <Button padding={false} variant='link' {...props}>
      {t(['features', 'Table', 'reset'])}
    </Button>
  );
};

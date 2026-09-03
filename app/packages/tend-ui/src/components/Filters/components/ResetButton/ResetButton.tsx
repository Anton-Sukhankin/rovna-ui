import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';

import { Button } from '@rovna-internal/components/primitives/Button';
import { Form } from '@rovna-internal/components/components/Form';
import { useDisabled } from '@rovna-internal/components/components/Filters/hooks/useDisabled';

import { ResetButtonProps } from './types';

const ResetButton = ({ filter, ...props }: ResetButtonProps) => {
  const t = useTranslation();
  const form = Form.useFormInstance();
  const values = Form.useWatch([], form);
  const disabled = useDisabled({ config: filter }, values);

  return (
    <Button
      data-testid='rovna-ui-filters-reset-button'
      padding={false}
      variant='link'
      disabled={disabled}
      {...props}
    >
      {t(['general', 'reset'])}
    </Button>
  );
};

ResetButton.displayName = 'Filters.ResetButton';

export { ResetButton };

import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Button } from '@rovna-ui/components/primitives';
import { Form } from '@rovna-ui/components/components/Form';

import { useDisabled } from '@rovna-internal/filters/hooks/useDisabled';

import { ResetButtonProps } from './types';

const ResetButton = ({ filter, INTERNAL_scope, ...props }: ResetButtonProps) => {
  const t = useTranslation();
  const form = Form.useFormInstance();

  const values = Form.useWatch(values => {
    // Предполагаем, что когда мы используем фильтр вместе с таблицей
    // нужно извлекать значения из формы под scope потому что name будет приходить
    // массивного типа
    // FIXME: Придумать более универсальное решение, тут нарушается архитектурная составляющая подхода
    if (Array.isArray(filter.name) && filter.name.length > 1) {
      const scope = filter.name[0];

      return values[scope];
    }

    if (INTERNAL_scope) return values[INTERNAL_scope];

    return values;
  }, form);

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

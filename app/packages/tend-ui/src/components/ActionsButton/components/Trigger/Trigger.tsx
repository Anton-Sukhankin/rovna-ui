import React from 'react';
import { isUndefined } from '@rovna-ui/utils/isUndefined';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { ChevronDown } from '@rovna-ui/icons/ChevronDown';
import { ChevronUp } from '@rovna-ui/icons/ChevronUp';
import { Button } from '@rovna-ui/primitives';

import { useActionsButtonContext } from '@rovna-internal/components/components/ActionsButton/contexts';

import { TriggerProps } from './types';

const Trigger = ({ children, onClick, ...props }: TriggerProps) => {
  const t = useTranslation();
  const content = isUndefined(children)
    ? t(['components', 'ActionsButton', 'button'])
    : children;
  const { open, display } = useActionsButtonContext('ActionsButtonTrigger');

  return (
    <Button<'button'>
      variant='secondary'
      {...props}
      before={open ? <ChevronUp /> : <ChevronDown />}
      onClick={e => {
        display?.(!open);
        onClick?.(e);
      }}
    >
      {content}
    </Button>
  );
};

Trigger.displayName = 'ActionsButton.Trigger';

export { Trigger };

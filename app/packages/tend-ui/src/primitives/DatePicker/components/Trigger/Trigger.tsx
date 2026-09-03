import React from 'react';
import { isString } from 'lodash';

import { Button } from '@rovna-internal/components/primitives/Button';

import { useDatePickerContext, useDatePickerVisibilityContext } from '../../contexts';
import { TriggerProps } from './types';

const Trigger = ({
  component: Component,
  onClick,
  ...props
}: React.PropsWithChildren<TriggerProps>) => {
  const context = useDatePickerContext();
  const visibilityContext = useDatePickerVisibilityContext();
  const isInvalid = !!context?.['aria-invalid'];
  const __value = context?.value || context?._value;

  const handleClick = React.useCallback<NonNullable<TriggerProps['onClick']>>(
    (...parameters) => {
      visibilityContext?.setOpen?.(open => !open);
      onClick?.(...parameters);
    },
    [onClick, visibilityContext],
  );

  const value = React.useMemo(() => {
    if (!__value) return context?.placeholder;
    if (isString(context?.format)) return __value?.format(context.format);
  }, [context?.format, context?.placeholder, __value]);

  React.useEffect(() => {
    function onEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      visibilityContext?.setOpen?.(false);
    }

    window.addEventListener('keydown', onEscape);

    return () => {
      window.removeEventListener('keydown', onEscape);
    };
  }, [visibilityContext]);

  if (!Component)
    return (
      <Button
        data-testid='rovna-ui-date-picker-trigger'
        variant='link'
        preset={isInvalid ? 'danger' : undefined}
        {...props}
        fullWidth
        onClick={handleClick}
      >
        {value}
      </Button>
    );

  return <Component onClick={handleClick}>{value}</Component>;
};

Trigger.displayName = 'DatePicker.Trigger';

export { Trigger };

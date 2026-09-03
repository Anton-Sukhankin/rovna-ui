import React from 'react';
import dayjs from 'dayjs';

import { Select } from '@rovna-internal/components/primitives/Select';

import { TimeSelectProps } from './types';
import { useTimeOptions } from './hooks';

const TimeSelect = ({
  virtual = true,
  onChange,
  from,
  to,
  step,
  ...props
}: TimeSelectProps) => {
  const options = useTimeOptions({ from, to, step });
  const handleChange = React.useCallback(
    (value: string) => {
      const [hour = 0, minute = 0, second = 0] = value.split(':');
      const time = dayjs()
        .set('hour', Number(hour))
        .set('minute', Number(minute))
        .set('second', Number(second));

      onChange?.(time);
    },
    [onChange],
  );

  return (
    <Select<string>
      data-testid='rovna-ui-timeselect'
      aria-label={props['aria-label'] ?? 'Выбор времени'}
      virtual={virtual}
      options={options}
      {...props}
      onChange={handleChange}
    />
  );
};

TimeSelect.displayName = 'TimeSelect';

export { TimeSelect };

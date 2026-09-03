import React from 'react';
import { INTERNAL_RovnaUILogger as RovnaUILogger } from '@rovna-ui/utils';

import { ChipsOption, ChipsProps, ChipsRef } from './types';
import { Root } from './styled';
import { Chip } from './Chip';

/**
 * @deprecated Компонент устарел и больше не поддерживается
 * Используйте `Chips` из пакета `@rovna-ui/primitives`
 */
const Chips = React.forwardRef<ChipsRef, ChipsProps>(
  ({ value, options, onChange, ...props }, ref) => {
    if (process.env.NODE_ENV === 'development') {
      RovnaUILogger.warning([
        '<Chips /> из пакета "@rovna-ui/components" устарел и больше не поддерживается.',
        '',
        'Используйте <Chips /> из пакета "@rovna-ui/primitives"',
      ]);
    }

    const [_value, _setValue] = React.useState<ChipsOption[]>([]);
    React.useEffect(() => {
      if (!value) return;
      _setValue(value);
    }, [value]);

    const handleClick = React.useCallback(
      (payload: ChipsOption) => {
        _setValue(prev => {
          if (prev.includes(payload)) {
            const next = prev.filter(prevValue => prevValue !== payload);
            onChange?.(payload, next);

            return next;
          }

          const next = [...prev, payload];
          onChange?.(payload, next);

          return next;
        });
      },
      [onChange],
    );

    const _options = React.useMemo(() => {
      const checked = value || _value;

      return options.map(option => {
        if (typeof option === 'object')
          return {
            label: option.label,
            value: option.value,
            checked: checked.includes(option.value),
          };

        return {
          label: option,
          value: option,
          checked: checked.includes(option),
        };
      });
    }, [value, _value, options]);

    return (
      <Root data-testid='rovna-ui-chips' {...props} ref={ref}>
        {_options.map(option => (
          <Chip
            key={option.value}
            checked={option.checked}
            value={option.value}
            label={option.label}
            onClick={handleClick}
          />
        ))}
      </Root>
    );
  },
);

Chips.displayName = 'Chips';

export { Chips };

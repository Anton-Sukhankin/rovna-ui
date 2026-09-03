import React from 'react';
import { useControllableState } from '@rovna-ui/hooks/useControllableState';
import classnames from 'classnames';

import { ChipsOption, ChipsProps, ChipsRawOption, ChipsRef } from './types';
import { Root } from './styled';
import { Chip } from './Chip';
import { isLabeledChipsOption } from './utils';

const isChecked = (value: ChipsOption, checked: ChipsRawOption[]) => {
  return isLabeledChipsOption(value)
    ? checked.includes(value.value)
    : checked.includes(value);
};

const BaseChips = (
  {
    mode = 'multiple',
    value,
    options,
    onChange,
    defaultValue,
    className,
    ...props
  }: ChipsProps,
  ref: React.ForwardedRef<ChipsRef>,
) => {
  const [_value, _setValue] = useControllableState({
    value,
    defaultValue,
    onChange,
  });

  const checked = React.useMemo(
    () => (_value || []).map(v => (isLabeledChipsOption(v) ? v.value : v)),
    [_value],
  );

  const handleClick = React.useCallback(
    (payload: ChipsOption) => {
      _setValue(prev => {
        const _prev = prev || [];

        if (mode === 'multiple') {
          if (isLabeledChipsOption(payload)) {
            if (checked.includes(payload.value)) {
              const next = _prev.filter(prevValue => {
                const comparer = isLabeledChipsOption(prevValue)
                  ? prevValue.value
                  : prevValue;

                return comparer !== payload.value;
              });

              return next;
            }

            const next = [..._prev, payload];

            return next;
          } else {
            if (checked.includes(payload)) {
              const next = _prev.filter(prevValue => {
                const comparer = isLabeledChipsOption(prevValue)
                  ? prevValue.value
                  : prevValue;

                return comparer !== payload;
              });

              return next;
            }

            const next = [..._prev, payload];

            return next;
          }
        } else {
          return [payload];
        }
      });
    },
    [_setValue, checked, mode],
  );

  return (
    <Root
      data-testid='rovna-ui-chips'
      className={classnames('rovna-ui-chips-root', className)}
      {...props}
      ref={ref}
    >
      {options.map(option => (
        <Chip
          key={isLabeledChipsOption(option) ? option.value : option}
          checked={isChecked(option, checked)}
          option={option}
          onClick={handleClick}
        />
      ))}
    </Root>
  );
};

const Chips = React.forwardRef(BaseChips);

Chips.displayName = 'Chips';

export { Chips };

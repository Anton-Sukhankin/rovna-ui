import React from 'react';
import { Box } from '@rovna-ui/grid';
import {
  useCallbackRef,
  UNSTABLE_useControllableStateV2 as useControllableState,
} from '@rovna-ui/hooks';
import cn from 'classnames';

import {
  UNSTABLE_InputNumber as InputNumber,
  InputNumberProps,
  InputNumberValue,
} from '../InputNumber';
import { RangeInputProps } from './types';

const DEFAULT_VALUE: [InputNumberValue, InputNumberValue] = [null, null];

const RangeInput = ({
  size,
  rootClassName,
  disabled,
  onChange,
  placeholder,
  ariaLabels = ['Начало диапазона', 'Конец диапазона'],
  value,
  defaultValue,
  allowClear,
  before,
  after,
}: RangeInputProps) => {
  const [__value = DEFAULT_VALUE, __setValue] = useControllableState({
    value,
    defaultValue,
    onChange,
  });

  const handleFromChange = useCallbackRef<NonNullable<InputNumberProps['onChange']>>(
    payload => {
      const [, to] = __value;
      __setValue([payload, to]);
    },
  );

  const handleToChange = useCallbackRef<NonNullable<InputNumberProps['onChange']>>(
    payload => {
      const [from] = __value;
      __setValue([from, payload]);
    },
  );

  return (
    <Box
      $width='100%'
      data-testid='rovna-ui-range-input'
      $display='flex'
      $alignItems='center'
      $gap={10}
      className={cn(['rovna-ui-range-input-root', rootClassName])}
    >
      <InputNumber
        data-testid='rovna-ui-range-input-from'
        aria-label={ariaLabels[0]}
        value={__value[0]}
        disabled={disabled}
        placeholder={placeholder?.at(0)}
        onChange={handleFromChange}
        allowClear={allowClear}
        size={size}
        before={before?.at(0)}
        after={after?.at(0)}
      />
      <Box as='span' className='rovna-ui-range-input-separator'>
        —
      </Box>
      <InputNumber
        data-testid='rovna-ui-range-input-to'
        aria-label={ariaLabels[1]}
        value={__value[1]}
        disabled={disabled}
        placeholder={placeholder?.at(1)}
        onChange={handleToChange}
        allowClear={allowClear}
        size={size}
        before={before?.at(1)}
        after={after?.at(1)}
      />
    </Box>
  );
};

RangeInput.displayName = 'RangeInput';

export { RangeInput };

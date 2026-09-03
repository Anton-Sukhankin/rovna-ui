import React from 'react';
import { extractMarginProps } from '@rovna-ui/styling';
import { CalendarMonth } from '@rovna-ui/icons/CalendarMonth';
import { ArrowForward } from '@rovna-ui/icons/ArrowForward';

import { useSize } from '@rovna-internal/components/hooks/useSize';
import { useAllowClear } from '@rovna-internal/components/hooks/useAllowClear';
import { useTheme } from '@rovna-internal/components/theme/Theme';
import { useDatePickerLocale } from '@rovna-internal/components/hooks/useDatePickerLocale';

import { NextIcon, PrevIcon, Root } from './styled';
import { RangePickerProps, RangePickerRef } from './types';

const RangePicker = React.forwardRef<RangePickerRef, RangePickerProps>(
  (
    {
      allowClear = true,
      fullWidth = false,
      format = 'DD.MM.YYYY',
      clearIconTooltip,
      width = '256px',
      size = 'medium',
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const _size = useSize(size);
    const allowClearProp = useAllowClear({ allowClear, clearIconTooltip });
    const locale = useDatePickerLocale(props.locale);
    const { rest, ...margins } = extractMarginProps(props);
    const { 'aria-required': ariaRequired, ...rootProps } = rest;
    void ariaRequired;
    const height = React.useMemo(
      () => ({ large: '40px', medium: '32px', small: '24px' }[size]),
      [size],
    );

    return (
      <Root
        data-testid='rovna-ui-range-picker'
        role='group'
        {...rootProps}
        {...margins}
        ref={ref}
        $fullWidth={fullWidth}
        $width={width}
        $height={height}
        size={_size}
        suffixIcon={<CalendarMonth />}
        separator={
          <span aria-hidden='true'>
            <ArrowForward size={16} />
          </span>
        }
        nextIcon={<NextIcon color={theme.colors.blue600} />}
        superNextIcon={null}
        prevIcon={<PrevIcon color={theme.colors.blue600} />}
        superPrevIcon={null}
        format={format}
        allowClear={allowClearProp}
        locale={locale}
      />
    );
  },
);

RangePicker.displayName = 'RangePicker';

export { RangePicker };

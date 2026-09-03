import React from 'react';
import { Dayjs } from 'dayjs';
import { isUndefined } from '@rovna-ui/utils';
import { extractMarginProps } from '@rovna-ui/styling';
import { CalendarMonth } from '@rovna-ui/icons/CalendarMonth';

import { useSize } from '@rovna-internal/components/hooks/useSize';
import { useAllowClear } from '@rovna-internal/components/hooks/useAllowClear';
import { useTheme } from '@rovna-internal/components/theme/Theme';
import { useDatePickerLocale } from '@rovna-internal/components/hooks/useDatePickerLocale';

import { NextIcon, PrevIcon, Trigger } from './components';
import { DatePickerProps, DatePickerRef } from './types';
import { Root as _Root } from './styled';
import { DatePickerContext, DatePickerVisibilityContext } from './contexts';

export const createPicker = () => {
  const BaseDatePicker = React.forwardRef<DatePickerRef, DatePickerProps>(
    (
      {
        fullWidth = false,
        showToday = false,
        allowClear = true,
        open,
        format = 'DD.MM.YYYY',
        clearIconTooltip,
        width = '256px',
        onChange,
        onOpenChange,
        suffixIcon = <CalendarMonth />,
        size = 'medium',
        ...props
      },
      ref,
    ) => {
      const [_open, _setOpen] = React.useState<boolean>(open ?? false);
      const [_value, _setValue] = React.useState<Dayjs | null | undefined>(props.value);
      const __open = isUndefined(open) ? _open : open;

      const theme = useTheme();
      const _size = useSize(size);
      const allowClearProp = useAllowClear({ allowClear, clearIconTooltip });
      const locale = useDatePickerLocale(props.locale);

      const handleChange = React.useCallback<NonNullable<DatePickerProps['onChange']>>(
        (...parameters) => {
          onChange?.(...parameters);
          _setValue(parameters[0]);
        },
        [onChange],
      );
      const handleOpenChange = React.useCallback<
        NonNullable<DatePickerProps['onOpenChange']>
      >(
        open => {
          onOpenChange?.(open);
          _setOpen?.(open);
        },
        [onOpenChange],
      );

      const { rest, ...margins } = extractMarginProps(props);
      const height = { large: '40px', medium: '32px', small: '24px' }[size];

      return (
        <DatePickerVisibilityContext.Provider
          value={React.useMemo(() => ({ open: _open, setOpen: _setOpen }), [_open])}
        >
          <DatePickerContext.Provider
            value={React.useMemo(
              () => ({
                fullWidth,
                format,
                showToday,
                allowClear,
                clearIconTooltip,
                width,
                onChange,
                onOpenChange,
                ...rest,
                _value,
              }),
              [
                _value,
                allowClear,
                clearIconTooltip,
                format,
                fullWidth,
                onChange,
                onOpenChange,
                rest,
                showToday,
                width,
              ],
            )}
          >
            <_Root
              data-testid='rovna-ui-date-picker'
              {...rest}
              ref={ref}
              $fullWidth={fullWidth}
              $width={width}
              $height={height}
              {...margins}
              open={__open}
              size={_size}
              suffixIcon={suffixIcon}
              nextIcon={<NextIcon color={theme.colors.blue600} />}
              superNextIcon={null}
              prevIcon={<PrevIcon color={theme.colors.blue600} />}
              superPrevIcon={null}
              format={format}
              allowClear={allowClearProp}
              showToday={showToday}
              locale={locale}
              onChange={handleChange}
              onOpenChange={handleOpenChange}
            />
          </DatePickerContext.Provider>
        </DatePickerVisibilityContext.Provider>
      );
    },
  );

  return Object.assign(BaseDatePicker, {
    displayName: 'DatePicker',
    Trigger,
  });
};

export const DatePicker = createPicker();

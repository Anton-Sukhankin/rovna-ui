import React from 'react';
import { useControllableState } from '@rovna-ui/hooks';
import { useTheme } from '@rovna-ui/theme';
import cn from 'classnames';

import { Root } from './styled';
import { ToggleButtonProps, ToggleButtonRef } from './types';
import { Group } from './Group';
import { useToggleButtonGroupContext } from './context';
import styles from './ToggleButton.module.css';

const BaseToggleButton = (
  {
    onClick,
    selectable = true,
    selected,
    onSelectedChange,
    className,
    ...props
  }: ToggleButtonProps,
  ref: React.ForwardedRef<ToggleButtonRef>,
) => {
  const theme = useTheme();
  const context = useToggleButtonGroupContext();
  const [_selected, _setSelected] = useControllableState({
    value: selected,
    defaultValue: false,
    onChange: onSelectedChange,
  });
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (props.disabled === true) return;
      context?.onChange?.(e, e.currentTarget.value);
      onClick?.(e);
      if (!selectable) return;
      _setSelected(!_selected);
    },
    [_selected, _setSelected, context, onClick, props.disabled, selectable],
  );

  return (
    <Root
      data-testid='rovna-ui-toggle-button'
      aria-pressed={_selected}
      aria-disabled={props?.disabled}
      {...props}
      ref={ref}
      $selected={selectable ? _selected : false}
      theme={theme}
      onClick={handleClick}
      className={cn([styles['rovna-ui-toggle-button'], className], {
        [styles['rovna-ui-toggle-button-selected']]: selected,
        [styles['rovna-ui-toggle-button-disabled']]: props.disabled,
      })}
    />
  );
};

const ForwardedToggleButton = React.forwardRef<ToggleButtonRef, ToggleButtonProps>(
  BaseToggleButton,
);

export const ToggleButton = Object.assign(ForwardedToggleButton, {
  displayName: 'ToggleButton',
  Group,
});

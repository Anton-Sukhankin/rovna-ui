import React from 'react';
import { extractMarginProps } from '@rovna-ui/styling';
import merge from 'lodash/merge';
import { useTheme } from '@rovna-ui/theme';
import { INTERNAL_RovnaUILogger as RovnaUILogger } from '@rovna-ui/utils';
import cn from 'classnames';

import { Hidden, Root, Spinner, SpinnerContainer } from './styled';
import { ButtonComponent, ButtonProps, ButtonRef, ButtonStylingSchema } from './types';

// TODO: Нужно передать дефолтное состояние `type="button"` в следующем мажоре
// иначе, все кнопки по дефолту ведут себя как `type="submit"` и триггерят формы
// если кнопка вложена в нее
function BaseButton<E extends React.ElementType = 'button'>(
  {
    padding = true,
    loading = false,
    disabled = false,
    danger = false,
    skeleton = false,
    fullWidth = false,
    variant = 'primary',
    size = 'medium',
    preset = 'default',
    before,
    after,
    children,
    onClick,
    className,
    UNSTABLE_styling,
    ...props
  }: ButtonProps<E>,
  ref: ButtonRef<E>,
) {
  const theme = useTheme();
  const styling = React.useMemo<ButtonStylingSchema>(
    () =>
      merge(
        {
          buttonOnAccent: {
            primaryDefaultText: theme.colors.blue600,
            primaryHoverText: theme.colors.blue700,
            primaryPressedText: theme.colors.blue800,
            primaryFocusText: theme.colors.blue700,
            primaryDisabledText: theme.colors['white700-transparent'],

            ghostDefaultText: theme.colors.gray0,
            ghostHoverText: theme.colors.gray100,
            ghostPressedText: theme.colors.gray150,
            ghostFocusText: theme.colors.gray50,
            ghostDisabledText: theme.colors['white700-transparent'],
          },
        },
        UNSTABLE_styling,
      ),
    [UNSTABLE_styling, theme.colors],
  );

  const hasChildren = !!children;
  const hasLeftIcon = !!before;
  const hasRightIcon = !!after;
  const hasBothIcons = hasLeftIcon && hasRightIcon;
  const hasOnlyLeftIcon = hasLeftIcon && !hasChildren;
  const hasOnlyRightIcon = hasRightIcon && !hasChildren;
  const isIconOnly = hasOnlyLeftIcon || hasOnlyRightIcon;

  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';
  const isLink = variant === 'link';

  const isLarge = size === 'large';
  const isMedium = size === 'medium';
  const isSmall = size === 'small';

  const isDefault = preset === 'default';
  const isDanger = preset === 'danger' || danger === true;
  const isAccent = preset === 'accent';

  const as = props.as || 'button';

  if (process.env.NODE_ENV === 'development') {
    if (variant === 'secondary' && isDanger) {
      RovnaUILogger.warning([
        `<Button danger variant="${variant}" /> удален из дизайн системы.`,
        'и',
        '<Button variant="${variant}" preset="danger" />',
      ]);
    }
  }

  const shape = (() => {
    if (padding === false) return 'noPadding';
    if (isIconOnly) return 'iconOnly';
    if (hasBothIcons) return 'default';
    if (hasLeftIcon) return 'iconLeft';
    if (hasRightIcon) return 'iconRight';

    return 'default';
  })();

  const content = React.useMemo(() => {
    if (skeleton)
      return (
        <Hidden>
          {before}
          {children}
          {after}
        </Hidden>
      );

    if (loading)
      return (
        <SpinnerContainer>
          <Spinner size='xs' />
          <Hidden>
            {before}
            {children}
            {after}
          </Hidden>
        </SpinnerContainer>
      );

    return (
      <>
        {before}
        {children}
        {after}
      </>
    );
  }, [skeleton, before, children, after, loading]);

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (loading || disabled) {
        e.preventDefault();

        return;
      }
      onClick?.(e);
    },
    [disabled, loading, onClick],
  );

  const { rest, ...margins } = extractMarginProps(props);

  return (
    <Root
      data-testid='rovna-ui-button'
      {...rest}
      {...margins}
      ref={ref}
      theme={theme}
      $skeleton={skeleton}
      $danger={danger}
      $disabled={disabled}
      $variant={variant}
      $size={size}
      $preset={preset}
      $tag={as}
      $fullWidth={fullWidth}
      $shape={shape}
      $styling={styling}
      as={as}
      disabled={disabled}
      onClick={handleClick}
      className={cn(['rovna-ui-button', className], {
        ['rovna-ui-button-has-before']: !!before,
        ['rovna-ui-button-has-after']: !!after,

        'rovna-ui-button-icon-only': isIconOnly,

        ['rovna-ui-button-disabled']: disabled,
        ['rovna-ui-button-loading']: loading,
        ['rovna-ui-button-skeleton']: skeleton,

        ['rovna-ui-button-variant-primary']: isPrimary,
        ['rovna-ui-button-variant-secondary']: isSecondary,
        ['rovna-ui-button-variant-ghost']: isGhost,
        ['rovna-ui-button-variant-link']: isLink,

        ['rovna-ui-button-preset-default']: isDefault,
        ['rovna-ui-button-preset-danger']: isDanger,
        ['rovna-ui-button-preset-accent']: isAccent,

        ['rovna-ui-button-size-large']: isLarge,
        ['rovna-ui-button-size-medium']: isMedium,
        ['rovna-ui-button-size-small']: isSmall,
      })}
    >
      {content}
    </Root>
  );
}

const Button = React.forwardRef(BaseButton) as ButtonComponent;

Button.displayName = 'Button';

export { Button };

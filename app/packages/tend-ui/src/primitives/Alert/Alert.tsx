import React from 'react';
import { extractMarginProps } from '@rovna-ui/styling';
import { isUndefined } from '@rovna-ui/utils/isUndefined';
import { useTranslation } from '@rovna-ui/locale';
import { Close } from '@rovna-ui/icons/Close';
import { Sync } from '@rovna-ui/icons/Sync';
import { Cancel } from '@rovna-ui/icons/Cancel';
import { DoneCircle } from '@rovna-ui/icons/DoneCircle';
import { Error } from '@rovna-ui/icons/Error';
import { Info } from '@rovna-ui/icons/Info';
import { INTERNAL_RovnaUILogger as RovnaUILogger } from '@rovna-ui/utils';
import { Paragraph, Title } from '@rovna-ui/typography';
import { useTheme } from '@rovna-ui/theme';
import { Box } from '@rovna-ui/grid';
import { Tooltip, TooltipProps } from '@rovna-ui/primitives';

import { AlertProps, AlertRef } from './types';
import { Action, CloseButton, Root } from './styled';

const BaseAlert = (
  {
    border = false,
    showIcon = true,
    closable = false,
    type = 'info',
    message,
    description,
    onClose,
    closeIcon,
    icon,
    footer,
    closeIconTooltip,
    action,
    ...props
  }: AlertProps,
  ref: React.ForwardedRef<AlertRef>,
) => {
  const t = useTranslation();
  const theme = useTheme();
  const [visible, setVisible] = React.useState(true);
  const { rest, ...margins } = extractMarginProps(props);

  if (process.env.NODE_ENV === 'development') {
    if (type === 'neutral' || type === 'loading') {
      RovnaUILogger.warning([
        `<Alert type="${type}" /> удален из Figma и будет удален в следующем мажоре.`,
      ]);
    }
    if (border) {
      RovnaUILogger.warning([
        `<Alert border={true} /> удален из Figma и будет удален следующем мажоре.`,
      ]);
    }
  }

  const handleCloseClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setVisible(false);
      onClose?.(e);
    },
    [onClose],
  );

  const iconNode = React.useMemo(() => {
    if (isUndefined(icon))
      return {
        success: <DoneCircle color='green500' size={20} />,
        error: <Cancel color='red600' size={20} />,
        warning: <Error color='gold600' size={20} />,
        info: <Info size={20} color='blue600' />,
        /**
         * @deprecated Устарело начиная с `4.11.0`
         */
        neutral: <Info size={20} color='gray400' />,
        /**
         * @deprecated Устарело начиная с `4.11.0`
         */
        loading: <Sync size={20} color='gray400' />,
      }[type];

    return icon;
  }, [icon, type]);

  const closeIconNode = React.useMemo(() => {
    if (typeof closeIcon === 'undefined') return <Close size={20} />;

    return closeIcon;
  }, [closeIcon]);

  const footerNode = React.useMemo(() => {
    if (isUndefined(footer)) return null;

    if (Array.isArray(footer))
      return (
        <Box $display='flex' $gap={8} $margin='12px 0 0'>
          {footer.map(node => node)}
        </Box>
      );

    return <Box $margin='12px 0 0'>{footer}</Box>;
  }, [footer]);

  const tooltipProps = React.useMemo<TooltipProps>(() => {
    if (!closeIconTooltip) return { title: t(['general', 'close']) };

    return closeIconTooltip;
  }, [closeIconTooltip, t]);

  const contentNode = React.useMemo(() => {
    if (message && description) {
      return (
        <>
          <Title margin='0' level='h6'>
            {message}
          </Title>
          <Paragraph margin='0'>{description}</Paragraph>
        </>
      );
    }

    return <Paragraph margin='0'>{message || description}</Paragraph>;
  }, [description, message]);

  if (!visible) return null;

  return (
    <Root
      data-testid='rovna-ui-alert'
      {...rest}
      {...margins}
      ref={ref}
      theme={theme}
      role={rest.role ?? (type === 'error' ? 'alert' : type === 'loading' ? 'status' : undefined)}
      $type={type}
      $border={border}
      className='rovna-ui-alert-root'
    >
      {showIcon && (
        <Box $display='flex' $padding='2px' className='rovna-ui-alert-icon'>
          {iconNode}
        </Box>
      )}
      <Box $flex={1} className='rovna-ui-alert-content'>
        {contentNode}
        {footerNode}
      </Box>
      {action && (
        <Action className='rovna-ui-alert-action' theme={theme}>
          {action}
        </Action>
      )}
      {closable && (
        <Tooltip {...tooltipProps}>
          <CloseButton
            theme={theme}
            className='rovna-ui-alert-close-button'
            aria-label='Закрыть уведомление'
            onClick={handleCloseClick}
          >
            {closeIconNode}
          </CloseButton>
        </Tooltip>
      )}
    </Root>
  );
};

const Alert = React.forwardRef<AlertRef, AlertProps>(BaseAlert);

Alert.displayName = 'Alert';

export { Alert };

import React from 'react';
import { useTranslation } from '@rovna-ui/locale';
import { isUndefined } from '@rovna-ui/utils';
import { Close } from '@rovna-ui/icons/Close';

import { useTheme } from '@rovna-internal/components/theme/Theme';
import { Button } from '@rovna-internal/components/primitives/Button';
import { Box } from '@rovna-internal/components/grid/Box';
import { Tooltip, TooltipProps } from '@rovna-internal/components/primitives/Tooltip';

import { ModalProps } from './types';
import { Root } from './styled';
import { ScrollPosition } from './components';

const Modal = ({
  footer,
  okButtonProps,
  cancelButtonProps,
  okText = 'Принять',
  cancelText = 'Отмена',
  scroll = 'body',
  size = 'medium',
  confirmLoading,
  closeIconTooltip,
  title,
  children,
  centered,
  style,
  bodyStyle,
  width,
  styles,
  ...props
}: ModalProps) => {
  const t = useTranslation();
  const theme = useTheme();

  const [headerCSS, setHeaderCSS] = React.useState<React.CSSProperties>();
  const [footerCSS, setFooterCSS] = React.useState<React.CSSProperties>();

  const isWindowScroll = scroll === 'window';

  const _style = React.useMemo<React.CSSProperties | undefined>(() => {
    if (centered) return style;
    if (isWindowScroll) return { top: 100, ...style };
    const value = style?.top || 100;
    const top = typeof value === 'string' ? value : `${value}px`;

    return { ...style, top, height: `calc(100vh - ${top})` };
  }, [centered, isWindowScroll, style]);

  const _bodyStyle = React.useMemo<React.CSSProperties | undefined>(() => {
    if (centered) return bodyStyle;
    if (isWindowScroll) return bodyStyle;

    return { ...bodyStyle, overflowY: 'auto' };
  }, [bodyStyle, centered, isWindowScroll]);

  const _width = React.useMemo(() => {
    if (width) return width;

    return {
      large: 960,
      medium: 720,
      small: 460,
    }[size];
  }, [size, width]);

  const _styles = React.useMemo(
    () => ({
      ...styles,
      body: { ...styles?.body, ..._bodyStyle },
      header: { ...styles?.header, ...headerCSS },
      footer: { ...styles?.footer, ...footerCSS, margin: 0 },
    }),
    [_bodyStyle, footerCSS, headerCSS, styles],
  );

  const noFooter = footer === null;

  const _title = React.useMemo(() => {
    if (!title) return title;
    if (Array.isArray(title))
      return (
        <Box $display='flex' $flexDirection='column' $alignItems='flex-start' $gap={8}>
          {title.map(node => node)}
        </Box>
      );

    return title;
  }, [title]);

  const _footer = React.useMemo(() => {
    if (isUndefined(footer)) {
      return (
        <Box $display='inline-flex' $alignItems='center' $gap={12}>
          <Button
            data-testid='rovna-ui-modal-cancel-button'
            variant='secondary'
            {...cancelButtonProps}
            onClick={cancelButtonProps?.onClick ?? props.onCancel}
          >
            {cancelButtonProps?.children || cancelText}
          </Button>
          <Button
            data-testid='rovna-ui-modal-ok-button'
            loading={confirmLoading}
            {...okButtonProps}
            onClick={okButtonProps?.onClick ?? props.onOk}
          >
            {okButtonProps?.children || okText}
          </Button>
        </Box>
      );
    }

    if (Array.isArray(footer))
      return (
        <Box $display='inline-flex' $alignItems='center' $gap={12}>
          {footer.map(node => node)}
        </Box>
      );

    return footer;
  }, [
    cancelButtonProps,
    cancelText,
    confirmLoading,
    footer,
    okButtonProps,
    okText,
    props.onCancel,
    props.onOk,
  ]);

  const tooltipProps = React.useMemo<TooltipProps>(() => {
    if (!closeIconTooltip) return { title: t(['general', 'close']) };

    return closeIconTooltip;
  }, [closeIconTooltip, t]);

  return (
    <Root
      data-testid='rovna-ui-modal'
      {...props}
      $theme={theme}
      $noFooter={noFooter}
      $scroll={scroll}
      centered={centered}
      title={_title}
      footer={_footer}
      width={_width}
      style={_style}
      styles={_styles}
      closeIcon={
        <Tooltip {...tooltipProps}>
          <Close />
        </Tooltip>
      }
    >
      <ScrollPosition
        onScrollPositionChange={React.useCallback(position => {
          switch (position) {
            case 'top':
              setHeaderCSS({});
              setFooterCSS({
                boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.08)',
              });
              break;
            case 'middle':
              setHeaderCSS({
                boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.08)',
              });
              setFooterCSS({
                boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.08)',
              });
              break;
            case 'bottom':
              setHeaderCSS({
                boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.08)',
              });
              setFooterCSS({});
              break;

            default:
              break;
          }
        }, [])}
      >
        {children}
      </ScrollPosition>
    </Root>
  );
};

Modal.displayName = 'Modal';

export { Modal };

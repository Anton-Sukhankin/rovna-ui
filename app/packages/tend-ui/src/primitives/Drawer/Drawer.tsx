import React from 'react';
import { useTranslation } from '@rovna-ui/locale';
import { Close } from '@rovna-ui/icons/Close';
import { Text, Title } from '@rovna-ui/typography';
import { Button, Tooltip } from '@rovna-ui/primitives';
import { Box } from '@rovna-ui/grid/Box';
import { useTheme } from '@rovna-ui/theme';
import { INTERNAL_RovnaUILogger as RovnaUILogger } from '@rovna-ui/utils';

import { DrawerProps } from './types';
import { Root } from './styled';
import { useSize } from './hooks';
import { ScrollPosition } from './components';

const FULLSCREEN_OFFSET = '16px';

const CloseIcon = () => {
  const t = useTranslation();

  return (
    <Tooltip title={t(['general', 'close'])}>
      <Close color='gray650' size={20} />
    </Tooltip>
  );
};

/**
 * @deprecated Компонент устарел. Используйте `Drawer` из пакета `@rovna-ui/primitives`
 */
const Drawer = ({
  fullscreen = false,
  above,
  before,
  title,
  description,
  size = 'medium',
  placement = 'right',
  okButtonProps,
  onOk,
  okText = 'Принять',
  cancelButtonProps,
  onCancel,
  cancelText = 'Отмена',
  footer,
  closeIcon = <CloseIcon />,
  children,
  width,
  height,
  styles,
  ...props
}: DrawerProps) => {
  if (process.env.NODE_ENV === 'development') {
    RovnaUILogger.warning([
      '<Drawer /> из пакета "@rovna-ui/components" устарел и больше не поддерживается.',
      '',
      'Используйте <Drawer /> из пакета "@rovna-ui/primitives"',
    ]);

    if (size === 'default') {
      RovnaUILogger.warning([
        `<Drawer size="${size}" /> устарел.`,
        'Используйте <Drawer size="medium" />',
      ]);
    }
  }

  const theme = useTheme();
  const accessibleName =
    props['aria-label'] ??
    (typeof title === 'string' ? title : undefined) ??
    'Боковая панель';
  const _size = useSize(size);
  const isTop = placement === 'top';
  const isBottom = placement === 'bottom';
  const isLeft = placement === 'left';
  const isRight = placement === 'right';
  const isVertical = isTop || isBottom;
  const isHorizontal = isLeft || isRight;

  const _title = React.useMemo(() => {
    if ([!title, !description, !before, !above].every(Boolean)) return;

    if (above)
      return (
        <Box>
          {above}
          <Box $display='flex' $gap={12}>
            {before && <Box>{before}</Box>}
            <Box $display='flex' $flexDirection='column'>
              {title && (
                <Title margin='0' level='h5'>
                  {title}
                </Title>
              )}
              {description && (
                <Text color='gray650' fontWeight='400' size='small'>
                  {description}
                </Text>
              )}
            </Box>
          </Box>
        </Box>
      );

    return (
      <Box $display='flex' $gap={12}>
        {before && <Box>{before}</Box>}
        {(title || description) && (
          <Box $display='flex' $flexDirection='column'>
            {title && (
              <Title margin='0' level='h5'>
                {title}
              </Title>
            )}
            {description && (
              <Text color='gray650' fontWeight='400' size='small'>
                {description}
              </Text>
            )}
          </Box>
        )}
      </Box>
    );
  }, [above, before, description, title]);

  const _footer = React.useMemo(() => {
    if (typeof footer === 'undefined') {
      return (
        <Box
          $width='100%'
          $display='inline-flex'
          $alignItems='center'
          $justifyContent='flex-end'
          $gap={8}
        >
          <Button
            data-testid='rovna-ui-drawer-cancel-button'
            variant='secondary'
            {...cancelButtonProps}
            onClick={cancelButtonProps?.onClick ?? onCancel}
          >
            {cancelButtonProps?.children || cancelText}
          </Button>
          <Button
            data-testid='rovna-ui-drawer-ok-button'
            {...okButtonProps}
            onClick={okButtonProps?.onClick ?? onOk}
          >
            {okButtonProps?.children || okText}
          </Button>
        </Box>
      );
    }

    return footer;
  }, [cancelButtonProps, cancelText, footer, okButtonProps, okText, onCancel, onOk]);

  const contentWrapperStyle = React.useMemo(
    () =>
      ({
        top: {
          ...props.contentWrapperStyle,
          overflow: 'hidden',
        },
        right: {
          ...props.contentWrapperStyle,
          overflow: 'hidden',
        },
        bottom: {
          ...props.contentWrapperStyle,
          overflow: 'hidden',
        },
        left: {
          ...props.contentWrapperStyle,
          overflow: 'hidden',
        },
      }[placement]),
    [placement, props.contentWrapperStyle],
  );

  const _width = (() => {
    if (fullscreen && isHorizontal) return `calc(100% - ${FULLSCREEN_OFFSET})`;
    if (width) return width;

    return {
      default: '500px',
      small: '400px',
      medium: '500px',
      large: '800px',
    }[size];
  })();

  const _height = (() => {
    if (fullscreen && isVertical) return `calc(100% - ${FULLSCREEN_OFFSET})`;

    return height;
  })();

  const _styles = React.useMemo(
    () => ({
      ...styles,
      header: { ...styles?.header, borderBottom: 'none' },
      body: { ...styles?.body, padding: '0 24px' },
      footer: { ...styles?.footer, borderTop: 'none', padding: '16px 24px' },
    }),
    [styles],
  );

  const [className, setClassName] = React.useState('');

  React.useLayoutEffect(() => {
    const syncAccessibleNames = () => {
      document
        .querySelectorAll<HTMLElement>('[data-rovna-ui-drawer-label]')
        .forEach(wrapper => {
          const label = wrapper.dataset.rovnaUiDrawerLabel;
          const dialog = wrapper.querySelector<HTMLElement>('[role="dialog"]');
          if (label && dialog) dialog.setAttribute('aria-label', label);
        });
    };
    const observer = new MutationObserver(syncAccessibleNames);
    observer.observe(document.body, { childList: true, subtree: true });
    syncAccessibleNames();

    return () => observer.disconnect();
  }, [accessibleName]);

  return (
    <Root
      data-testid='rovna-ui-drawer'
      {...props}
      data-rovna-ui-drawer-label={accessibleName}
      $theme={theme}
      styles={_styles}
      contentWrapperStyle={contentWrapperStyle}
      title={_title}
      footer={_footer}
      placement={placement}
      width={_width}
      height={_height}
      size={_size}
      closeIcon={closeIcon}
      classNames={{ content: className }}
    >
      <ScrollPosition
        onScrollPositionChange={React.useCallback(position => {
          switch (position) {
            case 'top':
              setClassName('rovna-ui-drawer-footer-shadow');
              break;

            case 'middle':
              setClassName(
                ['rovna-ui-drawer-header-shadow', 'rovna-ui-drawer-footer-shadow'].join(
                  ' ',
                ),
              );
              break;

            case 'bottom':
              setClassName('rovna-ui-drawer-header-shadow');
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

Drawer.displayName = 'Drawer';

export { Drawer };

import React from 'react';
import RcDrawer, { DrawerProps as RcDrawerProps } from 'rc-drawer';
import { ConfigContext } from 'antd-core/es/config-provider';
import useStyle from 'antd-core/es/drawer/style';
import { getTransitionName } from 'antd-core/es/_util/motion';
import { useColor } from '@rovna-ui/theme';

import { DrawerContext } from '../../contexts/DrawerContext';
import { RootProps } from './types';

const FULLSCREEN_OFFSET = '0px';

const Root = ({
  open,
  maskClosable,
  mask,
  fullscreen,
  size = 'medium',
  placement = 'right',
  onClose,
  children,
  destroyOnClose,
  backgroundColor,
  push,
  afterOpenChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: React.PropsWithChildren<RootProps>) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('drawer');
  const [, hashId] = useStyle(prefixCls);
  const previouslyFocusedElementRef = React.useRef<HTMLElement | null>(null);
  const wasOpenRef = React.useRef(false);

  // Capture before the drawer commit moves focus into its portal.
  if (open && !wasOpenRef.current) {
    previouslyFocusedElementRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
  }
  wasOpenRef.current = Boolean(open);

  const restoreFocus = React.useCallback(() => {
    if (previouslyFocusedElementRef.current?.isConnected) {
      previouslyFocusedElementRef.current.focus();
      previouslyFocusedElementRef.current = null;
    }
  }, []);

  React.useEffect(() => {
    if (open || !previouslyFocusedElementRef.current) return;

    const frame = window.requestAnimationFrame(restoreFocus);

    return () => window.cancelAnimationFrame(frame);
  }, [open, restoreFocus]);

  const handleAfterOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      afterOpenChange?.(nextOpen);

      if (!nextOpen) restoreFocus();
    },
    [afterOpenChange, restoreFocus],
  );
  const setPanelRef = React.useCallback((panel: HTMLDivElement | null) => {
    if (!panel) return;

    if (ariaLabel) panel.setAttribute('aria-label', ariaLabel);
    else panel.removeAttribute('aria-label');

    if (ariaLabelledBy) panel.setAttribute('aria-labelledby', ariaLabelledBy);
    else panel.removeAttribute('aria-labelledby');
  }, [ariaLabel, ariaLabelledBy]);

  // FIXME: Исправить литеральные типы
  const _backgroundColor = useColor(backgroundColor as string);
  const fullscreenOffset = (() => {
    if (typeof fullscreen === 'object') return fullscreen?.offset ?? FULLSCREEN_OFFSET;

    return FULLSCREEN_OFFSET;
  })();

  const isTop = placement === 'top';
  const isBottom = placement === 'bottom';
  const isLeft = placement === 'left';
  const isRight = placement === 'right';
  const isVertical = isTop || isBottom;
  const isHorizontal = isLeft || isRight;

  const maskMotion: RcDrawerProps['motion'] = React.useMemo(
    () => ({
      motionName: getTransitionName(prefixCls, 'mask-motion'),
      motionAppear: true,
      motionEnter: true,
      motionLeave: true,
      motionDeadline: 500,
    }),
    [prefixCls],
  );

  const panelMotion = React.useCallback(
    motionPlacement => ({
      motionName: getTransitionName(prefixCls, `panel-motion-${motionPlacement}`),
      motionAppear: true,
      motionEnter: true,
      motionLeave: true,
      motionDeadline: 500,
    }),
    [prefixCls],
  );

  const width = React.useMemo(() => {
    if (fullscreen && isHorizontal) return `calc(100% - ${fullscreenOffset})`;

    return {
      small: '400px',
      medium: '500px',
      large: '800px',
    }[size];
  }, [fullscreen, fullscreenOffset, isHorizontal, size]);

  const height = React.useMemo(() => {
    if (fullscreen && isVertical) return `calc(100% - ${fullscreenOffset})`;

    return;
  }, [fullscreen, fullscreenOffset, isVertical]);

  return (
    <RcDrawer
      push={push}
      open={open}
      mask={mask}
      maskClosable={maskClosable}
      onClose={onClose}
      prefixCls={prefixCls}
      rootClassName={hashId}
      maskMotion={maskMotion}
      motion={panelMotion}
      width={width}
      height={height}
      placement={placement}
      destroyOnClose={destroyOnClose}
      afterOpenChange={handleAfterOpenChange}
      panelRef={setPanelRef}
      styles={React.useMemo(
        () => ({
          content: {
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '100vh',
            backgroundColor: _backgroundColor,
          },
        }),
        [_backgroundColor],
      )}
      {...props}
    >
      <DrawerContext.Provider value={React.useMemo(() => ({ onClose }), [onClose])}>
        {children}
      </DrawerContext.Provider>
    </RcDrawer>
  );
};

Root.displayName = 'Drawer.Root';

export { Root };

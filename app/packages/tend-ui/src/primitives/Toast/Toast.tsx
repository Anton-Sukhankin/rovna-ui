import React from 'react';
import notification from 'antd-core/es/notification';
import {
  GlobalConfigProps,
  NotificationConfig,
  NotificationInstance,
} from 'antd-core/es/notification/interface';
import { useTranslation } from '@rovna-ui/locale';
import { Sync } from '@rovna-ui/icons/Sync';
import { Cancel } from '@rovna-ui/icons/Cancel';
import { DoneCircle } from '@rovna-ui/icons/DoneCircle';
import { Error } from '@rovna-ui/icons/Error';
import { Info } from '@rovna-ui/icons/Info';
import { Close } from '@rovna-ui/icons/Close';

import { Tooltip } from '@rovna-internal/components/primitives/Tooltip';

import { Footer, Styles } from './styled';
import { ToastConfig } from './types';

function composeDescription(config: ToastConfig) {
  if (!config.footer) return config.description;

  return (
    <>
      {config.description}
      <Footer>{config.footer.map(node => node)}</Footer>
    </>
  );
}

const CloseIcon = () => {
  const t = useTranslation();

  return (
    <Tooltip title={t(['general', 'close'])} zIndex={3000}>
      <Close size={20} />
    </Tooltip>
  );
};

function methodsFactory<
  T extends NotificationInstance & { config?: (config: GlobalConfigProps) => void },
>(executor: T) {
  return {
    init: () => {
      // Header 80px + margin 8px = 88
      executor.config?.({ top: 88, placement: 'topRight', duration: 5 });
    },
    success: (config: ToastConfig) => {
      executor.success({
        icon: <DoneCircle color='green500' />,
        closeIcon: <CloseIcon />,
        ...config,
        description: composeDescription(config),
      });
    },
    error: (config: ToastConfig) => {
      executor.error({
        icon: <Cancel color='red600' />,
        closeIcon: <CloseIcon />,
        ...config,
        description: composeDescription(config),
      });
    },
    warning: (config: ToastConfig) => {
      executor.warning({
        icon: <Error color='gold600' />,
        closeIcon: <CloseIcon />,
        ...config,
        description: composeDescription(config),
      });
    },
    info: (config: ToastConfig) => {
      executor.info({
        icon: <Info color='blue600' />,
        closeIcon: <CloseIcon />,
        ...config,
        description: composeDescription(config),
      });
    },
    neutral: (config: ToastConfig) => {
      executor.info({
        icon: <DoneCircle color='gray500' />,
        closeIcon: <CloseIcon />,
        ...config,
        description: composeDescription(config),
        className: ['rovna-ui-notification-notice-neutral', config.className]
          .filter(Boolean)
          .join(' '),
      });
    },
    loading: (config: ToastConfig) => {
      executor.open({
        icon: <Sync color='blue600' />,
        closeIcon: <CloseIcon />,
        ...config,
        description: composeDescription(config),
        className: ['rovna-ui-notification-notice-loading', config.className]
          .filter(Boolean)
          .join(' '),
      });
    },
  };
}
const useToast = (config?: NotificationConfig) => {
  const [methods, holder] = notification.useNotification({
    // Header 80px + margin 8px = 88
    top: 88,
    placement: 'topRight',
    ...config,
  });

  const api = React.useMemo(
    () => ({ ...methods, ...methodsFactory(methods) }),
    [methods],
  );

  return [api, holder] as const;
};
export const Toast = Object.assign(
  {
    Styles,
    useToast,
    config: notification.config,
    destroy: notification.destroy,
  },
  methodsFactory(notification),
);

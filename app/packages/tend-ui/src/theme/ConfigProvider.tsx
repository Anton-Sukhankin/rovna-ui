import React from 'react';
import AntConfigProvider from 'antd-core/es/config-provider';
import { useLocale } from '@rovna-ui/locale';

import { useTheme } from './Theme';
import { createAntdTheme } from './utils';

export const ConfigProvider: React.FC = ({ children }) => {
  const theme = useTheme();
  const locale = useLocale();

  return (
    <AntConfigProvider prefixCls='rovna-ui' locale={locale} theme={createAntdTheme(theme)}>
      {children}
    </AntConfigProvider>
  );
};

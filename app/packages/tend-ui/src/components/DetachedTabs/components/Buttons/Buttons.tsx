import React from 'react';
import { omit } from 'lodash';

import { useTabsContext } from '@rovna-internal/components/components/DetachedTabs/contexts';

import { Root } from './styled';

/**
 * @deprecated Компонент устарел. Если вам необходимо использовать `Tabs` в `Drawer`
 * используйте `Drawer` из пакета `@rovna-ui/primitives`
 */
const Buttons = () => {
  const { items, ...props } = useTabsContext('Tabs.Buttons');

  return (
    <Root
      {...props}
      items={React.useMemo(() => items.map(item => omit(item, 'children')), [items])}
    />
  );
};

Buttons.displayName = 'DetachedTabs.Buttons';

export { Buttons };

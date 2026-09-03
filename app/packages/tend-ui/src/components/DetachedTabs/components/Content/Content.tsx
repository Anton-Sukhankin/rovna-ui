import React from 'react';

import { useTabsContext } from '@rovna-internal/components/components/DetachedTabs/contexts';

/**
 * @deprecated Компонент устарел. Если вам необходимо использовать `Tabs` в `Drawer`
 * используйте `Drawer` из пакета `@rovna-ui/primitives`
 */
const Content = () => {
  const { items, activeKey } = useTabsContext('Tabs.Content');

  const [child] = React.useMemo(
    () => items.filter(item => item.key === activeKey),
    [activeKey, items],
  );

  return <>{child.children}</>;
};

Content.displayName = 'DetachedTabs.Content';

export { Content };

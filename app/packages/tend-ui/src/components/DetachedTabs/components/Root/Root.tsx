import React from 'react';

import { TabsContext } from '@rovna-internal/components/components/DetachedTabs/contexts';

import { RootProps } from './types';

/**
 * @deprecated Компонент устарел. Если вам необходимо использовать `Tabs` в `Drawer`
 * используйте `Drawer` из пакета `@rovna-ui/primitives`
 */
const Root: React.FC<RootProps> = ({
  children,
  defaultActiveKey,
  onChange,
  ...props
}) => {
  const [item] = props.items;
  const initial = defaultActiveKey ?? item?.key ?? '';
  const [activeKey, setActiveKey] = React.useState(initial);

  const handleChange = React.useCallback(
    (key: string) => {
      setActiveKey(key);
      onChange?.(key);
    },
    [onChange],
  );

  return (
    <TabsContext
      value={React.useMemo(
        () => ({
          ...props,
          onChange: handleChange,
          activeKey,
        }),
        [activeKey, handleChange, props],
      )}
    >
      {children}
    </TabsContext>
  );
};

Root.displayName = 'DetachedTabs.Root';

export { Root };

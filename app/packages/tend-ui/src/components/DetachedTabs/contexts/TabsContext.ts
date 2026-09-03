import { TabsProps } from '@rovna-internal/components/primitives/Tabs';
import { contextFactory } from '@rovna-internal/components/factories';

type TabsContextType = Omit<TabsProps, 'items'> & {
  items: NonNullable<TabsProps['items']>;
};

export const [TabsContext, useTabsContext] = contextFactory<TabsContextType>();

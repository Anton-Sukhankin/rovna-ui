import { TabsProps } from '@rovna-internal/components/primitives/Tabs';

export type RootProps = Omit<TabsProps, 'items'> & {
  items: NonNullable<TabsProps['items']>;
};

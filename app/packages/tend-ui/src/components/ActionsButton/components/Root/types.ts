import { DropdownProps } from '@rovna-internal/components/primitives/Dropdown';

type Items = NonNullable<DropdownProps['menu']>['items'];

export type RootProps = DropdownProps & {
  items?: Items;
};

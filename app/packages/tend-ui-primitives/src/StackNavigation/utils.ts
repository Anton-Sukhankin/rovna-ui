import {
  StackNavigationDividerItemType,
  StackNavigationGroupItemType,
  StackNavigationItem,
  StackNavigationItemType,
  StackNavigationSubItemType,
} from './types';

export const isSubStackNavigationItemType = (
  item: StackNavigationItem,
): item is StackNavigationSubItemType => {
  return 'children' in item;
};
export const isGroupStackNavigationItemType = (
  item: StackNavigationItem,
): item is StackNavigationGroupItemType => {
  return 'type' in item;
};
export const isDividerStackNavigationItemType = (
  item: StackNavigationItem,
): item is StackNavigationDividerItemType => {
  return 'type' in item && item.type === 'divider';
};
export const isStackNavigationItemType = (
  item: StackNavigationItem,
): item is StackNavigationItemType => {
  return (
    !isSubStackNavigationItemType(item) &&
    !isGroupStackNavigationItemType(item) &&
    !isDividerStackNavigationItemType(item)
  );
};

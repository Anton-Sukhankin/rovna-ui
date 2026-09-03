import { NavigationItem } from '../types';

export type NavigationStylingSchema = {
  tabDefaultBg?: string;
  tabActiveBg?: string;
  tabHoverBg?: string;
  tabPressedBg?: string;
  tabActiveHoverBg?: string;
  tabActivePressedBg?: string;

  tabDefaultIcon?: string;
  tabHoverIcon?: string;

  defaultText?: string;
  hoverText?: string;
  pressedText?: string;
  activeText?: string;
  activeHoverText?: string;
  activePressedText?: string;
};

export type NavigationProps = {
  items: NavigationItem[];
  styling?: NavigationStylingSchema;
  defaultSelectedKeys?: string[];
  selectedKeys?: string[];
  onSelect?: (path: string[]) => void;
};

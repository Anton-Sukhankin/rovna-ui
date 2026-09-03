import { colors } from '@rovna-ui/tokens/samolet';

import { themeFactory } from './utils';
import { createAccessibleColors } from './accessibleColors';

const accessibleColors = createAccessibleColors(colors, 'samolet');

export const SamoletTheme = themeFactory(accessibleColors, {
  Button: {
    dangerDefaultBg: accessibleColors.red600,
    dangerGhostDefaultBg: accessibleColors.red100,
    dangerGhostDefaultText: accessibleColors.red600,
    dangerGhostHoverBg: accessibleColors.red50,
    dangerGhostHoverText: accessibleColors.red500,
    dangerGhostPressedBg: accessibleColors.red300,
    dangerGhostPressedText: accessibleColors.red700,
    dangerHoverBg: accessibleColors.red500,
    dangerPressedBg: accessibleColors.red700,
    dangerSecondaryDefaultBg: accessibleColors.red100,
    dangerSecondaryDefaultText: accessibleColors.red600,
    dangerSecondaryHoverBg: accessibleColors.red50,
    dangerSecondaryHoverText: accessibleColors.red500,
    dangerSecondaryPressedBg: accessibleColors.red200,
    dangerSecondaryPressedText: accessibleColors.red700,
    dangerText: accessibleColors.gray0,
    disabledBg: accessibleColors.gray50,
    disabledBorder: accessibleColors.gray200,
    disabledIcon: accessibleColors.gray400,
    disabledText: accessibleColors.gray400,
    ghostDefaultText: accessibleColors.gray900,
    ghostHoverBg: accessibleColors.blue50,
    ghostHoverText: accessibleColors.blue500,
    ghostPressedBg: accessibleColors.blue200,
    ghostPressedText: accessibleColors.blue700,
    primaryDefaultBg: accessibleColors.blue600,
    primaryHoverBg: accessibleColors.blue500,
    primaryPressedBg: accessibleColors.blue700,
    primaryText: accessibleColors.gray0,
    secondaryDefaultBg: accessibleColors.blue100,
    secondaryDefaultText: accessibleColors.blue600,
    secondaryHoverBg: accessibleColors.blue50,
    secondaryHoverText: accessibleColors.blue500,
    secondaryPressedBg: accessibleColors.blue200,
    secondaryPressedText: accessibleColors.blue700,
  },
});

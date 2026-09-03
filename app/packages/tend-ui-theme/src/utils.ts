import { css } from 'styled-components';
import { Colors } from '@rovna-ui/tokens';
import { ThemeConfig } from 'antd-core/es/config-provider';

import { ThemeSchema } from './types/ThemeSchema';
import { Tokens } from './types/Tokens';

export const themeFactory = (colors: Colors, tokens: Tokens): ThemeSchema => {
  return {
    colors,
    tokens,
    fonts: {
      museo: 'Museo Sans Cyrl, sans-serif',
    },
    fontSizes: {
      10: '10px',
      12: '12px',
      14: '14px',
      16: '16px',
      20: '20px',
      24: '24px',
      28: '28px',
      32: '32px',
      40: '40px',
      56: '56px',
      64: '64px',
    },
    utils: {
      box: value => css`
        width: ${value}px;
        height: ${value}px;
      `,
    },
  };
};

export const createAntdTheme = ({ colors }: ThemeSchema) => {
  const theme: ThemeConfig = {
    components: {
      Menu: {
        itemHeight: 28,
        itemHoverBg: colors['gray50-transparent'],
        itemActiveBg: colors['gray50-transparent'],
        itemSelectedBg: colors.blue100,
        itemSelectedColor: colors.gray900,
        horizontalItemSelectedColor: colors.gray900,
        horizontalItemHoverBg: colors.gray50,
        horizontalItemSelectedBg: colors.blue200,
        itemMarginBlock: 0,
        itemMarginInline: 0,
        subMenuItemBorderRadius: 0,
        horizontalItemBorderRadius: 8,
        groupTitleFontSize: 12,
        groupTitleLineHeight: '16px',
        groupTitleColor: colors.gray650,
        activeBarHeight: 0,
      },
      Input: {
        paddingBlock: 4,
        paddingBlockLG: 7,
        paddingInlineSM: 8,
        paddingInline: 8,
        paddingInlineLG: 12,
        lineHeight: 1.5714285714285714, // Based on an original value
      },
      Avatar: {
        textFontSizeLG: 14,
        textFontSize: 14,
        textFontSizeSM: 14,
        containerSizeLG: 48,
        containerSize: 40,
        containerSizeSM: 32,
      },
      Tree: {
        nodeHoverBg: 'none',
      },
      Segmented: {
        itemColor: colors.gray900,
        itemSelectedBg: colors.blue100,
        itemSelectedColor: colors.blue600,
        colorBgLayout: colors.gray0,
      },
      Steps: {
        titleLineHeight: 24,
        iconFontSize: 16,
      },
      Divider: {
        colorSplit: colors.gray100,
      },
      Pagination: {
        itemActiveBg: colors.blue600,
        colorBgTextHover: colors.blue50,
      },
      Table: {
        fontWeightStrong: 400,
        headerColor: colors.gray500,
        headerBg: colors.gray25,
        borderRadiusLG: 0,
        rowHoverBg: colors.gray50,
        rowSelectedBg: colors.blue50,
        rowSelectedHoverBg: colors.blue100,
        cellPaddingBlock: 8,
        cellPaddingInline: 12,
        borderColor: colors.gray25,
      },
      Modal: {
        borderRadiusLG: 16,
        colorIcon: colors.gray500,
        colorIconHover: colors.gray500,
        titleFontSize: 20,
        titleLineHeight: 1.4,
        paddingLG: 48,
        marginXS: 0,
      },
      Form: {
        labelFontSize: 12,
        verticalLabelPadding: '0 0 4px',
        itemMarginBottom: 0,
        controlHeightLG: 16,
      },
      Checkbox: {
        borderRadiusSM: 4,
      },
      Radio: {
        dotSize: 8,
      },
      Switch: {
        opacityLoading: 0.65,
      },
      Select: {
        optionSelectedBg: colors.gray0,
        optionActiveBg: colors.gray50,
        optionSelectedFontWeight: 400,
        multipleItemBg: colors['gray100-transparent'],
      },
      Collapse: {
        borderRadiusLG: 0,
        fontSizeIcon: 20,
        headerPadding: '12px',
        contentPadding: '12px 16px 12px 40px',
        headerBg: colors.gray0,
      },
      Tabs: {
        horizontalItemGutter: 0,
        horizontalItemPaddingSM: '4px 16px',
        horizontalItemPadding: '8px 16px',
        horizontalItemPaddingLG: '16px 20px',
        itemHoverColor: colors.blue600,
        colorTextDisabled: colors.gray400,
        fontSize: 14,
        fontSizeSM: 14,
        fontSizeLG: 14,
        lineHeight: 1.429,
      },
      Badge: {
        dotSize: 8,
      },
      Alert: {
        withDescriptionPadding: '16px 24px',
        withDescriptionIconSize: 20,
      },
      Tooltip: {
        borderRadius: 4,
        colorBgSpotlight: colors.gray900,
      },
      Notification: {
        colorTextHeading: colors.gray900,
        colorText: colors.gray650,
        colorIcon: colors.gray650,
        colorIconHover: colors.gray650,
        paddingMD: 12,
        paddingContentHorizontalLG: 12,
      },
      DatePicker: {
        cellHeight: 32,
        cellHoverBg: colors.blue100,
        colorTextHeading: colors.blue600,
        // Cell border-radius
        borderRadiusSM: 8,
      },
      Dropdown: {
        paddingBlock: 8,
      },
    },
    token: {
      fontFamily: 'Museo Sans Cyrl, sans-serif',
      lineHeight: 1.25,
      fontSizeHeading1: 40,
      fontSizeHeading2: 32,
      fontSizeHeading3: 28,
      fontSizeHeading4: 24,
      fontSizeHeading5: 20,
      lineHeightHeading1: 1.3,
      lineHeightHeading2: 1.375,
      lineHeightHeading3: 1.42857,
      opacityLoading: 1,

      colorText: colors.gray900,
      colorTextSecondary: colors.gray650,
      colorTextTertiary: colors.gray500,
      colorTextQuaternary: colors.gray400,
      colorPrimary: colors.blue600,
      colorPrimaryHover: colors.blue500,
      colorPrimaryActive: colors.blue700,
      colorTextDisabled: colors.gray400,
      colorTextPlaceholder: colors.gray400,
      colorBgContainerDisabled: colors.gray50,

      colorError: colors.red600,
      colorErrorBg: colors.red100,
      colorErrorBorder: colors.red600,
      colorErrorHover: colors.red500,
      colorErrorActive: colors.red700,

      colorSuccess: colors.green600,
      colorSuccessBg: colors.green100,
      colorSuccessBorder: colors.green600,

      colorWarning: colors.gold600,
      colorWarningBg: colors.gold100,
      colorWarningBorder: colors.gold600,

      colorInfo: colors.blue600,
      colorInfoBg: colors.blue100,
      colorInfoBorder: colors.blue600,

      colorLink: colors.blue600,
      colorLinkHover: colors.blue700,
      colorLinkActive: colors.blue800,

      // Border radius
      borderRadiusLG: 10,
      borderRadius: 8,
      borderRadiusSM: 6,
      borderRadiusXS: 6,
    },
  };

  return theme;
};

import styled from 'styled-components';
import { pointer, px, styling } from '@rovna-ui/styling';

import {
  AppearanceProps,
  BoxProps,
  LayoutProps,
  MarginProps,
  PaddingProps,
} from './types';

const padding = styling<keyof PaddingProps>({
  $padding: {
    type: 'string | number',
    properties: ['padding'],
    transform: px,
  },
  $pt: {
    type: 'string | number',
    properties: ['paddingTop'],
    transform: px,
  },
  $pr: {
    type: 'string | number',
    properties: ['paddingRight'],
    transform: px,
  },
  $pb: {
    type: 'string | number',
    properties: ['paddingBottom'],
    transform: px,
  },
  $pl: {
    type: 'string | number',
    properties: ['paddingLeft'],
    transform: px,
  },
});
const margin = styling<keyof MarginProps>({
  $margin: {
    type: 'string | number',
    properties: ['margin'],
    transform: px,
  },
  $mt: {
    type: 'string | number',
    properties: ['marginTop'],
    transform: px,
  },
  $mr: {
    type: 'string | number',
    properties: ['marginRight'],
    transform: px,
  },
  $mb: {
    type: 'string | number',
    properties: ['marginBottom'],
    transform: px,
  },
  $ml: {
    type: 'string | number',
    properties: ['marginLeft'],
    transform: px,
  },
});
const appearance = styling<keyof AppearanceProps>({
  $color: {
    type: 'string | number',
    properties: ['color'],
  },
  $backgroundColor: {
    type: 'string | number',
    properties: ['backgroundColor'],
  },
});
const layout = styling<keyof LayoutProps>({
  $display: {
    type: 'string | number',
    properties: ['display'],
  },
  $gridTemplateColumns: {
    type: 'string | number',
    properties: ['gridTemplateColumns'],
  },
  $gridTemplateRows: {
    type: 'string | number',
    properties: ['gridTemplateRows'],
  },
  $gridAutoFlow: {
    type: 'string',
    properties: ['gridAutoFlow'],
  },
  $rowGap: {
    type: 'string | number',
    properties: ['rowGap'],
    transform: px,
  },
  $columnGap: {
    type: 'string | number',
    properties: ['columnGap'],
    transform: px,
  },
  $opacity: {
    type: 'string | number',
    properties: ['opacity'],
  },
  $alignItems: {
    type: 'string | number',
    properties: ['alignItems'],
  },
  $flexDirection: {
    type: 'string | number',
    properties: ['flexDirection'],
  },
  $justifyContent: {
    type: 'string | number',
    properties: ['justifyContent'],
  },
  $flex: {
    type: 'string | number',
    properties: ['flex'],
  },
  $flexWrap: {
    type: 'string | number',
    properties: ['flexWrap'],
  },
  $flexShrink: {
    type: 'string | number',
    properties: ['flexShrink'],
  },
  $flexGrow: {
    type: 'string | number',
    properties: ['flexGrow'],
  },
  $position: {
    type: 'string | number',
    properties: ['position'],
  },
  $width: {
    type: 'string | number',
    properties: ['width'],
    transform: px,
  },
  $height: {
    type: 'string | number',
    properties: ['height'],
    transform: px,
  },
  $minWidth: {
    type: 'string | number',
    properties: ['minWidth'],
    transform: px,
  },
  $minHeight: {
    type: 'string | number',
    properties: ['minHeight'],
    transform: px,
  },
  $maxWidth: {
    type: 'string | number',
    properties: ['maxWidth'],
    transform: px,
  },
  $maxHeight: {
    type: 'string | number',
    properties: ['maxHeight'],
    transform: px,
  },
  $top: {
    type: 'string | number',
    properties: ['top'],
    transform: px,
  },
  $right: {
    type: 'string | number',
    properties: ['right'],
    transform: px,
  },
  $bottom: {
    type: 'string | number',
    properties: ['bottom'],
    transform: px,
  },
  $left: {
    type: 'string | number',
    properties: ['left'],
    transform: px,
  },
  $gap: {
    type: 'string | number',
    properties: ['gap'],
    transform: px,
  },
  $zIndex: {
    type: 'string | number',
    properties: ['zIndex'],
  },
  $borderRadius: {
    type: 'string | number',
    properties: ['borderRadius'],
    transform: px,
  },
});

const Box = styled.div<BoxProps>`
  ${layout};
  ${appearance};
  ${margin};
  ${padding};
  ${pointer};
`;

Box.displayName = 'Box';

export { Box };

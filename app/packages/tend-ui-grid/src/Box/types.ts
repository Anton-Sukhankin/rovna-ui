import { Pointer, Responsive } from '@rovna-ui/styling';
import React from 'react';

export type LayoutProps = {
  $display?: Responsive<React.CSSProperties['display']>;
  $gridTemplateColumns?: Responsive<React.CSSProperties['gridTemplateColumns']>;
  $gridTemplateRows?: Responsive<React.CSSProperties['gridTemplateRows']>;
  $gridAutoFlow?: Responsive<React.CSSProperties['gridAutoFlow']>;
  $rowGap?: Responsive<React.CSSProperties['rowGap']>;
  $columnGap?: Responsive<React.CSSProperties['columnGap']>;
  $opacity?: Responsive<React.CSSProperties['opacity']>;
  $alignItems?: Responsive<React.CSSProperties['alignItems']>;
  $flexDirection?: Responsive<React.CSSProperties['flexDirection']>;
  $flex?: Responsive<React.CSSProperties['flex']>;
  $flexWrap?: Responsive<React.CSSProperties['flexWrap']>;
  $flexShrink?: Responsive<React.CSSProperties['flexShrink']>;
  $flexGrow?: Responsive<React.CSSProperties['flexGrow']>;
  $justifyContent?: Responsive<React.CSSProperties['justifyContent']>;
  $position?: Responsive<React.CSSProperties['position']>;
  $width?: Responsive<React.CSSProperties['width']>;
  $height?: Responsive<React.CSSProperties['height']>;
  $minWidth?: Responsive<React.CSSProperties['minWidth']>;
  $minHeight?: Responsive<React.CSSProperties['minHeight']>;
  $maxWidth?: Responsive<React.CSSProperties['maxWidth']>;
  $maxHeight?: Responsive<React.CSSProperties['maxHeight']>;
  $top?: Responsive<React.CSSProperties['top']>;
  $right?: Responsive<React.CSSProperties['right']>;
  $bottom?: Responsive<React.CSSProperties['bottom']>;
  $left?: Responsive<React.CSSProperties['left']>;
  $gap?: Responsive<React.CSSProperties['gap']>;
  $zIndex?: Responsive<React.CSSProperties['zIndex']>;
  $borderRadius?: Responsive<React.CSSProperties['borderRadius']>;
};
export type PaddingProps = {
  $padding?: Responsive<React.CSSProperties['padding']>;
  $pt?: Responsive<React.CSSProperties['paddingTop']>;
  $pr?: Responsive<React.CSSProperties['paddingRight']>;
  $pb?: Responsive<React.CSSProperties['paddingBottom']>;
  $pl?: Responsive<React.CSSProperties['paddingLeft']>;
};
export type MarginProps = {
  $margin?: Responsive<React.CSSProperties['padding']>;
  $mt?: Responsive<React.CSSProperties['paddingTop']>;
  $mr?: Responsive<React.CSSProperties['paddingRight']>;
  $mb?: Responsive<React.CSSProperties['paddingBottom']>;
  $ml?: Responsive<React.CSSProperties['paddingLeft']>;
};
export type AppearanceProps = {
  $color?: Responsive<React.CSSProperties['color']>;
  $backgroundColor?: Responsive<React.CSSProperties['backgroundColor']>;
};
export type BoxProps = LayoutProps &
  PaddingProps &
  MarginProps &
  AppearanceProps &
  Pointer;

import React from 'react';
import { extractDimensionProps, extractMarginProps } from '@rovna-ui/styling';
import { useColor } from '@rovna-ui/theme';

import { Root } from './styled';
import { TextProps, TextRef } from './types';

const BaseText = (
  {
    size = 'medium',
    uppercase,
    color,
    textAlign,
    fontWeight = 400,
    className,
    wordBreak,
    whiteSpace,
    ...props
  }: TextProps,
  ref: React.ForwardedRef<TextRef>,
) => {
  const _color = useColor(color);
  const { rest: withoutMargins, ...margins } = extractMarginProps(props);
  const { rest, ...dimensions } = extractDimensionProps(withoutMargins);

  return (
    <Root
      data-testid='rovna-ui-text'
      {...rest}
      {...margins}
      {...dimensions}
      ref={ref}
      $uppercase={uppercase}
      $size={size}
      $color={_color}
      $textAlign={textAlign}
      $fontWeight={fontWeight}
      $wordBreak={wordBreak}
      $whiteSpace={whiteSpace}
      className={['rovna-ui-typography-text', className].filter(Boolean).join(' ')}
    />
  );
};

const Text = React.forwardRef<TextRef, TextProps>(BaseText);

Text.displayName = 'Text';

export { Text };

import React from 'react';
import {
  extractDimensionProps,
  extractMarginProps,
  extractPaddingProps,
} from '@rovna-ui/styling';
import { useColor } from '@rovna-ui/theme';
import cn from 'classnames';

import { Root } from './styled';
import { ParagraphProps, ParagraphRef } from './types';

const BaseParagraph = (
  {
    size = 'medium',
    fontWeight = 400,
    color,
    textAlign,
    uppercase,
    className,
    whiteSpace,
    ...props
  }: ParagraphProps,
  ref: React.ForwardedRef<ParagraphRef>,
) => {
  const $color = useColor(color);
  const { rest: withoutMargins, ...margins } = extractMarginProps(props);
  const { rest: withoutPaddings, ...paddings } = extractPaddingProps(withoutMargins);
  const { rest, ...dimensions } = extractDimensionProps(withoutPaddings);

  return (
    <Root
      data-testid='rovna-ui-paragraph'
      {...rest}
      {...margins}
      {...paddings}
      {...dimensions}
      ref={ref}
      $color={$color}
      $whiteSpace={whiteSpace}
      $textAlign={textAlign}
      $size={size}
      $uppercase={uppercase}
      $fontWeight={fontWeight}
      className={cn(['rovna-ui-typography-paragraph', className])}
      component='p'
    />
  );
};

const Paragraph = React.forwardRef<ParagraphRef, ParagraphProps>(BaseParagraph);

Paragraph.displayName = 'Paragraph';

export { Paragraph };

import React from 'react';
import {
  extractDimensionProps,
  extractMarginProps,
  extractPaddingProps,
} from '@rovna-ui/styling';
import cn from 'classnames';
import { useColor } from '@rovna-ui/theme';

import { Root } from './styled';
import { TitleProps } from './types';

const levels = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  d1: 'h1',
  d2: 'h2',
} as const;

const BaseTitle = (
  {
    level = 'h1',
    uppercase,
    color,
    textAlign,
    className,
    whiteSpace,
    ...props
  }: TitleProps,
  ref: React.ForwardedRef<HTMLHeadingElement>,
) => {
  const _color = useColor(color);
  const { rest: withoutMargins, ...margins } = extractMarginProps(props);
  const { rest: withoutPaddings, ...paddings } = extractPaddingProps(withoutMargins);
  const { rest, ...dimensions } = extractDimensionProps(withoutPaddings);

  return (
    <Root
      data-testid='rovna-ui-title'
      {...rest}
      {...margins}
      {...paddings}
      {...dimensions}
      ref={ref}
      $level={level}
      $uppercase={uppercase}
      $color={_color}
      $whiteSpace={whiteSpace}
      $textAlign={textAlign}
      component={levels[level]}
      className={cn(['rovna-ui-typography-title', className])}
    />
  );
};

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(BaseTitle);

Title.displayName = 'Title';

export { Title };

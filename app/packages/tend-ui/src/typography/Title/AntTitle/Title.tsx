import React from 'react';
import { extractMarginProps } from '@rovna-ui/styling';

import { useColor } from '@rovna-internal/components/theme/Theme';

import { Root } from './styled';
import { TitleProps } from './types';

const levelMap = {
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
  d1: 1,
  d2: 1,
} as const;

const Title = React.forwardRef<HTMLElement, TitleProps>(
  ({ level = 'h1', uppercase, color, textAlign, ...props }, ref) => {
    const _color = useColor(color);
    const { rest, ...marginProps } = extractMarginProps(props);

    return (
      <Root
        data-testid='rovna-ui-title'
        {...rest}
        {...marginProps}
        ref={ref}
        $level={level}
        $uppercase={uppercase}
        $color={_color}
        $textAlign={textAlign}
        level={levelMap[level]}
      />
    );
  },
);

Title.displayName = 'Title';

export { Title };

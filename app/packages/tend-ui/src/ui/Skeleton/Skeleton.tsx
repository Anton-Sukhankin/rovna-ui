import React from 'react';
import {
  extractLayoutProps,
  extractMarginProps,
  extractPaddingProps,
} from '@rovna-ui/styling';

import { Root } from './styled';
import { SkeletonProps } from './types';

const sizes = { small: '24px', medium: '32px', large: '40px' };

const Skeleton: React.FC<SkeletonProps> = ({
  skeleton = true,
  size = 'medium',
  children,
  display,
  height,
  borderRadius = '8px',
  // FIXME: Использовать палитру дизайн системы
  backgroundColor = '#F0F0F0',
  className,
  ...props
}) => {
  const { rest, ...margins } = extractMarginProps(props);
  const { rest: withoutPaddings, ...paddings } = extractPaddingProps(rest);
  const { ...layout } = extractLayoutProps(withoutPaddings);
  const _height = height ? height : sizes[size];

  if (!skeleton) return <>{children}</>;

  return (
    <Root
      {...layout}
      $display={display}
      // FIXME: Инкапсулировать логику маппинга в extractMarginProps и extractPaddingProps
      $mt={margins.$marginTop}
      $mr={margins.$marginRight}
      $mb={margins.$marginBottom}
      $ml={margins.$marginLeft}
      $pt={paddings.$paddingTop}
      $pr={paddings.$paddingRight}
      $pb={paddings.$paddingBottom}
      $pl={paddings.$paddingLeft}
      $backgroundColor={backgroundColor}
      $borderRadius={borderRadius}
      $height={_height}
      className={['rovna-ui-skeleton-root', className].filter(Boolean).join(' ')}
    />
  );
};

Skeleton.displayName = 'Skeleton';

export { Skeleton };

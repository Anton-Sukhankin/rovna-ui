import React from 'react';

import { Img, Root } from './styled';
import { ImageProps } from './types';

export const Image = ({
  width = '245px',
  height,
  rootClassName,
  ...props
}: React.PropsWithChildren<ImageProps>) => {
  return (
    <Root
      className={['rovna-ui-image-root', rootClassName].filter(Boolean).join(' ')}
      $width={width}
      $height={height}
    >
      <Img
        {...props}
        className={['rovna-ui-image-img', props.className].filter(Boolean).join(' ')}
      />
    </Root>
  );
};

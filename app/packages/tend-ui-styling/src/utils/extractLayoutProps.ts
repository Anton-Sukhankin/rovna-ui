import { LayoutProperties } from '../types';

export const extractLayoutProps = <T extends LayoutProperties>(props: T) => {
  const { width, height, ...rest } = props;

  return {
    $width: width,
    $height: height,
    rest,
  };
};

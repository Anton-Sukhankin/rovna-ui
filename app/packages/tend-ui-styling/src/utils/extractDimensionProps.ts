import { DimensionProperties } from '../types';

export const extractDimensionProps = <T extends DimensionProperties>(props: T) => {
  const { width, height, ...rest } = props;

  return {
    $width: width,
    $height: height,
    rest,
  };
};
